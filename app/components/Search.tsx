"use client";

import { useState, useEffect } from "react";
import { searchFetch } from "../actions/tmdb-actions";
import Link from "next/link";
import { Movie } from "../lib/types";

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
  const [movies, setMovies] = useState<Movie[] | undefined>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(async () => {
      setMovies(await fetchData(movieSearch));
    }, 500);
    return () => clearTimeout(timeout);
  }, [movieSearch]);

  return (
    <div className="flex flex-col justify-end relative flex-1">
      <input
        type="text"
        placeholder="Movie..."
        value={movieSearch}
        onChange={(e) => setMovieSearch(e.target.value)}
        onFocus={() => setVisible(true)}
        onBlur={() => setTimeout(() => setVisible(false), 100)}
        className="p-2 rounded-md border-gray-300 bg-gray-50 border-solid border sm:w-72 focus:border-gray-400 focus:outline-none"
      />
      {movies !== undefined && movies.length !== 0 && visible ? (
        <div className="absolute w-full bottom-0 translate-y-[105%] flex flex-col rounded-md border border-solid border-gray-400 sm:w-72">
          {movies.map((movie) => {
            return (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="bg-white p-1 pl-2 first:rounded-t-md last:rounded-b-md border-b border-gray-400 hover:bg-gray-100"
              >
                {movie.title ?? movie.original_title ?? movie.original_name}
              </Link>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
