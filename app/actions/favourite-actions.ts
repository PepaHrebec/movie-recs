"use server";

import { User } from "lucia";
import { myPool } from "../lib/auth";
import { revalidatePath } from "next/cache";
import { IMovie, IMovieSQL } from "../lib/types";
import { fetcher } from "./tmdb-actions";
import { RowDataPacket } from "mysql2";

export async function isFavourite(movieId: string, userId: string) {
  try {
    const [results] = await myPool.query<RowDataPacket[]>(
      "SELECT * FROM favourites WHERE movie = ? AND user = ?",
      [movieId, userId]
    );
    if (results.length) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

export async function setFavourite(movieId: string, userId: string) {
  try {
    const [results] = await myPool.query(
      "INSERT INTO favourites (movie, user) VALUES (?, ?)",
      [movieId, userId]
    );
  } catch (error) {
    console.log(error);
  }
  return revalidatePath("/");
}

export async function removeFavourite(movieId: string, userId: string) {
  try {
    const [results] = await myPool.query(
      "DELETE FROM favourites WHERE movie = ? AND user = ?",
      [movieId, userId]
    );
  } catch (error) {
    console.log(error);
  }
  return revalidatePath("/");
}

export async function getFavouriteMovies(user: User) {
  const [markedResults] = await myPool.query<IMovieSQL[]>(
    "SELECT movie FROM favourites WHERE user = ?",
    [user.id]
  );

  const markedMovies: IMovie[] = await Promise.all(
    markedResults.map(async (res) => {
      return await fetcher(res.movie);
    })
  );

  return markedMovies;
}
