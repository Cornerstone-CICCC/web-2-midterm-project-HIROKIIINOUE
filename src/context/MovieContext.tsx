/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

export type Movie = {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string | null;
  [key: string]: unknown;
};

type MovieContextValue = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
};

const MovieContext = createContext<MovieContextValue | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error("useMovies must be used within MovieProvider");
  return ctx;
}

