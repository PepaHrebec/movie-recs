"use server";

import { IGenre, ISimilarMovie, IMovie } from "../lib/types";
import { sortByBest } from "../lib/lib";

export async function searchFetch(
  name: string,
  returnAmount: number | undefined
) {
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

  const movies: ISimilarMovie[] = nestedMovies.results;
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
  return sortByBest(movies, returnAmount);
}

export async function genreFetch() {
  const genresJson = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${process.env.API_TOKEN}`,
      },
    }
  );
  const nestedGenres = await genresJson.json();
  const genres: IGenre[] = nestedGenres.genres;
  return genres;
}

export async function fetcher(id: string, similar: boolean = false) {
  try {
    const movieJson = await fetch(
      `https://api.themoviedb.org/3/movie/${id}${similar ? "/similar" : ""}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `${process.env.API_TOKEN}`,
        },
        next: {
          revalidate: 7200,
        },
      }
    );
    const movie = await movieJson.json();
    if (similar) {
      return movie.results
        .sort((a: IMovie, b: IMovie) => {
          return b.vote_average - a.vote_average;
        })
        .slice(0, 4);
    }
    return movie;
  } catch (e) {
    console.log(e);
  }
}
