// src/components/ReportList.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons in React-Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

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

interface ReportListProps {
  reports: Report[];
  onSelect: (report: Report) => void;
  onRefresh: () => Promise<void>;
}

const ReportList: React.FC<ReportListProps> = ({ reports, onSelect }) => {
  const validReports = reports.filter(r => r.latitude && r.longitude);
  const center: [number, number] = validReports.length > 0 
    ? [validReports[0].latitude!, validReports[0].longitude!] 
    : [-0.367, 35.283];

  return (
    <div className="space-y-4">
      <div style={{ height: "300px", width: "100%" }} className="rounded-lg overflow-hidden">
        <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {validReports.map((report) => (
            <Marker key={report.id} position={[report.latitude!, report.longitude!]}>
              <Popup>
                <strong>{report.name || "Unknown"}</strong>
                <p>{report.description || "No description"}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {reports.map((report) => (
          <div
            key={report.id}
            onClick={() => onSelect(report)}
            className="p-3 bg-card rounded-lg shadow cursor-pointer hover:bg-accent/10 transition-colors border"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{report.name || "Unknown"}</p>
                <p className="text-sm text-muted-foreground">{report.phone}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded ${report.resolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {report.resolved ? 'Resolved' : 'Pending'}
              </span>
            </div>
            <p className="text-sm mt-1 line-clamp-2">{report.description}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(report.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
        {reports.length === 0 && (
          <p className="text-center text-muted-foreground py-4">No reports found</p>
        )}
      </div>
    </div>
  );
};

export default ReportList;
