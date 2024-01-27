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
  const [visible, setVisible] = useState(false);

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
        onFocus={() => setVisible(true)}
        onBlur={() => setTimeout(() => setVisible(false), 100)}
        className="p-2"
      />
      <div className="absolute bottom-0 translate-y-full w-96 flex flex-col">
        {movies !== undefined && movies.length !== 0 && visible
          ? movies.map((movie) => {
              return (
                <a
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="bg-white p-1"
                >
                  {movie.original_title ?? movie.original_name}
                </a>
              );
            })
          : ""}
      </div>
    </div>
  );
}
