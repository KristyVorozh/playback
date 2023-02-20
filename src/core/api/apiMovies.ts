import { useQuery, UseQueryOptions } from "react-query";
import apiClient from "../../http-common";
import axios, { AxiosResponse } from "axios";

type GetReleasesType = {
  year: number;
  month: string;
  page?: number;
};
export type MovieOptions = {
  data: {
    page: 1;
    total: 34;
    releases: MovieArray[];
  };
};
type Countries = {
  country: string;
};
type Genres = {
  genre: string;
};
export type MovieArray = {
  kinopoiskId: any;
  filmId: number;
  nameRu: string;
  nameEn: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: Countries[];
  genres: Genres[];
  rating: number;
  ratingVoteCount: number;
  expectationsRating: number;
  expectationsRatingVoteCount: number;
  duration: number;
  releaseDate: string;
};
export type UseGenericQueryOptions<TD, TE> = Omit<
  UseQueryOptions<TD, TE, TD, any>,
  "queryKey" | "queryFn"
>;

type UseMoviesOptions = UseGenericQueryOptions<MovieOptions, AxiosResponse>;
export const useGetReleases = (
  queryParam?: GetReleasesType,
  options?: UseMoviesOptions
) => {
  const url = `/api/v2.1/films/releases`;
  return useQuery(
    [url, queryParam],
    async function () {
      return apiClient.get(url, { params: { ...queryParam } });
    },
    options
  );
};
export type GenresArray = {
  id: number;
  genre: string;
};
type GenresOptions = {
  data: {
    genres: GenresArray[];
  };
};
type UseGenresMovies = UseGenericQueryOptions<GenresOptions, AxiosResponse>;
export const useGetGenres = (options?: UseGenresMovies) => {
  const url = `/api/v2.2/films/filters`;
  return useQuery(
    [url],
    async function () {
      return apiClient.get(url);
    },
    options
  );
};
type SearchMovieOptions = {
  data: {
    keyword: string;
    pagesCount: number;
    searchFilmsCountResult: number;
    films: any[];
  };
};
type UseSearchMovieOptions = UseGenericQueryOptions<
  SearchMovieOptions,
  AxiosResponse
>;

export const useGetSearchMovie = (
  keyword: string,
  options?: UseSearchMovieOptions
) => {
  const url = `/api/v2.1/films/search-by-keyword?keyword=${keyword}`;
  return useQuery(
    [url, keyword],
    async function () {
      return apiClient.get(url);
    },
    options
  );
};

export type MovieTypeItem = {
  releaseDate: any;
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl: string;
  logoUrl: string;
  reviewsCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number;
  ratingAwaitCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  year: number;
  filmLength: number;
  slogan: string;
  description: string;
  shortDescription: string;
  editorAnnotation: string;
  isTicketsAvailable: boolean;
  productionStatus: string;
  type: string;
  ratingMpaa: string;
  ratingAgeLimits: string;
  hasImax: boolean;
  has3D: boolean;
  lastSync: string;
  countries: Countries[];
  genres: Genres[];
  startYear: number;
  endYear: number;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
};
type MovieOptionsById = {
  data: MovieTypeItem;
};
type UseMoviesOptionsById = UseGenericQueryOptions<
  MovieOptionsById,
  AxiosResponse
>;
export const useGetFilmById = (id: number, options?: UseMoviesOptionsById) => {
  const url = `/api/v2.2/films/${id}`;
  return useQuery(
    [url, id],
    async function () {
      return apiClient.get(url);
    },
    options
  );
};
export type MovieOptionsByGenres = {
  data: {
    total: number;
    totalPages: number;
    items: MovieTypeItem[];
  };
};
type UseMoviesOptionsByGenres = UseGenericQueryOptions<
  MovieOptionsByGenres,
  AxiosResponse
>;
type MoviesQueryParam = {
  genres?: number | string;
  page?: number;
  order?: "YEAR" | "NUM_VOTE" | "RATING";
  type?: "ALL" | "MINI_SERIES" | "TV_SERIES" | "TV_SHOW" | "FILM";
  ratingFrom?: number | string;
  countries?: number | string;
  ratingTo?: number | string;
  yearFrom?: number | string;
  yearTo?: number | string;
};
export const useGetFilmByGenres = (
  queryParam: MoviesQueryParam,
  options?: UseMoviesOptionsByGenres
) => {
  const url = `/api/v2.2/films`;
  return useQuery(
    [url, queryParam],
    async function () {
      return apiClient.get(url, { params: queryParam });
    },
    options
  );
};
export type StaffArray = {
  staffId: number;
  nameRu: string;
  nameEn: string;
  description: string;
  posterUrl: string;
  professionText: string;
  professionKey: string;
};
export type StaffOptionsById = {
  data: StaffArray[];
};
type UseStaffOptionsById = UseGenericQueryOptions<
  StaffOptionsById,
  AxiosResponse
>;
export type TrailerItems = {
  url: string;
  name: string;
  site: string;
};
type GetTrailerOptions = {
  data: {
    items: TrailerItems[];
  };
};
type UseGetTrailer = UseGenericQueryOptions<GetTrailerOptions, AxiosResponse>;
export const useGetTrailer = (id: number, options?: UseGetTrailer) => {
  const url = `/api/v2.2/films/${id}/videos`;
  return useQuery(
    [url, id],
    async function () {
      return apiClient.get(url);
    },
    options
  );
};
export const useGetStaffById = (
  filmId: number,
  options?: UseStaffOptionsById
) => {
  const url = `/api/v1/staff?filmId=${filmId}`;
  return useQuery(
    [url, filmId],
    async function () {
      return apiClient.get(url);
    },
    options
  );
};
export type PlayerOptionsArray = {
  title: string;
  kp_id: string;
  year: string;
  iframe_src: string;
};

type PlayerOptions = {
  data: {
    result: boolean;
    data: PlayerOptionsArray[];
  };
};
type UseMoviesPlayerOptions = UseGenericQueryOptions<
  PlayerOptions,
  AxiosResponse
>;

export const useGetMoviePlayer = (
  kinopoisk_id: string,
  options?: UseMoviesPlayerOptions
) => {
  const url = `https://videocdn.tv/api/short?api_token=Olc1X1htWbIZ3jBtaPnnqvHVFv7TJHOz&kinopoisk_id=${kinopoisk_id}`;
  return useQuery(
    [url, kinopoisk_id],
    async function () {
      return axios
        .create({
          headers: {
            "Content-Type": "application/json",
          },
        })
        .get(url);
    },
    options
  );
};
