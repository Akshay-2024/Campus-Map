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
    if (!navigator.geolocation) {
      alert("Your browser does not support location.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        setUserLocation(coords);
        map.flyTo(coords, 17);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert(
              "Location permission denied.\nPlease allow location access in your browser."
            );
            break;

          case error.POSITION_UNAVAILABLE:
            alert(
              "Location unavailable.\nPlease turn on GPS and try again."
            );
            break;

          case error.TIMEOUT:
            alert(
              "Location request timed out.\nTry again."
            );
            break;

          default:
            alert("Unable to get your location.");
        }

        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [map, setUserLocation]);

  if (!userLocation) return null;

  return (
    <Marker position={userLocation} icon={userIcon}>
      <Popup>📍 You are here</Popup>
    </Marker>
  );
}