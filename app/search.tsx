"use client";

import { useState, useEffect } from "react";
import { searchFetch } from "./actions";

// async function fetchData(name: string) {
//   let timeout = setTimeout(async () => {
//     const movie = await searchFetch(name);
//     console.log(movie);
//   });
// }

export default function Search() {
  const [movieSearch, setMovieSearch] = useState("");

  useEffect(() => {
    let timeout = setTimeout(async () => {
      const movie = await searchFetch(movieSearch);
      console.log(movie);
    }, 500);
    return () => clearTimeout(timeout);
  }, [movieSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Movie..."
        onChange={(e) => setMovieSearch(e.target.value)}
      />
      <div>{movieSearch}</div>
    </div>
  );
}
