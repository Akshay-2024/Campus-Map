"use client";

import { useState } from "react";
import { locations } from "../data/locations";
import SearchBar from "../components/SearchBar";
import LocationCard from "../components/LocationCard";
import dynamic from "next/dynamic";
import { Location } from "../types/location";

const CampusMap = dynamic(
  () => import("../components/CampusMap"),
  { ssr: false }
);

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(search.toLowerCase())
  );
  const [selectedLocation, setSelectedLocation] =
  useState<Location | null>(null);
  return (
  <main className="h-screen p-4 flex flex-col">
    <h1 className="text-3xl font-bold mb-4">
      Kariavattom Campus Navigator
    </h1>

    <div className="flex-1 grid grid-cols-4 gap-4 min-h-0">
      
      {/* Map */}
      <div className="col-span-3">
        <CampusMap
  locations={locations}
  selectedLocation={selectedLocation}
/>
      </div>

      {/* Sidebar */}
      <div className="border rounded-lg p-4 overflow-y-auto">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <div className="space-y-3 mt-4">
          {filteredLocations.map((location) => (
            <div
  key={location.id}
  onClick={() => setSelectedLocation(location)}
>
  <LocationCard location={location} />
</div>
          ))}
        </div>
      </div>

    </div>
  </main>
);
}