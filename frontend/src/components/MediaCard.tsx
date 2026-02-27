import type { MovieItem, TvItem } from "../api/tmdb";
import type { Tab } from "./Tabs";

export type MediaItem = MovieItem | TvItem;

function getTitle(tab: Tab, item: MediaItem): string {
  return tab === "movies" ? (item as MovieItem).title : (item as TvItem).name;
}

export default function MediaCard({
  tab,
  item,
  onClick,
}: {
  tab: Tab;
  item: MediaItem;
  onClick?: (id: number) => void;
}) {
  const title = getTitle(tab, item);

  return (
   <div
  className="card group"          
  role={onClick ? "button" : undefined}
  tabIndex={onClick ? 0 : undefined}
  onClick={onClick ? () => onClick(item.id) : undefined}
  onKeyDown={
    onClick
      ? (e) => {
          if (e.key === "Enter" || e.key === " ") onClick(item.id);
        }
      : undefined
  }
>
  <div className="posterWrap">
    {item.poster ? (
      <img className="poster" src={item.poster} alt={title} />
    ) : (
      <div className="poster placeholder">No image</div>
    )}
  </div>

      <div className="cardBody">
        <div className="titleRow">
          <h3 className="title" title={title}>
            {title}
          </h3>
          <span className="rating">
            ⭐ {typeof item.rating === "number" ? item.rating.toFixed(1) : "—"}
          </span>
        </div>

        <div className="meta">{item.date ?? "—"}</div>
        <p className="overview">{item.overview ?? ""}</p>
      </div>
    </div>
  );
}