export default function MapLegend() {
  return (
    <div style={{
      position: "absolute",
      bottom: 40,
      right: 16,
      zIndex: 1000,
      background: "var(--cn-surface-white)",
      border: "1px solid var(--cn-outline-variant)",
      borderRadius: "var(--cn-radius-md)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
      padding: "10px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: "var(--cn-font)",
      fontSize: 12,
      fontWeight: 500,
      color: "var(--cn-on-surface-variant)",
      pointerEvents: "none",
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--cn-outline)", marginBottom: 2 }}>
        Legend
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>🎓 Department</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>📚 Library</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>🚌 Transport</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>🛏 Hostel</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>🍴 Food</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>🛏 Hospital</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>🍴 Gate</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>🛏 Building</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>🍴 Service</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>🛏 Park</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>🍴 Others</div>
    </div>
  );
}