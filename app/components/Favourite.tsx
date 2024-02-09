import { User } from "lucia";
import { removeFavourite, setFavourite } from "../actions/favourite-actions";

export default async function Favourite({
  user,
  id,
  isFav,
  bigText = true,
}: {
  user: User | null;
  id: string;
  isFav: boolean;
  bigText: boolean;
}) {
  return (
    <>
      {user ? (
        isFav ? (
          <form action={removeFavourite.bind(null, id, user.id)}>
            <button
              type="submit"
              className={`px-2 py-1 bg-red-500 text-white font-bold w-fit rounded-md ${
                bigText ? "text-lg" : "text-sm"
              } hover:bg-red-600`}
            >
              Remove from favs
            </button>
          </form>
        ) : (
          <form action={setFavourite.bind(null, id, user.id)}>
            <button
              type="submit"
              className="px-2 py-1 bg-green-500 text-white w-fit rounded-md font-bold text-lg hover:bg-green-600"
            >
              Add to favs
            </button>
          </form>
        )
      ) : (
        ""
      )}
    </>
  );
}
