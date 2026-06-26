"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { locations } from "../data/locations";
import { Location } from "../types/location";

import SearchBar from "../components/SearchBar";
import LocationCard from "../components/LocationCard";
import CategoryFilter from "../components/CategoryFilter";

const CampusMap = dynamic(
  () => import("../components/CampusMap"),
  { ssr: false }
);

export default function Home() {
  // Search state
  const [search, setSearch] = useState("");

  // Category filter state
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // Selected location state
  const [selectedLocation, setSelectedLocation] =
    useState<Location | null>(null);

  // Filter locations
  const filteredLocations = locations.filter((location) => {
    const matchesSearch = location.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      location.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="h-screen p-4 flex flex-col bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">
        🗺️ Kariavattom Campus Navigator
      </h1>

      <div className="flex-1 grid grid-cols-4 gap-4 min-h-0">

        {/* MAP */}
        <div className="col-span-3 h-full">
          <CampusMap
            locations={filteredLocations}
            selectedLocation={selectedLocation}
          />
        </div>

        {/* SIDEBAR */}
        <div className="bg-white rounded-xl shadow-lg p-4 overflow-y-auto">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="space-y-3 mt-5">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() =>
                    setSelectedLocation(location)
                  }
                  className="cursor-pointer"
                >
                  <LocationCard location={location} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-8">
                No locations found.
              </p>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}