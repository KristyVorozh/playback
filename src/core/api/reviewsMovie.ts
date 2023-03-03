import { useMutation, UseMutationOptions, useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { UseGenericQueryOptions } from "./apiMovies";

export type reviewMovieArrayType = {
  name: string;
  review: string;
};
type GetFavoriteOptions = {
  data: {
    totalPages: number;
    foundReview: reviewMovieArrayType[];
    limit: number;
    page: string;
  };
};
type FavoriteGetType = UseGenericQueryOptions<
  GetFavoriteOptions,
  AxiosResponse
>;
type GetReviewsType = {
  filmId: string;
  page: number;
};
export function useGetReviews(
  queryParam: GetReviewsType,
  options?: FavoriteGetType
) {
  const url = `/reviewsMovie/${queryParam.filmId}`;
  return useQuery(
    [url, queryParam],
    async (params) => {
      return axios
        .create({
          baseURL: "https://playback-evi1.onrender.com",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .get(url, { params: { ...queryParam } });
    },
    options
  );
}
type PostResp = {
  name: string | null;
  review: string;
  filmId: string;
};
type FavoritePostType = UseMutationOptions<PostResp, AxiosResponse, PostResp>;

export function usePostReview(options?: FavoritePostType) {
  const url = `/reviewsMovie`;
  return useMutation(
    [url],
    async (params) => {
      return axios
        .create({
          baseURL: "https://playback-evi1.onrender.com",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .post(url, {
          name: params.name,
          review: params.review,
          filmId: params.filmId,
        });
    },
    options
  );
}
