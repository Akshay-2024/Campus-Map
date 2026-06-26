"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const userIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:18px;
      height:18px;
      background:#2563eb;
      border:4px solid white;
      border-radius:50%;
      box-shadow:0 0 10px rgba(0,0,0,.4);
    "></div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

type Props = {
  userLocation: [number, number] | null;
};

export default function UserLocation({
  userLocation,
}: Props) {
  if (!userLocation) return null;

  return (
    <Marker position={userLocation} icon={userIcon}>
      <Popup>📍 You are here</Popup>
    </Marker>
  );
}