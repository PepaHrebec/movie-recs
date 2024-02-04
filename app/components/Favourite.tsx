import { User } from "lucia";
import { removeFavourite, setFavourite } from "../actions";

export default async function Favourite({
  user,
  id,
  isFav,
}: {
  user: User | null;
  id: string;
  isFav: boolean;
}) {
  return (
    <>
      {user ? (
        isFav ? (
          <div>
            Remove from favs
            <form action={removeFavourite.bind(null, id, user.id)}>
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <div>
            Add to favs
            <form action={setFavourite.bind(null, id, user.id)}>
              <button type="submit">Submit</button>
            </form>
          </div>
        )
      ) : (
        ""
      )}
    </>
  );
}
