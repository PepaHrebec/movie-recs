export default function MyForm({
  h1Text,
  usernameP = "",
  passwordP = "",
  action,
}: {
  h1Text: string;
  usernameP?: string;
  passwordP?: string;
  action: (FormData: FormData) => Promise<any>;
}) {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl mb-4">{h1Text}</h1>
      <form action={action}>
        <label htmlFor="username" className="block mb-2 font-semibold">
          Username
        </label>
        <input
          name="username"
          id="username"
          className="border-black border rounded-md py-1 pl-2 w-full mb-1"
          placeholder="tarantino"
        />
        <p className="mb-3 font-light">{usernameP}</p>
        <label htmlFor="password" className="block mb-2 font-semibold">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="SuperSecretPassword"
          className="border-black border rounded-md mb-2 py-1 pl-2 w-full"
        />
        <p className="mb-4 font-light">{passwordP}</p>
        <button className="p-2 rounded-md bg-slate-300 text-lg">Submit</button>
      </form>
    </div>
  );
}
