"use server";

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
  return movies.results[0];
}
