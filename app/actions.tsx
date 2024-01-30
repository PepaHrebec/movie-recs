"use server";

import { sortByBest } from "./lib";
import { movie } from "./types";

export async function searchFetch(name: string) {
  const moviesJson = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${name}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${process.env.API_TOKEN}`,
      },
    }
  );
  const nestedMovies = await moviesJson.json();

  const movies: movie[] = nestedMovies.results;
  const normalizedMovieNames = movies.map((movie) => {
    if (movie.original_title !== undefined) {
      return movie.original_title.normalize("NFC").toLocaleLowerCase();
    }
    return movie.original_name.normalize("NFC").toLocaleLowerCase();
  });

  if (new Set(normalizedMovieNames).size !== movies.length) {
    movies.forEach((movie) => {
      movie.original_title = `${movie.original_title} (${
        movie.release_date
          ? movie.release_date.split("-")[0]
          : movie.first_air_date
          ? movie.first_air_date.split("-")[0]
          : "?"
      })`;
    });
  }
  return sortByBest(movies, 5);
}
