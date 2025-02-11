export interface Movie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: { name: string }[];
  production_companies: { logo_path: string; id: number }[];
  homepage: string;
  overview: string;
  spoken_languages: { english_name: string }[];
}
