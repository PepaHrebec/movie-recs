"use server";

import { myPool } from "../lib/auth";
import { revalidatePath } from "next/cache";

export async function isFavourite(movieId: string, userId: string) {
  try {
    const [results] = await myPool.query(
      "SELECT * FROM favourites WHERE movie = ? AND user = ?",
      [movieId, userId]
    );
    if ((results as any[]).length) {
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
