import { movie } from "../lib/types";
import Link from "next/link";
import { shortenSummary } from "../lib/lib";
import { fetcher } from "../actions";

export default async function SimilarMovies({ id }: { id: string }) {
  const similarMovies: movie[] = await fetcher(id, true);

  return (
    <>
      <h3 className="font-bold text-lg mb-3">Similar movies</h3>
      <div className="pl-3 flex flex-col gap-3 text-base">
        {similarMovies.length !== 0
          ? similarMovies.map((movie) => {
              return (
                <div key={movie.id} className="flex flex-col">
                  <div className="flex flex-row">
                    <Link
                      href={`/movie/${movie.id}`}
                      className="font-bold hover:underline"
                    >
                      {movie.title ? movie.title : movie.original_title}
                    </Link>
                    <div className="ml-2 text-sm px-2 bg-gray-200 w-fit rounded-md text-nowrap text-center leading-normal">
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
    </>
  );
}
