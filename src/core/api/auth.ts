import { useMutation, UseMutationOptions } from "react-query";
import axios, { AxiosResponse } from "axios";

type ParamReg = {
  email: string;
  username?: string;
  password: string;
};
type RegistrationType = UseMutationOptions<ParamReg, AxiosResponse, ParamReg>;
export function useRegistration(options?: RegistrationType) {
  const url = `/auth/reg`;
  return useMutation(
    [url],
    async (params) => {
      return axios
        .create({
          baseURL: "https://nodeplayback-sq9w.vercel.app/",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .post(url, { ...params });
    },
    options
  );
}
type ResponseLogin = {
  token: "string";
};
type LoginType = UseMutationOptions<ResponseLogin, AxiosResponse, ParamReg>;
export function useLogin(options?: LoginType) {
  const url = `/auth/login`;
  return useMutation(
    [url],
    async (params) => {
      return axios
        .create({
          baseURL: "https://nodeplayback-sq9w.vercel.app/",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .post(url, { ...params });
    },
    options
  );
}
