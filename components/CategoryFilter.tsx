type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const categories = ["All", "Department", "Library", "Transport", "Hostel", "Food", "Others", "Hospital", "Gate", "Building"];

export default function CategoryFilter({ selectedCategory, setSelectedCategory }: Props) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {categories.map((cat) => {
        const active = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "5px 10px",
              borderRadius: "var(--cn-radius-sm)",
              border: active
                ? "1px solid var(--cn-primary-container)"
                : "1px solid var(--cn-outline-variant)",
              background: active
                ? "var(--cn-primary)"
                : "var(--cn-surface-white)",
              color: active
                ? "var(--cn-on-primary)"
                : "var(--cn-on-surface-variant)",
              fontFamily: "var(--cn-font)",
              fontSize: 12,
              fontWeight: active ? 600 : 500,
              cursor: "pointer",
              transition: "all 0.12s",
              letterSpacing: "0.01em",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}