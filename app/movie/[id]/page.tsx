import Image from "next/image";
import Link from "next/link";
import { shortenSummary } from "@/app/lib";
import { movie } from "@/app/types";

async function fetcher(id: string, similar: boolean = false) {
  const movieJson = await fetch(
    `https://api.themoviedb.org/3/movie/${id}${similar ? "/similar" : ""}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${process.env.API_TOKEN}`,
      },
    }
  );
  const movie = await movieJson.json();
  console.log(movie);
  if (similar) {
    return movie.results
      .sort((a: movie, b: movie) => {
        return b.vote_average - a.vote_average;
      })
      .slice(0, 4);
  }
  return movie;
}

export default async function Movie({ params }: { params: { id: string } }) {
  const movie: movie = await fetcher(params.id);
  const similarMovies: movie[] = await fetcher(params.id, true);

  return (
    <main className="flex flex-col gap-4">
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt="Picture of the poster"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
          priority={true}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl">{movie.original_title}</h1>
        <h2 className="mb-4 text-lg px-2 py-1 bg-gray-200 w-fit rounded-md">
          {Math.round(movie.vote_average * 10) / 10} / 10
        </h2>
        <p className="mb-2">{movie.overview}</p>
        <div className="flex flex-row gap-2 flex-wrap mb-4">
          {movie.genres.map((genre) => {
            return (
              <div
                key={genre.id}
                className="px-4 py-1 bg-gray-200 w-fit rounded-md"
              >
                {genre.name}
              </div>
            );
          })}
        </div>
        <h3 className="font-bold text-lg mb-4">Similar movies</h3>
        <div className="pl-3 flex flex-col gap-3 text-base">
          {similarMovies.length !== 0
            ? similarMovies.map((movie) => {
                return (
                  <div key={movie.id} className="flex flex-col">
                    <div className="flex flex-row">
                      <Link href={`/movie/${movie.id}`} className="font-bold">
                        {movie.title ? movie.title : movie.original_title}
                        <span className="ml-2 text-sm px-2 py-1 bg-gray-200 w-fit rounded-md text-nowrap">
                          {Math.round(movie.vote_average * 10) / 10} / 10
                        </span>
                      </Link>
                    </div>
                    <p>{shortenSummary(movie.overview, 100)}</p>
                  </div>
                );
              })
            : "No similar movies found..."}
        </div>
      </div>
    </main>
  );
}
