import type { Movie } from "../Context/MovieContext";

const tmdbToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN as string;
if (!tmdbToken) {
  throw new Error("VITE_TMDB_ACCESS_TOKEN is missing");
}

const authHeader = `Bearer ${tmdbToken}`;

export const getTrendingMovie = async (): Promise<Movie[]> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: authHeader,
    },
  };

  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    );
    const data = await res.json();
    return (data?.results ?? []) as Movie[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchMovie = async (title: string): Promise<Movie[]> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: authHeader,
    },
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${title}`,
      options
    );
    const data = await res.json();
    return (data?.results ?? []) as Movie[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
