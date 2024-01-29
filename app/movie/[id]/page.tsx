import Image from "next/image";

interface movie {
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

async function getMovie(id: string) {
  const movieJson = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${process.env.API_TOKEN}`,
    },
  });
  const movie = await movieJson.json();
  console.log(movie);
  return movie;
}

export default async function Movie({ params }: { params: { id: string } }) {
  const movie: movie = await getMovie(params.id);

  return (
    <main className="flex flex-col gap-4">
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt="Picture of the poster"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl">{movie.original_title}</h1>
        <h2 className="mb-4 text-lg">
          {Math.round(movie.vote_average * 10) / 10} / 10
        </h2>
        <p>{movie.overview}</p>
      </div>
    </main>
  );
}
