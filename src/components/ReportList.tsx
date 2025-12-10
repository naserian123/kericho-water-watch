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

const ReportList: React.FC<ReportListProps> = ({ reports, onSelect, onRefresh }) => {
  const validReports = reports.filter(r => r.latitude && r.longitude);
  const center: [number, number] = validReports.length > 0 
    ? [validReports[0].latitude!, validReports[0].longitude!] 
    : [-0.367, 35.283];

  return (
    <div className="space-y-4">
      <div style={{ height: "300px", width: "100%" }} className="rounded-lg overflow-hidden border">
        <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {validReports.map((report) => (
            <Marker key={report.id} position={[report.latitude!, report.longitude!]}>
              <Popup>
                <strong>{report.name || "Unknown"}</strong>
                <p>{report.description?.slice(0, 100) || "No description"}</p>
                <button 
                  onClick={() => onSelect(report)}
                  className="text-primary underline text-sm"
                >
                  View Details
                </button>
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
            className={`p-3 rounded-lg border cursor-pointer hover:bg-secondary/50 transition-colors ${
              report.resolved ? 'bg-green-50 border-green-200' : 'bg-card'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{report.name || "Unknown"}</p>
                <p className="text-sm text-muted-foreground">{report.phone}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                report.resolved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {report.resolved ? 'Resolved' : 'Pending'}
              </span>
            </div>
            <p className="text-sm mt-1 text-muted-foreground line-clamp-2">
              {report.description || "No description"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(report.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportList;
