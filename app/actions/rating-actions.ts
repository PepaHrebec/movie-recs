"use server";

import { IMovieRating, IMovie } from "../lib/types";
import { myPool } from "../lib/auth";
import { User } from "lucia";
import { IRating } from "../lib/types";
import { fetcher } from "./tmdb-actions";

export async function addRating(movie: IMovie, rating: number, user: User) {
  try {
    const ratingExists = await getRating(movie, user);
    if (ratingExists) {
      const [results] = await myPool.query(
        "UPDATE ratings SET rating = ? WHERE ratings_movie = ? AND ratings_user = ?",
        [rating, movie.id, user.id]
      );
      return rating;
    } else {
      const [results] = await myPool.query(
        "INSERT INTO ratings (ratings_user, ratings_movie, rating) VALUES (?, ?, ?)",
        [user.id, movie.id, rating]
      );
      return rating;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getRating(movie: IMovie, user: User) {
  try {
    const [results] = await myPool.query<IRating[]>(
      "SELECT rating FROM ratings WHERE ratings_movie = ? AND ratings_user = ?",
      [movie.id, user.id]
    );
    if (results.length) {
      return results[0].rating;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getRatedMovies(user: User) {
  const [ratedResults] = await myPool.query<IRating[]>(
    "SELECT ratings_movie, rating FROM ratings WHERE ratings_user = ?",
    [user.id]
  );

  const map = new Map();
  ratedResults.forEach((res) => {
    map.set(res.ratings_movie, res.rating);
  });

  const movies: IMovie[] = await Promise.all(
    ratedResults.map(async (res) => {
      return await fetcher(res.ratings_movie);
    })
  );

  (movies as IMovieRating[]).forEach(
    (movie) => (movie.rating = map.get(`${movie.id}`))
  );

  return movies as IMovieRating[];
}
