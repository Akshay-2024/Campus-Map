"use client";

import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
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

export default function UserLocation() {
  const [position, setPosition] =
    useState<[number, number] | null>(null);

  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);

        map.flyTo([lat, lng], 17);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [map]);

  if (!position) return null;

  return (
    <Marker position={position} icon={userIcon}>
      <Popup>
        📍 You are here
      </Popup>
    </Marker>
  );
}