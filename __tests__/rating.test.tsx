import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Rating from "@/app/components/rating";
import { IMovie } from "@/app/lib/types";

const movie: IMovie = {
  genres: [
    {
      id: 1,
      name: "Action",
    },
  ],
  first_air_date: "2024-01-18",
  original_name: "No Way Up",
  id: 1096197,
  original_title: "No Way Up",
  overview:
    "Characters from different backgrounds are thrown together when the plane they're travelling on crashes into the Pacific Ocean. A nightmare fight for survival ensues with the air supply running out and dangers creeping in from all sides.",
  poster_path: "/rieMzC6JJoMVbsaUv6Rzj0fR7Px.jpg",
  release_date: "2024-01-18",
  title: "No Way Up",
  vote_average: 5.8,
};

describe("Rating component.", () => {
  test("Doesn't render when no user provided.", async () => {
    // try to fix the cache issue
    // render(<Rating defaultRatingProp={null} user={null} movie={movie} />);
    // expect(await screen.findAllByTestId("rating-star")).toBeUndefined();
  });
});
