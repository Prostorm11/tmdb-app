import { useEffect, useState } from "react";
import "./App.css";
import Tabs, { type Tab } from "./components/Tabs";
import MediaGrid from "./components/MediaGrid";
import {
  fetchTopRatedMovies,
  fetchTopRatedTv,
  type MovieItem,
  type TvItem,
} from "./api/tmdb";

export default function App() {
  const [tab, setTab] = useState<Tab>("movies");
  const [movies, setMovies] = useState<MovieItem[] | null>(null);
  const [tv, setTv] = useState<TvItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setError("");

      const alreadyLoaded = tab === "movies" ? movies !== null : tv !== null;
      if (alreadyLoaded) return;

      setLoading(true);
      try {
        if (tab === "movies") {
          const data = await fetchTopRatedMovies();
          if (!cancelled) setMovies(data);
        } else {
          const data = await fetchTopRatedTv();
          if (!cancelled) setTv(data);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (!cancelled) setError(`Failed to load ${tab}. ${msg}`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [tab, movies, tv]);

  const items = tab === "movies" ? movies : tv;

  return (
    <div className="page">
      <header className="header">
        <h1>TMDB Top Rated</h1>
        <p className="subtitle">Symfony API + React (TypeScript)</p>
      </header>

      <Tabs active={tab} onChange={setTab} />

      {loading && <div className="state">Loading…</div>}
      {error && <div className="state error">{error}</div>}

      {!loading && !error && items && <MediaGrid tab={tab} items={items} />}

      {!loading && !error && items && items.length === 0 && (
        <div className="state">No results.</div>
      )}
    </div>
  );
}