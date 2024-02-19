import { genreFetch, searchFetch } from "@/app/actions/tmdb-actions";
import Card from "@/app/components/search-movie-card";

export default async function Page({
  params,
}: {
  params: { searched: string };
}) {
  const movies = await searchFetch(params.searched, undefined);
  const genres = await genreFetch();

  return (
    <div className="flex flex-col items-center">
      <div className="gap-1 flex flex-col">
        {movies.map((movie) => {
          return <Card movie={movie} key={movie.id} genres={genres} />;
        })}
      </div>
    </div>
  );
}
