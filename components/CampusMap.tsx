"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Location } from "../types/location";
import { getMarkerIcon } from "./MarkerIcon";
import MapLegend from "./MapLegend";
import UserLocation from "./UserLocation";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";


function FlyToLocation({
  location,
}: {
  location: Location | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    map.flyTo(
      [location.lat, location.lng],
      18,
      {
        duration: 1.5,
      }
    );
  }, [location, map]);

  return null;
}
export default function CampusMap({
  locations,
  selectedLocation,
}: {
  locations: Location[];
  selectedLocation: Location | null;
}){
  return (
    <div className="h-[85vh] w-full rounded-lg overflow-hidden">
    <MapContainer
    center={[8.563532, 76.88798]}
    zoom={17}
    className="h-full w-full"
    
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((location) => (
        <Marker
        key={location.id}
        position={[location.lat, location.lng]}
        icon={getMarkerIcon(location.category)}
        >
          <Popup>
            <strong>{location.name}</strong>
            <br />
            {location.description}
          </Popup>
        </Marker>
      ))}
      <FlyToLocation
  location={selectedLocation}
/>
<UserLocation />
    </MapContainer>
    <MapLegend />
    </div>
  );
}