import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import type { Tab } from "../components/Tabs";
import {
  fetchTopRatedMovies,
  fetchTopRatedTv,
  type MovieItem,
  type TvItem,
} from "../api/tmdb";

type MediaState = {
  tab: Tab;
  setTab: (tab: Tab) => void;
  movies: MovieItem[] | null;
  tv: TvItem[] | null;
  moviesLoading: boolean;
  tvLoading: boolean;
  moviesError: string;
  tvError: string;
  refresh: () => void;
};

const MediaContext = createContext<MediaState | undefined>(undefined);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<Tab>("movies");
  const [movies, setMovies] = useState<MovieItem[] | null>(null);
  const [tv, setTv] = useState<TvItem[] | null>(null);

  const [moviesLoading, setMoviesLoading] = useState(false);
  const [tvLoading, setTvLoading] = useState(false);
  const [moviesError, setMoviesError] = useState("");
  const [tvError, setTvError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      if (tab === "movies") {
        if (movies !== null) return;
        setMoviesError("");
        setMoviesLoading(true);
        try {
          const data = await fetchTopRatedMovies();
          if (!cancelled) setMovies(data);
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          if (!cancelled) setMoviesError(`Failed to load movies. ${msg}`);
        } finally {
          if (!cancelled) setMoviesLoading(false);
        }
      } else {
        if (tv !== null) return;
        setTvError("");
        setTvLoading(true);
        try {
          const data = await fetchTopRatedTv();
          if (!cancelled) setTv(data);
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          if (!cancelled) setTvError(`Failed to load TV shows. ${msg}`);
        } finally {
          if (!cancelled) setTvLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [tab, movies, tv]);

  const refresh = () => {
    if (tab === "movies") {
      setMovies(null);
      setMoviesError("");
    }
    if (tab === "tv") {
      setTv(null);
      setTvError("");
    }
    // effect will automatically trigger reload because data is now null
  };

  const value = useMemo(
    () => ({
      tab,
      setTab,
      movies,
      tv,
      moviesLoading,
      tvLoading,
      moviesError,
      tvError,
      refresh,
    }),
    [tab, movies, tv, moviesLoading, tvLoading, moviesError, tvError]
  );

  return (
    <MediaContext.Provider value={value}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMediaContext() {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error("useMediaContext must be used within a MediaProvider");
  }
  return context;
}