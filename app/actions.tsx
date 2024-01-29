"use server";

interface movie {
  original_title: string;
  original_name: string;
  release_date: string;
  first_air_date: string;
  overview: string;
  id: number;
  vote_average: number;
}

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

  const movies = nestedMovies.results;
  console.log(movies);
  const normalizedMovieNames = (movies as movie[]).map((movie) => {
    if (movie.original_title !== undefined) {
      return movie.original_title.normalize("NFC").toLocaleLowerCase();
    }
    return movie.original_name.normalize("NFC").toLocaleLowerCase();
  });

  if (new Set(normalizedMovieNames).size !== movies.length) {
    (movies as movie[]).forEach((movie) => {
      movie.original_title = `${movie.original_title} (${
        movie.release_date
          ? movie.release_date.split("-")[0]
          : movie.first_air_date
          ? movie.first_air_date.split("-")[0]
          : "?"
      })`;
    });
  }
  return movies.slice(0, 5).sort((a: movie, b: movie) => {
    return b.vote_average - a.vote_average;
  });
}
