export interface Movie {
  backdrop_path: string;
  poster_path: string;
  title: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: { name: string }[];
  overview: string;
  spoken_languages: { name: string }[];
}
