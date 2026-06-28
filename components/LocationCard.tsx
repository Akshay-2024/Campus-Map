import { categoryIcons } from "./icons";
import { Location } from "../types/location";

export default function LocationCard({ location }: { location: Location }) {
  const Icon = categoryIcons[location.category as keyof typeof categoryIcons];

  return (
    <div style={{
      padding: "10px 12px",
      fontFamily: "var(--cn-font)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        {Icon && (
          <Icon style={{
            width: 16,
            height: 16,
            color: "var(--cn-primary-container)",
            flexShrink: 0,
          }} />
        )}
        <span style={{
          fontSize: 13,
          fontWeight: 600,
          color: "var(--cn-on-surface)",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}>
          {location.name}
        </span>
      </div>

      {location.description && (
        <p style={{
          fontSize: 12,
          color: "var(--cn-on-surface-variant)",
          lineHeight: 1.5,
          marginBottom: 6,
          marginLeft: 24,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {location.description}
        </p>
      )}

      <span style={{
        display: "inline-block",
        marginLeft: 24,
        padding: "2px 7px",
        background: "rgba(5,99,100,0.08)",
        color: "var(--cn-tertiary-container)",
        borderRadius: "var(--cn-radius-sm)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.03em",
      }}>
        {location.category}
      </span>
    </div>
  );
}