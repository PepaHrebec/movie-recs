import { IGenre } from "../lib/types";

export default function GenreBox({ genre }: { genre: IGenre }) {
  return (
    <div className="px-4 py-1 bg-gray-200 w-fit rounded-md">{genre.name}</div>
  );
}
