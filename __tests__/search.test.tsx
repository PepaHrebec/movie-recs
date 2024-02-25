import { afterAll, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Search from "@/app/components/search";
import { IMovie } from "@/app/lib/types";
import { afterEach } from "node:test";

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

vi.mock("@/app/actions/tmdb-actions", async (importOriginal) => {
  const testSearchFetch = () => {
    return [movie, (movie.id = 1), (movie.id = 2)];
  };
  const actual = await importOriginal<
    typeof import("@/app/actions/tmdb-actions")
  >();
  return {
    ...actual,
    searchFetch: testSearchFetch,
  };
});

describe("Search", () => {
  test("Search input can be typed into.", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText<HTMLInputElement>("Movie...");
    fireEvent.change(input, { target: { value: "Movie" } });
    expect(input.value).toBe("Movie");
  });

  test("Search input generates a list of movies.", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText<HTMLInputElement>("Movie...");
    fireEvent.change(input, { target: { value: "Movie" } });
    fireEvent.focus(input);
    expect(await screen.findAllByRole("link")).toBeDefined();
  });
});
