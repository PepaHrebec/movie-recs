import { redirect } from "next/navigation";
import { validateRequest } from "../lib/auth";
import ProfileMovieCard from "../components/profile-movie-card";
import { getRatedMovies } from "../actions/rating-actions";
import { getFavouriteMovies } from "../actions/favourite-actions";
import ProfileRatedMovie from "../components/profile-rated-movie";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/");
  }

  const favouriteMovies = await getFavouriteMovies(user);
  const ratedMovies = await getRatedMovies(user);

  return (
    <div>
      <h1 className="text-xl pb-10">
        Hi, <span className="font-bold">{user.username}</span>, here are your
        marked movies!
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center gap-6 sm:flex-row sm:flex-wrap max-w-[1124px]">
          {favouriteMovies.length ? (
            favouriteMovies.map((movie) => {
              return (
                <ProfileMovieCard movie={movie} user={user} key={movie.id} />
              );
            })
          ) : (
            <div className="p-10"> No movies found, yet... </div>
          )}
        </div>
      </div>
      <h1 className="text-xl pb-10 pt-10">
        And here are your reviewed movies.
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-[1124px] justify-center">
          {ratedMovies.length ? (
            ratedMovies.map((movie) => {
              return <ProfileRatedMovie movie={movie} key={movie.id} />;
            })
          ) : (
            <div className="p-10"> No movies rated, yet... </div>
          )}
        </div>
      </div>
    </div>
  );
}
