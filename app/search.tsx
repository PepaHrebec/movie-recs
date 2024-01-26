"use client";

import { useState, useEffect } from "react";
import { searchFetch } from "./actions";

interface movie {
  original_title: string;
  original_name: string;
  release_date: string;
  overview: string;
  id: number;
}

async function fetchData(name: string) {
  if (name === "") {
    return;
  }
  const movie = await searchFetch(name);
  console.log(movie);
  return movie;
}

export default function Search() {
  const [movieSearch, setMovieSearch] = useState("");
  const [movies, setMovies] = useState<movie[]>([]);

  useEffect(() => {
    let timeout = setTimeout(async () => {
      setMovies(await fetchData(movieSearch));
    }, 500);
    return () => clearTimeout(timeout);
  }, [movieSearch]);

  return (
    <div className="flex flex-col justify-end relative">
      <input
        type="text"
        placeholder="Movie..."
        value={movieSearch}
        onChange={(e) => setMovieSearch(e.target.value)}
      />
      <div className="absolute bottom-0 translate-y-full w-96">
        {movies !== undefined && movies.length !== 0
          ? movies.map((movie) => {
              return (
                <div key={movie.id} className="bg-white">
                  {movie.original_title ?? movie.original_name}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
