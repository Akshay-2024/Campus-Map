"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { locations } from "../data/locations";
import { Location } from "../types/location";
import SearchBar from "../components/SearchBar";
import LocationCard from "../components/LocationCard";
import CategoryFilter from "../components/CategoryFilter";
import s from "./page.module.css";

const CampusMap = dynamic(() => import("../components/CampusMap"), {
  ssr: false,
});

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const filtered = locations.filter((loc) => {
    const matchName = loc.name.toLowerCase().includes(search.toLowerCase());
    const matchCat  = selectedCategory === "All" || loc.category === selectedCategory;
    return matchName && matchCat;
  });

  return (
    <div className={s.root}>

      {/* Header */}
      <header className={s.header}>
        <div className={s.brand}>
          <div className={s.brandIcon}>🗺️</div>
          <div>
            <div className={s.brandTitle}>Kariavattom Campus Navigator</div>
            <div className={s.brandSub}>University of Kerala</div>
          </div>
        </div>
        <span className={s.badge}>
          <span className={s.badgeDot} />
          Live Map
        </span>
      </header>

      {/* Body: sidebar + map side by side */}
      <div className={s.body}>

        {/* ── Sidebar ── */}
        <aside className={s.sidebar}>
          <div className={s.searchWrap}>
            <div className={s.sectionLabel}>Find a location</div>
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          <div className={s.filterWrap}>
            <div className={s.sectionLabel}>Category</div>
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          <div className={s.resultsBar}>
            <span className={s.resultsLabel}>Locations</span>
            <span className={s.resultsChip}>{filtered.length}</span>
          </div>

          <div className={s.list}>
            {filtered.length > 0 ? (
              filtered.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`${s.item} ${selectedLocation?.id === loc.id ? s.itemSelected : ""}`}
                >
                  <LocationCard location={loc} />
                </div>
              ))
            ) : (
              <div className={s.empty}>
                <div className={s.emptyIcon}>🔍</div>
                <div className={s.emptyTitle}>No locations found</div>
                <div className={s.emptyBody}>Try a different name or a broader category.</div>
              </div>
            )}
          </div>
        </aside>

        {/* ── Map panel ── 
            The info panel is position:absolute INSIDE this <main>,
            so it overlays the map instead of sitting beside it. */}
        <main className={s.mapPanel}>

          {/* Map fills 100% of this panel */}
          <CampusMap locations={filtered} selectedLocation={selectedLocation} />

          {/* Floating info card — overlays the map, top-left corner */}
          {selectedLocation && (
            <div className={s.infoPanel}>
              <button
                className={s.infoPanelClose}
                onClick={() => setSelectedLocation(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className={s.infoPanelEyebrow}>Selected location</div>
              <div className={s.infoPanelName}>{selectedLocation.name}</div>
              {selectedLocation.category && (
                <div className={s.infoPanelCat}>{selectedLocation.category}</div>
              )}
              {selectedLocation.description && (
                <p className={s.infoPanelDesc}>{selectedLocation.description}</p>
              )}
            </div>
          )}

        </main>

      </div>
    </div>
  );
}