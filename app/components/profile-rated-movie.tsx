import { IMovieRating } from "../lib/types";
import Link from "next/link";

export default function ProfileRatedMovie({ movie }: { movie: IMovieRating }) {
  return (
    <div
      key={movie.id}
      className="p-2 bg-gray-50 rounded-md flex flex-col justify-between"
    >
      <h2 className="font-bold text-lg hover:underline w-fit pb-4 sm:pb-2">
        <Link href={`/movie/${movie.id}`}>
          {movie.title ?? movie.original_title}
        </Link>
      </h2>
      <ul className="flex flex-row gap-2">
        {[1, 2, 3, 4, 5].map((value) => {
          return (
            <svg
              data-testid="rating-star"
              key={value}
              className={`w-4 h-4 ms-1 scale-[1.2] ${
                movie.rating < value ? "text-gray-400" : "text-green-500"
              } `}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          );
        })}
      </ul>
    </div>
  );
}
