"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect, useRef, useState } from "react";
import RouteMachine from "./RouteMachine";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Location } from "../types/location";
import { getMarkerIcon } from "./MarkerIcon";
import MapLegend from "./MapLegend";
import UserLocation from "./UserLocation";
import L from "leaflet";

// Flies to a location when selectedLocation changes
function FlyToLocation({ location }: { location: Location | null }) {
  const map = useMap();
  useEffect(() => {
    if (!location) return;
    map.flyTo([location.lat, location.lng], 18, { duration: 1.5 });
  }, [location, map]);
  return null;
}

// Flies to user location when it's set
function FlyToUser({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (!coords) return;
    map.flyTo(coords, 17, { duration: 1.2 });
  }, [coords, map]);
  return null;
}

export default function CampusMap({
  locations,
  selectedLocation,
}: {
  locations: Location[];
  selectedLocation: Location | null;
}) {
  const [distance, setDistance] = useState(0);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const walkingTime = Math.ceil(distance / 80);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:    alert("Please allow location permission."); break;
          case err.POSITION_UNAVAILABLE: alert("Please turn ON GPS/Location."); break;
          case err.TIMEOUT:              alert("Location request timed out."); break;
          default:                       alert("Unable to get location.");
        }
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>

      {/* My Location button — outside MapContainer, anchors to wrapper */}
      <button
        onClick={getLocation}
        style={{
          position: "absolute",
          top: 10,
          right: 50,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          background: "var(--cn-primary)",
          color: "var(--cn-on-primary)",
          border: "none",
          borderRadius: "var(--cn-radius)",
          fontFamily: "var(--cn-font)",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cn-primary-container)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--cn-primary)")}
      >
        📍 My Location
      </button>

      {/* Route info card */}
      {distance > 0 && (
        <div style={{
          position: "absolute",
          bottom: 40,
          left: 16,
          zIndex: 1000,
          background: "var(--cn-surface-white)",
          border: "1px solid var(--cn-outline-variant)",
          borderRadius: "var(--cn-radius-md)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          padding: "12px 16px",
          minWidth: 180,
          fontFamily: "var(--cn-font)",
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: "0.07em", textTransform: "uppercase",
            color: "var(--cn-outline)", marginBottom: 8,
          }}>
            Route info
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 13, color: "var(--cn-on-surface-variant)" }}>
              📏 <span style={{ fontWeight: 600, color: "var(--cn-on-surface)" }}>
                {(distance / 1000).toFixed(2)} km
              </span>
            </div>
            <div style={{ fontSize: 13, color: "var(--cn-on-surface-variant)" }}>
              🚶 <span style={{ fontWeight: 600, color: "var(--cn-on-surface)" }}>
                {walkingTime} min
              </span>
            </div>
          </div>
        </div>
      )}

      <MapContainer
        center={[8.563532, 76.88798]}
        zoom={17}
        maxZoom={19}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          maxZoom={19}
        />

        {/* Flies to user location inside MapContainer where useMap() works */}
        <FlyToUser coords={userLocation} />
        <FlyToLocation location={selectedLocation} />
        <UserLocation userLocation={userLocation} />

        <RouteMachine
          start={userLocation}
          end={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : null}
          setDistance={setDistance}
          setTime={() => {}}
        />

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={getMarkerIcon(loc.category)}
          >
            <Popup>
              <strong>{loc.name}</strong><br />{loc.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <MapLegend />
    </div>
  );
}