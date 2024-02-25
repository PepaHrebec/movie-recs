import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Rating from "@/app/components/rating";
import { IMovie } from "@/app/lib/types";
import { User } from "lucia";

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

const user: User = {
  username: "Joe",
  id: "uuid4",
};

vi.mock("react", async (importOriginal) => {
  const testCache = <T extends Function>(func: T) => func;
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    cache: testCache,
  };
});

describe("Rating component", () => {
  test("Doesn't render when no user provided.", async () => {
    render(<Rating defaultRatingProp={null} user={null} movie={movie} />);
    expect(screen.queryAllByTestId("rating-star")).toEqual([]);
  });

  test("Renders when user provided.", async () => {
    render(<Rating defaultRatingProp={null} user={user} movie={movie} />);
    expect(screen.queryAllByTestId("rating-star")).toHaveLength(5);
  });
});
