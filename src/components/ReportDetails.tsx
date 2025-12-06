import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

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
};

export default function ReportDetails({
  report,
  onClose,
  onAction,
}: {
  report: Report;
  onClose: () => void;
  onAction: () => void;
}) {
  const [processing, setProcessing] = useState(false);

  const toggleResolved = async () => {
    setProcessing(true);
    try {
      const { error } = await supabase.from("reports").update({ resolved: !report.resolved }).eq("id", report.id);
      if (error) throw error;
      onAction();
    } catch (err) {
      console.error("Toggle resolved error", err);
      alert("Failed to update");
    } finally {
      setProcessing(false);
    }
  };

  const deleteReport = async () => {
    if (!confirm("Delete this report? This cannot be undone.")) return;
    setProcessing(true);
    try {
      // delete DB row
      const { error } = await supabase.from("reports").delete().eq("id", report.id);
      if (error) throw error;

      // optionally delete image from storage if you stored path (recommended)
      if (report.image_path) {
        const { error: storageError } = await supabase.storage.from("leak-images").remove([report.image_path]);
        if (storageError) console.warn("Failed to remove image from storage", storageError);
      }

      onAction();
      onClose();
    } catch (err) {
      console.error("Delete error", err);
      alert("Failed to delete");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-card p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">Report Details</h3>
        <button onClick={onClose} className="text-sm px-2 py-1">Close</button>
      </div>

      <div className="mt-3 text-sm">
        <div><strong>When:</strong> {new Date(report.created_at).toLocaleString()}</div>
        <div><strong>Reporter:</strong> {report.name} — {report.phone} — {report.email}</div>
        <div className="mt-2"><strong>Description:</strong><div className="mt-1">{report.description}</div></div>
        <div className="mt-2"><strong>Location:</strong> {report.latitude},{report.longitude}</div>

        {report.image_url && (
          <div className="mt-3">
            <img src={report.image_url} alt="report" className="w-full rounded" />
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={toggleResolved} disabled={processing} className="px-3 py-2 rounded border">
          {report.resolved ? "Mark Unresolved" : "Mark Resolved"}
        </button>

        <button onClick={deleteReport} disabled={processing} className="px-3 py-2 rounded bg-destructive text-white">
          Delete
        </button>
      </div>
    </div>
  );
}
