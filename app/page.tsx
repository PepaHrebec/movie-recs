import Link from "next/link";
import Image from "next/image";

interface movie {
  original_title: string;
  release_date: string;
  overview: string;
  id: number;
  poster_path: string;
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

function shortenSummary(str: string, length: number = 300) {
  if (str.length <= length) {
    return str;
  }
  return `${str.slice(0, length)}...`;
}

function parseDate(str: string) {
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

function Card({
  original_title,
  overview,
  release_date,
  id,
  poster_path,
}: movie) {
  return (
    <div className="pt-6 w-10/12 flex flex-row gap-4">
      <div className="flex-1">
        <Image
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt="Picture of the author"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
        />
      </div>
      <div className="flex-1">
        <h2 className="font-bold mb-4">{original_title}</h2>
        <p className="mb-4 text-balance">{shortenSummary(overview)}</p>
        <div>{parseDate(release_date)}</div>
        <Link href={`/movie/${id}`}>Details</Link>
      </div>
    </div>
  );
}

export default async function Home() {
  const movies = await getMovies();
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <h1 className="font-bold text-xl">Popular movies</h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 justify-items-center">
        {movies.map((movie: movie) => {
          return (
            <Card
              key={movie.id}
              original_title={movie.original_title}
              overview={movie.overview}
              release_date={movie.release_date}
              id={movie.id}
              poster_path={movie.poster_path}
            />
          );
        })}
      </div>
    </main>
  );
}
