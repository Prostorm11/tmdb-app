type Tab = "movies" | "tv";

export default function Tabs({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  return (
    <div className="tabs">
      <button
        type="button"
        className={active === "movies" ? "tab active" : "tab"}
        onClick={() => onChange("movies")}
      >
        Top Rated Movies
      </button>

      <button
        type="button"
        className={active === "tv" ? "tab active" : "tab"}
        onClick={() => onChange("tv")}
      >
        Top Rated TV
      </button>
    </div>
  );
}

export type { Tab };