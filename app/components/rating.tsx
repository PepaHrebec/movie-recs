"use client";

import { useState } from "react";
import { Movie } from "../lib/types";
import { addRating } from "../actions/rating-actions";
import { User } from "lucia";
import toast from "react-hot-toast";

export default function Rating({
  movie,
  defaultRatingProp,
  user,
}: {
  movie: Movie;
  defaultRatingProp: number | null;
  user: User | null;
}) {
  const [rating, setRating] = useState(0);
  const [defaultRating, setDefaultRating] = useState(defaultRatingProp);

  const defaultNullFallback = defaultRating === null ? 0 : defaultRating;

  async function rate(movie: Movie, value: number, user: User) {
    const rtrn = await addRating(movie, value, user);
    console.log(rtrn);
    if (rtrn) {
      setDefaultRating(rtrn);
    } else {
      toast.error("There was an issue adding the rating");
    }
  }

  return (
    <>
      {user ? (
        <ul className="flex flex-row gap-4 hover:cursor-pointer">
          {[1, 2, 3, 4, 5].map((value) => {
            return (
              <svg
                key={value}
                className={`w-4 h-4 ms-1 scale-[2] ${
                  rating !== 0
                    ? rating < value
                      ? "text-gray-400"
                      : "text-green-500"
                    : defaultNullFallback < value
                    ? "text-gray-400"
                    : "text-green-500"
                } `}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                onMouseEnter={() => setRating(value)}
                onMouseLeave={() => setRating(0)}
                onClick={() => rate(movie, value, user)}
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              // <li
              //   key={value}
              //   onMouseEnter={() => setRating(value)}
              //   onMouseLeave={() => setRating(0)}
              //   style={{
              //     color:
              //       rating !== 0
              //         ? rating < value
              //           ? "black"
              //           : "red"
              //         : defaultNullFallback < value
              //         ? "black"
              //         : "red",
              //   }}
              //   onClick={() => rate(movie, value, user)}
              // >
              //   {value}
              // </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
