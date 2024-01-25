import Link from "next/link";

interface movie {
  original_title: string;
  release_date: string;
  overview: string;
  id: number;
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

function Card({ original_title, overview, release_date, id }: movie) {
  return (
    <div>
      <h2>{original_title}</h2>
      <p>{overview}</p>
      <h3>{release_date}</h3>
      <Link href={`/movie/${id}`}>Details</Link>
    </div>
  );
}

export default async function Home() {
  const movies = await getMovies();
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <h1>Popular movies</h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1">
        {movies.map((movie: movie) => {
          return (
            <Card
              key={movie.id}
              original_title={movie.original_title}
              overview={movie.overview}
              release_date={movie.release_date}
              id={movie.id}
            />
          );
        })}
      </div>
    </main>
  );
}
