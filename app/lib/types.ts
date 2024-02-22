import { RowDataPacket } from "mysql2";

export interface IMovie {
  original_title: string;
  original_name: string;
  title: string;
  release_date: string;
  first_air_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  id: number;
  genres: IGenre[];
}

export interface IMovieSQL extends RowDataPacket {
  original_title: string;
  original_name: string;
  title: string;
  release_date: string;
  first_air_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  id: number;
  genres: IGenre[];
}

export interface IUser extends RowDataPacket {
  hashed_password: string;
}

export interface IRating extends RowDataPacket {
  rating: number;
  ratings_movie: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ISimilarMovie extends IMovie {
  genre_ids: number[];
}

export interface IMovieRating extends IMovie {
  rating: number;
}
