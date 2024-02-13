"use server";

import { Movie } from "../lib/types";
import { myPool } from "../lib/auth";
import { User } from "lucia";
import { IRating } from "../lib/types";

export async function addRating(movie: Movie, rating: number, user: User) {
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

export async function getRating(movie: Movie, user: User) {
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
