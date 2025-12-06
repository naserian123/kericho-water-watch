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

// Example report type
type Report = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
};

// Sample reports data
const reports: Report[] = [
  { id: 1, name: "Leakage at Main Street", lat: -0.367, lng: 35.283, description: "Pipe leakage reported." },
  { id: 2, name: "Blocked Drain", lat: -0.366, lng: 35.285, description: "Drain blockage causing overflow." },
];

const ReportList: React.FC = () => {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer center={[-0.367, 35.283]} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {reports.map((report) => (
          <Marker key={report.id} position={[report.lat, report.lng]}>
            <Popup>
              <strong>{report.name}</strong>
              <p>{report.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ReportList;
