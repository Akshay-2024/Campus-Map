"use client";
import { useState, useEffect } from "react";
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
  const [mobileTab, setMobileTab] = useState<"map" | "list">("map");
  const [sheetState, setSheetState] = useState<"peek" | "open">("peek");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const filtered = locations.filter((loc) => {
    const matchName = loc.name.toLowerCase().includes(search.toLowerCase());
    const matchCat  = selectedCategory === "All" || loc.category === selectedCategory;
    return matchName && matchCat;
  });

  const handleSelectLocation = (loc: Location) => {
    setSelectedLocation(loc);
    setMobileTab("map");
    setSheetState("peek");
  };

  // Sidebar/list content — shared between mobile and desktop
  const listContent = (onSelect: (loc: Location) => void) => (
    <>
      {filtered.length > 0 ? (
        filtered.map((loc) => (
          <div
            key={loc.id}
            onClick={() => onSelect(loc)}
            className={`${s.item} ${selectedLocation?.id === loc.id ? s.itemSelected : ""}`}
          >
            <LocationCard location={loc} />
          </div>
        ))
      ) : (
        <div className={s.empty}>
          <div className={s.emptyIcon}>🔍</div>
          <div className={s.emptyTitle}>No locations found</div>
          <div className={s.emptyBody}>Try a different name or category.</div>
        </div>
      )}
    </>
  );

  return (
    <div className={s.root}>

      {/* ── Header ── */}
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

      {/* ══════════════════════════════════
          DESKTOP (≥768px)
      ══════════════════════════════════ */}
      {!isMobile && (
        <div className={s.desktopBody}>
          <aside className={s.sidebar}>
            <div className={s.searchWrap}>
              <div className={s.sectionLabel}>Find a location</div>
              <SearchBar search={search} setSearch={setSearch} />
            </div>
            <div className={s.filterWrap}>
              <div className={s.sectionLabel}>Category</div>
              <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </div>
            <div className={s.resultsBar}>
              <span className={s.resultsLabel}>Locations</span>
              <span className={s.resultsChip}>{filtered.length}</span>
            </div>
            <div className={s.list}>
              {listContent(setSelectedLocation)}
            </div>
          </aside>

          <main className={s.mapPanel}>
            <div className={s.mapInner}>
              <CampusMap locations={filtered} selectedLocation={selectedLocation} />
            </div>
            {selectedLocation && (
              <div className={s.infoPanel}>
                <button className={s.infoPanelClose} onClick={() => setSelectedLocation(null)}>✕</button>
                <div className={s.infoPanelEyebrow}>Selected location</div>
                <div className={s.infoPanelName}>{selectedLocation.name}</div>
                {selectedLocation.category && <div className={s.infoPanelCat}>{selectedLocation.category}</div>}
                {selectedLocation.description && <p className={s.infoPanelDesc}>{selectedLocation.description}</p>}
              </div>
            )}
          </main>
        </div>
      )}

      {/* ══════════════════════════════════
          MOBILE (<768px)
          ONE map instance, bottom sheet + tab bar
      ══════════════════════════════════ */}
      {isMobile && (
        <div className={s.mobileBody}>

          {/* Full-screen map — always mounted, always visible underneath */}
          <div className={s.mobileMap}>
            <CampusMap
              locations={filtered}
              selectedLocation={mobileTab === "map" ? selectedLocation : null}
            />

            {/* Selected chip over map */}
            {selectedLocation && mobileTab === "map" && (
              <div className={s.mobileInfoChip}>
                <div className={s.mobileInfoChipName}>{selectedLocation.name}</div>
                {selectedLocation.category && (
                  <div className={s.mobileInfoChipCat}>{selectedLocation.category}</div>
                )}
                <button className={s.mobileInfoChipClose} onClick={() => setSelectedLocation(null)}>✕</button>
              </div>
            )}
          </div>

          {/* Bottom sheet — map tab only */}
          {mobileTab === "map" && (
            <div className={`${s.bottomSheet} ${sheetState === "open" ? s.bottomSheetOpen : ""}`}>
              <div
                className={s.sheetHandle}
                onClick={() => setSheetState(sheetState === "peek" ? "open" : "peek")}
              >
                <div className={s.sheetHandleBar} />
                <span className={s.sheetHandleLabel}>
                  {sheetState === "peek"
                    ? `${filtered.length} locations • tap to expand`
                    : "Locations"}
                </span>
              </div>
              <div className={s.sheetContent}>
                <div className={s.sheetSearch}>
                  <SearchBar search={search} setSearch={setSearch} />
                </div>
                <div className={s.sheetFilter}>
                  <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                </div>
                <div className={s.sheetList}>
                  {listContent(handleSelectLocation)}
                </div>
              </div>
            </div>
          )}

          {/* List tab full view */}
          {mobileTab === "list" && (
            <div className={s.mobileListView}>
              <div className={s.mobileListSearch}>
                <SearchBar search={search} setSearch={setSearch} />
              </div>
              <div className={s.mobileListFilter}>
                <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              </div>
              <div className={s.resultsBar}>
                <span className={s.resultsLabel}>Locations</span>
                <span className={s.resultsChip}>{filtered.length}</span>
              </div>
              <div className={s.mobileListItems}>
                {listContent(handleSelectLocation)}
              </div>
            </div>
          )}

          {/* Tab bar */}
          <nav className={s.tabBar}>
            <button
              className={`${s.tabBtn} ${mobileTab === "map" ? s.tabBtnActive : ""}`}
              onClick={() => setMobileTab("map")}
            >
              <span className={s.tabIcon}>🗺️</span>
              <span className={s.tabLabel}>Map</span>
            </button>
            <button
              className={`${s.tabBtn} ${mobileTab === "list" ? s.tabBtnActive : ""}`}
              onClick={() => setMobileTab("list")}
            >
              <span className={s.tabIcon}>📋</span>
              <span className={s.tabLabel}>List</span>
            </button>
          </nav>

        </div>
      )}

    </div>
  );
}