import { useNavigate } from "react-router-dom";
import MediaCard, { type MediaItem } from "./MediaCard";
import type { Tab } from "./Tabs";

export default function MediaGrid({
  tab,
  items,
}: {
  tab: Tab;
  items: MediaItem[];
}) {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    const type = tab === "movies" ? "movie" : "tv";
    navigate(`/${type}/${id}`);
  };

  return (
    <div className="grid">
      {items.map((it) => (
        <MediaCard
          key={it.id}
          tab={tab}
          item={it}
          onClick={handleClick}           // ← pass the function
        />
      ))}
    </div>
  );
}