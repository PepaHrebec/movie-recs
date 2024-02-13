import { Movie } from "../lib/types";
import { User } from "lucia";
import Favourite from "./favourite";
import { shortenSummary } from "../lib/lib";
import Link from "next/link";

export default function ProfileMovieCard({
  movie,
  user,
}: {
  movie: Movie;
  user: User | null;
}) {
  return (
    <div className="flex flex-col max-w-72 sm:max-w-64 rounded-md border-gray-300 bg-gray-50 p-4">
      <h2 className="font-bold text-lg hover:underline w-fit">
        <Link href={`/movie/${movie.id}`}>
          {movie.title ?? movie.original_title}
        </Link>
      </h2>
      <p className="pb-2 flex-1">{shortenSummary(movie.overview, 140)}</p>
      <Favourite user={user} id={`${movie.id}`} isFav={true} bigText={false} />
    </div>
  );
}
