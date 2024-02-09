"use client";

import { useState, useEffect } from "react";
import { searchFetch } from "../actions/tmdb-actions";
import Link from "next/link";

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
  const [movies, setMovies] = useState<movie[] | undefined>([]);
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
        className="p-2 rounded-md border-gray-500 border-solid border sm:w-72"
      />
      {movies !== undefined && movies.length !== 0 && visible ? (
        <div className="absolute bottom-0 translate-y-[105%] flex flex-col rounded-md border border-solid border-gray-500 sm:w-72">
          {movies.map((movie) => {
            return (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="bg-white p-1 first:rounded-t-md last:rounded-b-md border-b border-gray-400 hover:bg-gray-100"
              >
                {movie.original_title ?? movie.original_name}
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
