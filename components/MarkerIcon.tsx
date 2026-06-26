import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import {
  GraduationCap,
  LibraryBig,
  Bus,
  Bed,
  UtensilsCrossed,
  MapPin,
} from "lucide-react";

function createIcon(
  Icon: React.ComponentType<{ size?: number; color?: string }>,
  color: string
) {
  return L.divIcon({
    className: "",
    html: renderToStaticMarkup(
      <div
        style={{
          background: color,
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "3px solid white",
          boxShadow: "0 2px 8px rgba(0,0,0,.3)",
        }}
      >
        <Icon size={20} color="white" />
      </div>
    ),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

export function getMarkerIcon(category: string) {
  switch (category) {
    case "Department":
      return createIcon(GraduationCap, "#2563eb");

    case "Library":
      return createIcon(LibraryBig, "#9333ea");

    case "Transport":
      return createIcon(Bus, "#16a34a");

    case "Hostel":
      return createIcon(Bed, "#db2777");

    case "Food":
      return createIcon(UtensilsCrossed, "#ea580c");

    default:
      return createIcon(MapPin, "#6b7280");
  }
}