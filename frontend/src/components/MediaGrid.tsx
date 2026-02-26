import MediaCard, { type MediaItem } from "./MediaCard";
import type { Tab } from "./Tabs";

export default function MediaGrid({
  tab,
  items,
  onItemClick,
}: {
  tab: Tab;
  items: MediaItem[];
  onItemClick?: (id: number) => void;
}) {
  return (
    <div className="grid">
      {items.map((it) => (
        <MediaCard key={it.id} tab={tab} item={it} onClick={onItemClick} />
      ))}
    </div>
  );
}