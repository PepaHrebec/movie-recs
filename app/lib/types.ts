export interface movie {
  original_title: string;
  original_name: string;
  title: string;
  release_date: string;
  first_air_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  id: number;
  genres: {
    id: number;
    name: string;
  }[];
}
