"use client";

import { useEffect } from "react";
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

type Props = {
  userLocation: [number, number] | null;
  setUserLocation: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
};

export default function UserLocation({
  userLocation,
  setUserLocation,
}: Props) {
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const coords: [number, number] = [
        pos.coords.latitude,
        pos.coords.longitude,
      ];

      setUserLocation(coords);

      map.flyTo(coords, 17);
    });
  }, [map, setUserLocation]);

  if (!userLocation) return null;

  return (
    <Marker
      position={userLocation}
      icon={userIcon}
    >
      <Popup>
        📍 You are here
      </Popup>
    </Marker>
  );
}