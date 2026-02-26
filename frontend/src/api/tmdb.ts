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