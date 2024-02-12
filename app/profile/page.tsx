import { redirect } from "next/navigation";
import { validateRequest } from "../lib/auth";
import { myPool } from "../lib/auth";
import { Movie } from "../lib/types";
import { fetcher } from "../actions/tmdb-actions";
import ProfileMovieCard from "../components/profile-movie-card";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/");
  }

  const [results] = await myPool.query(
    "SELECT movie FROM favourites WHERE user = ?",
    [user.id]
  );

  const movies: Movie[] = await Promise.all(
    (results as { movie: string }[]).map(async (res) => {
      return await fetcher(res.movie);
    })
  );

  return (
    <div>
      <h1 className="text-xl pb-10">
        Hi, <span className="font-bold">{user.username}</span>, here are your
        marked movies!
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center gap-6 sm:flex-row sm:flex-wrap max-w-[1124px]">
          {movies.map((movie) => {
            return (
              <ProfileMovieCard movie={movie} user={user} key={movie.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
