import Image from "next/image";
import { Movie } from "@/app/lib/types";
import { validateRequest } from "@/app/lib/auth";
import { fetcher } from "@/app/actions/tmdb-actions";
import { isFavourite } from "@/app/actions/favourite-actions";
import SimilarMovies from "@/app/components/similar-movies";
import Favourite from "@/app/components/favourite";
import Rating from "@/app/components/rating";
import { getRating } from "@/app/actions/rating-actions";
import GenreBox from "@/app/components/genre-box";

export default async function Movie({ params }: { params: { id: string } }) {
  const movie: Movie = await fetcher(params.id);

  const { user } = await validateRequest();
  let isFav: boolean | undefined = false;
  let rating: number | null = null;

  if (user) {
    isFav = await isFavourite(params.id, user.id);
    rating = await getRating(movie, user);
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row sm:justify-center">
      <div className="flex flex-col gap-4 sm:flex-row max-w-[1124px] flex-1">
        <div className="sm:flex-1">
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
          <div className="flex flex-row justify-center pt-4">
            <Rating movie={movie} defaultRatingProp={rating} user={user} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-[2]">
          <h1 className="font-bold text-2xl pb-1">
            {movie.title ?? movie.original_title}{" "}
            {
              <span className="font-normal text-base">
                {movie.release_date.split("-")[0]}
              </span>
            }{" "}
          </h1>
          <div className="flex flex-row gap-2">
            <h2 className="mb-4 text-lg px-2 py-1 bg-gray-200 w-fit rounded-md">
              {Math.round(movie.vote_average * 10) / 10} / 10
            </h2>
            <Favourite
              id={params.id}
              isFav={isFav}
              user={user}
              bigText={true}
            />
          </div>
          <p className="mb-2">{movie.overview}</p>
          <div className="flex flex-row gap-2 flex-wrap my-2 mb-4">
            {movie.genres.map((genre) => (
              <GenreBox genre={genre} key={genre.id} />
            ))}
          </div>
          <SimilarMovies id={params.id} />
        </div>
      </div>
    </div>
  );
}
