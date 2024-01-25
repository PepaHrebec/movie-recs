interface movie {
  original_title: string;
  release_date: string;
  overview: string;
}

async function getMovies() {
  const moviesJson = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${process.env.API_TOKEN}`,
      },
    }
  );
  const movies = await moviesJson.json();
  return movies.results;
}

export default async function Home() {
  const movies = await getMovies();
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div>
        {movies.map((movie: movie) => {
          return (
            <div key={movie.original_title}>
              <h2>{movie.original_title}</h2>
              <p>{movie.overview}</p>
              <h3>{movie.release_date}</h3>
            </div>
          );
        })}
      </div>
    </main>
  );
}
