import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import GenreBox from "@/app/components/genre-box";
import { IGenre } from "@/app/lib/types";

const genre: IGenre = {
  id: 22,
  name: "Action",
};

test("Genre Box is rendering prop value.", async () => {
  render(<GenreBox genre={genre} />);
  expect(await screen.findByText(/action/i)).toBeDefined();
});
