"use server";

import { IGenre, ISimilarMovie } from "../lib/types";
import Image from "next/image";
import GenreBox from "./genre-box";
import Link from "next/link";

export default async function Card({
  movie,
  genres,
}: {
  movie: ISimilarMovie;
  genres: IGenre[];
}) {
  return (
    <div className="flex flex-row gap-2 odd:bg-white even:bg-slate-50 p-4 rounded-md sm:min-w-[480px]">
      <Link href={`/movie/${movie.id}`} className="w-24 min-w-24">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="Picture of the poster"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            priority={true}
          />
        ) : (
          <div className="w-full aspect-[2/3] rounded bg-gray-200 flex flex-col justify-center items-center">
            <p className="text-center text-gray-500">No poster found</p>
          </div>
        )}
      </Link>
      <div className="flex flex-col justify-between">
        <div>
          <Link
            href={`/movie/${movie.id}`}
            className="font-bold text-lg hover:underline"
          >
            <h2>
              {movie.title ?? movie.original_title ?? movie.original_name}
            </h2>
          </Link>
          <div className="w-fit ">
            {Math.round(movie.vote_average * 10) / 10} / 10
          </div>
        </div>
        <div className="flex flex-row gap-2">
          {genres
            .filter((genre) => movie.genre_ids.includes(genre.id))
            .slice(0, 2)
            .map((genre) => (
              <GenreBox key={genre.id} genre={genre} />
            ))}
        </div>
      </div>
    </div>
  );
}
