import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ReportList from "../components/ReportList";
import ReportDetails from "../components/ReportDetails";
import { saveAs } from "file-saver";
import Papa from "papaparse";

type Report = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  description: string | null;
  image_url: string | null;
  image_path?: string | null;
  latitude: number | null;
  longitude: number | null;
  resolved: boolean;
  created_at: string;
  report_type?: string | null;
};

const AdminDashboard: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Report | null>(null);

  const [search, setSearch] = useState("");
  const [onlyUnresolved, setOnlyUnresolved] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const fetchReports = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setReports(data ?? []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();

    // Realtime subscription (v2)
    const channel = supabase
      .channel("public:reports")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reports" },
        () => {
          fetchReports();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // client-side filter
  const filtered = reports.filter((r) => {
    if (onlyUnresolved && r.resolved) return false;
    if (search) {
      const s = search.toLowerCase();
      if (
        !(r.name ?? "").toLowerCase().includes(s) &&
        !(r.phone ?? "").toLowerCase().includes(s) &&
        !(r.description ?? "").toLowerCase().includes(s)
      ) {
        return false;
      }
    }
    if (fromDate && new Date(r.created_at) < new Date(fromDate)) return false;
    if (toDate && new Date(r.created_at) > new Date(toDate + "T23:59:59")) return false;
    return true;
  });

  const exportCSV = () => {
    const csv = Papa.unparse(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `nrw_reports_${new Date().toISOString()}.csv`);
  };

  return (
    <div className="p-6 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">NRW Admin Dashboard — Kisumu</h1>

        <section className="mb-6 flex flex-col md:flex-row md:items-center gap-3">
          <input
            placeholder="Search name/phone/desc"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded border w-full md:w-64"
          />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={onlyUnresolved} onChange={(e) => setOnlyUnresolved(e.target.checked)} />
            Only unresolved
          </label>
          <label className="flex items-center gap-2">
            From <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="p-1 rounded border" />
          </label>
          <label className="flex items-center gap-2">
            To <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="p-1 rounded border" />
          </label>

          <div className="ml-auto flex gap-2">
            <button onClick={fetchReports} className="px-3 py-2 rounded border">Refresh</button>
            <button onClick={exportCSV} className="px-3 py-2 rounded border bg-primary text-white">Export CSV</button>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <ReportList reports={filtered} onSelect={(r) => setSelected(r)} onRefresh={fetchReports} />
          </div>

          <div className="w-full lg:w-96">
            {selected ? (
              <ReportDetails report={selected} onClose={() => setSelected(null)} onAction={fetchReports} />
            ) : (
              <div className="p-4 bg-card rounded shadow">Select a report to view details</div>
            )}
          </div>
        </div>

        {loading && <div className="mt-4">Loading...</div>}
      </div>
    </div>
  );
};

export default AdminDashboard;
