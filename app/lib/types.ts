import { RowDataPacket } from "mysql2";

export interface Movie {
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

export interface IUser extends RowDataPacket {
  hashed_password: string;
}

export interface IRating extends RowDataPacket {
  rating: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ISimilarMovie extends Movie {
  genre_ids: number[];
}
