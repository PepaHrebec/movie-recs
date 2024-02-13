import { Movie } from "../lib/types";
import { fetcher } from "../actions/tmdb-actions";
import { MoviesSmallList } from "./movies-small-list";

export default async function SimilarMovies({ id }: { id: string }) {
  const similarMovies: Movie[] = await fetcher(id, true);

  return (
    <>
      <h3 className="font-bold text-lg mb-3">Similar movies</h3>
      <MoviesSmallList
        movies={similarMovies}
        user={null}
        bigText={true}
        summaryLength={120}
      />
    </>
  );
}
