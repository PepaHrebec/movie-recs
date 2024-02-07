import { User } from "lucia";
import Link from "next/link";
import { logout } from "../actions";

export default async function LayoutProfileMngmnt({
  user,
}: {
  user: User | null;
}) {
  return (
    <div className="flex flex-row items-center">
      {user?.username ? (
        <div className="flex flex-row gap-4">
          <div className="flex justify-center items-center">
            <div>{user.username}</div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="p-2 rounded-md bg-slate-200 hover:bg-slate-300 w-fit"
            >
              Log-out
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          <Link href={"/log-in"} className="w-fit text-nowrap">
            Log-in
          </Link>
          <Link href={"/sign-up"} className="w-fit text-nowrap">
            Sign-up
          </Link>
        </div>
      )}
    </div>
  );
}
