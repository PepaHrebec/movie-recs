import { movie } from "./types";

export function shortenSummary(str: string, length: number = 300) {
  if (str.length <= length) {
    return str;
  }
  return `${str.slice(0, length)}...`;
}

export function sortByBest(arr: movie[], count: number) {
  return arr
    .sort((a, b) => {
      return b.vote_average - a.vote_average;
    })
    .slice(0, count);
}
