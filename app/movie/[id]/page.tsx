interface movie {
  original_title: string;
  release_date: string;
  overview: string;
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
      </div>
    </main>
  );
}
