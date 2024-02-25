import { describe, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProfileRatedMovie from "@/app/components/profile-rated-movie";
import { IMovieRating } from "@/app/lib/types";
import { afterEach, beforeEach } from "node:test";

const movie: IMovieRating = {
  rating: 2,
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

describe("Card displaying movie marked as rated", () => {
  test("Card renders movie name.", () => {
    render(<ProfileRatedMovie movie={movie} />);
    expect(screen.getByText("No Way Up")).toBeDefined();
  });

  test("Renders when user provided.", async () => {
    render(<ProfileRatedMovie movie={movie} />);
    expect(screen.queryAllByTestId("rating-star")).toHaveLength(5);
  });
});
