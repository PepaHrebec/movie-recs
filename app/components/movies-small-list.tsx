import { Movie } from "../lib/types";
import { shortenSummary } from "../lib/lib";
import Link from "next/link";
import Favourite from "./favourite";
import { User } from "lucia";

export async function MoviesSmallList({
  movies,
  user = null,
  bigText,
}: {
  movies: Movie[];
  user: User | null;
  bigText: boolean;
}) {
  return (
    <div className="pl-3 flex flex-col gap-4 text-base">
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

                <p className="mb-1">
                  {shortenSummary(movie.overview, 100)}
                  {"  ("}
                  {movie.release_date.split("-")[0] !== ""
                    ? movie.release_date.split("-")[0]
                    : "?"}
                  {")"}
                </p>
                <Favourite
                  id={`${movie.id}`}
                  isFav={true}
                  user={user}
                  bigText={bigText}
                />
              </div>
            );
          })
        : "No similar movies found..."}
    </div>
  );
}
