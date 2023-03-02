import { useMutation, UseMutationOptions, useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { UseGenericQueryOptions } from "./apiMovies";
type PostResp = {
  resp: null;
};
type FavoritePostType = UseMutationOptions<PostResp, AxiosResponse, PostResp>;
export function usePostFavorite(filmId: string, options?: FavoritePostType) {
  const url = `/movies/stars`;
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
        .post(url, { stars: filmId });
    },
    options
  );
}
type GetFavoriteOptions = {
  data: {
    stars: [];
  };
};
type FavoriteGetType = UseGenericQueryOptions<
  GetFavoriteOptions,
  AxiosResponse
>;

export function useGetFavorite(options?: FavoriteGetType) {
  const url = `/movies`;
  return useQuery(
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
        .get(url);
    },
    options
  );
}
export function useDeleteFavorite(filmId: number, options?: FavoritePostType) {
  const url = `/movies/stars/${filmId}`;
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
        .delete(url);
    },
    options
  );
}
