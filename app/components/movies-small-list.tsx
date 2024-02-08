import { Movie } from "../lib/types";
import { shortenSummary } from "../lib/lib";
import Link from "next/link";

export async function MoviesSmallList({ movies }: { movies: Movie[] }) {
  return (
    <div className="pl-3 flex flex-col gap-3 text-base">
      {movies.length !== 0
        ? movies.map((movie) => {
            return (
              <div key={movie.id} className="flex flex-col">
                <div className="flex flex-row">
                  <Link
                    href={`/movie/${movie.id}`}
                    className="font-bold hover:underline"
                  >
                    {movie.title ? movie.title : movie.original_title}
                  </Link>
                  <div className="ml-2 text-sm px-2 py-1 bg-gray-200 w-fit rounded-md text-nowrap text-center leading-normal h-fit">
                    {Math.round(movie.vote_average * 10) / 10} / 10
                  </div>
                </div>
                <p>
                  {shortenSummary(movie.overview, 100)}
                  {"  ("}
                  {movie.release_date.split("-")[0]}
                  {")"}
                </p>
              </div>
            );
          })
        : "No similar movies found..."}
    </div>
  );
}
