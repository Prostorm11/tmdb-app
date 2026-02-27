import "./App.css";
import Tabs from "./components/Tabs";
import MediaGrid from "./components/MediaGrid";
import { useMediaContext } from "./context/MediaContext";
import { FaSpinner } from "react-icons/fa";

export default function App() {
  const {
    tab,
    setTab,
    movies,
    tv,
    moviesLoading,
    tvLoading,
    moviesError,
    tvError,
  } = useMediaContext();

  const items = tab === "movies" ? movies : tv;
  const isLoading = tab === "movies" ? moviesLoading : tvLoading;
  const currentError = tab === "movies" ? moviesError : tvError;

  return (
    <div className="page">
      <header className="header">
        <h1>TMDB Top Rated</h1>
        <p className="subtitle">Symfony API + React (TypeScript)</p>
      </header>

      <Tabs active={tab} onChange={setTab} />

      {isLoading && (
        <div className="loading-container">
          <FaSpinner className="icon-spinner" />
          <p className="loading-text">
            Loading {tab === "movies" ? "movies" : "TV shows"}...
          </p>
        </div>
      )}
      {currentError && <div className="state error">{currentError}</div>}

      {!isLoading && !currentError && items && (
        <MediaGrid tab={tab} items={items} />
      )}

      {!isLoading && !currentError && items && items.length === 0 && (
        <div className="state">No results.</div>
      )}
    </div>
  );
}
