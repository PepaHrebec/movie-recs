"use client";

import { useState, useEffect } from "react";
import { searchFetch } from "../actions/tmdb-actions";
import Link from "next/link";
import { Movie } from "../lib/types";
import { navigate } from "../actions/navigation-actions";

async function fetchData(name: string) {
  if (name === "") {
    return;
  }
  const movie = await searchFetch(name, 5);
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
      <div className="flex flex-row items-center">
        <input
          type="text"
          placeholder="Movie..."
          value={movieSearch}
          onChange={(e) => setMovieSearch(e.target.value)}
          onFocus={() => setVisible(true)}
          onBlur={() => setTimeout(() => setVisible(false), 100)}
          className="p-2 rounded-md border-gray-300 bg-gray-50 border-solid border sm:w-72 w-full focus:border-gray-400 focus:outline-none z-10"
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold h-[42px] px-2 rounded-r-md flex flex-col justify-center items-center relative z-0 -left-1"
          onClick={() => navigate(movieSearch)}
        >
          Search
        </button>
      </div>
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
