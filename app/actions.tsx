"use server";

interface movie {
  original_title: string;
  release_date: string;
  overview: string;
  id: number;
  vote_average: number;
}

export async function searchFetch(name: string) {
  const moviesJson = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${name}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${process.env.API_TOKEN}`,
      },
    }
  );
  const movies = await moviesJson.json();
  return movies.results.slice(0, 4).sort((a: movie, b: movie) => {
    return b.vote_average - a.vote_average;
  });
}
