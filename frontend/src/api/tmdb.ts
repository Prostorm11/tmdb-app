export type MovieItem = {
  id: number;
  title: string;
  poster: string | null;
  rating: number | null;
  date: string | null;
  overview: string;
};

export type TvItem = {
  id: number;
  name: string;
  poster: string | null;
  rating: number | null;
  date: string | null;
  overview: string;
};

export type MediaDetailItem = {
  id: number;
  title?: string;               // movie only
  name?: string;                // tv only
  poster: string | null;
  backdrop: string | null;
  rating: number | null;
  date: string | null;
  overview: string;
  tagline?: string;
  genres: string[];
  runtime?: string;             // e.g. "142 min" or "45 min/ep"
  number_of_seasons?: number;   // tv only
  number_of_episodes?: number;  // tv only
  status?: string;

};

type ApiResponse<T> = {
  page?: number;
  results: T[];
};

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export async function fetchTopRatedMovies(): Promise<MovieItem[]> {
  const data = await getJson<ApiResponse<MovieItem>>("/api/movies/top-rated");
  return data.results;
}

export async function fetchTopRatedTv(): Promise<TvItem[]> {
  const data = await getJson<ApiResponse<TvItem>>("/api/tv/top-rated");
  return data.results;
}



export async function fetchMovieDetail(id: number): Promise<MediaDetailItem> {
  const data = await getJson<MediaDetailItem>(`/api/movies/${id}`);
  return data;
}

export async function fetchTvDetail(id: number): Promise<MediaDetailItem> {
  const data = await getJson<MediaDetailItem>(`/api/tv/${id}`);
  return data;
}