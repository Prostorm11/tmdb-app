import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MediaDetail.css";
import type { MediaDetailItem } from "../api/tmdb";

export default function MediaDetail() {
  const { type, id } = useParams<{ type: "movie" | "tv"; id: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<MediaDetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!type || !id || !["movie", "tv"].includes(type)) {
      setError("Invalid media type or ID");
      setLoading(false);
      return;
    }

    async function fetchDetail() {
      setLoading(true);
      setError("");

      try {
        const endpoint = type === "movie" ? `/api/movies/${id}` : `/api/tv/${id}`;
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        const data: MediaDetailItem = await res.json();
        setItem(data);
      } catch (err) {
        setError(`Failed to load details: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [type, id]);

  if (loading) return <div className="detail-loading">Loading...</div>;
  if (error) return <div className="detail-error">{error}</div>;
  if (!item) return <div className="detail-not-found">Not found</div>;

  const isMovie = type === "movie";
  const title = item.title || item.name || "Unknown Title";
  const year = item.date ? new Date(item.date).getFullYear() : null;

  return (
    <div className="detail-page">
      {item.backdrop && (
        <div
          className="detail-hero"
          style={{ backgroundImage: `url(${item.backdrop})` }}
        >
          <div className="hero-overlay" />
        </div>
      )}

      <div className="detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to {isMovie ? "Movies" : "TV Shows"}
        </button>

        <div className="detail-grid">
          <div className="poster-column">
            {item.poster ? (
              <img
                src={item.poster}
                alt={title}
                className="detail-poster"
                loading="lazy"
              />
            ) : (
              <div className="poster-placeholder">No Poster</div>
            )}
          </div>

          <div className="info-column">
            <h1 className="detail-title">
              {title} {year && <span className="year">({year})</span>}
            </h1>

            {item.tagline && <p className="tagline">“{item.tagline}”</p>}

            <div className="meta-row">
              {item.rating && (
                <div className="rating-badge">
                  ⭐ {item.rating.toFixed(1)}
                </div>
              )}
              {item.date && <span>{item.date}</span>}
              {item.runtime && <span>{item.runtime}</span>}
              {isMovie ? null : (
                <>
                  {item.number_of_seasons && (
                    <span>{item.number_of_seasons} Season{item.number_of_seasons > 1 ? "s" : ""}</span>
                  )}
                </>
              )}
              {item.status && <span className="status">• {item.status}</span>}
            </div>

            <div className="genres">
              {item.genres.map((g, i) => (
                <span key={i} className="genre-tag">{g}</span>
              ))}
            </div>

            <h3 className="section-title">Overview</h3>
            <p className="overview">{item.overview || "No overview available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}