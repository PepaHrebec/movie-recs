import Image from "next/image";

interface movie {
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string;
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
    <main>
      <div>
        <h1>{movie.original_title}</h1>
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt="Picture of the poster"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </main>
  );
}
