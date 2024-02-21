import { ISimilarMovie, Movie } from "./types";
import { ZodError } from "zod";

export function shortenSummary(str: string, length: number = 300) {
  if (str.length <= length) {
    return str;
  }
  return `${str.slice(0, length)}...`;
}

export function sortByBest(arr: ISimilarMovie[], count: number | undefined) {
  return arr
    .sort((a, b) => {
      return b.vote_average - a.vote_average;
    })
    .slice(0, count);
}

export function parseDate(str: string) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const arr = str.split("-");
  return `${month[Number(arr[1]) - 1]} ${arr[2]}, ${arr[0]}`;
}

export function getErrorString(error: ZodError) {
  return error.errors.map((arr) => arr.message).join("\n");
}
