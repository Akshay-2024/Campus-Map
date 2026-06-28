type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <span style={{
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: 14,
        pointerEvents: "none",
        opacity: 0.45,
      }}>🔍</span>
      <input
        type="text"
        placeholder="Search locations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 12px 8px 32px",
          border: "1px solid var(--cn-outline-variant)",
          borderRadius: "var(--cn-radius)",
          background: "var(--cn-surface-low)",
          fontFamily: "var(--cn-font)",
          fontSize: 14,
          color: "var(--cn-on-surface)",
          outline: "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--cn-primary-container)";
          e.target.style.boxShadow = "0 0 0 3px rgba(0,86,179,0.12)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--cn-outline-variant)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}