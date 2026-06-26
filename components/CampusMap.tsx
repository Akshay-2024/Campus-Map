"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect,useState } from "react";
import RouteMachine from "./RouteMachine";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import { Location } from "../types/location";
import { getMarkerIcon } from "./MarkerIcon";
import MapLegend from "./MapLegend";
import UserLocation from "./UserLocation";

function FlyToLocation({
  location,
}: {
  location: Location | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    map.flyTo([location.lat, location.lng], 18, {
      duration: 1.5,
    });
  }, [location, map]);

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
  const [time, setTime] = useState(0);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  return (
    <div className="relative h-[85vh] w-full rounded-lg overflow-hidden shadow-lg">

      <MapContainer
        center={[8.563532, 76.88798]}
        zoom={17}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <UserLocation
          userLocation={userLocation}
          setUserLocation={setUserLocation}
        />

       <RouteMachine
        start={userLocation}
        end={
          selectedLocation
            ? [selectedLocation.lat, selectedLocation.lng]
            : null
        }
        setDistance={setDistance}
        setTime={setTime}
      />

        <FlyToLocation location={selectedLocation} />

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
      </MapContainer>
        {distance > 0 && (
  <div className="absolute top-4 left-4 z-[1000] bg-white rounded-xl shadow-lg p-4 w-60">
    <h3 className="font-bold text-lg mb-2">
      Route Information
    </h3>

    <p className="text-gray-700">
      📏 Distance:
      <span className="font-semibold">
        {" "}
        {(distance / 1000).toFixed(2)} km
      </span>
    </p>

    <p className="text-gray-700 mt-2">
      🚶 Walking Time:
      <span className="font-semibold">
        {" "}
        {Math.ceil(time / 60)} min
      </span>
    </p>
  </div>
)}
      <MapLegend />

    </div>
  );
}