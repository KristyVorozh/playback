import Header from "../../components/layout/Header";
import React, { useEffect, useState } from "react";
import { useGetFavorite } from "../../../core/api/favorite";
import { Typography } from "antd";
import apiClient from "../../../http-common";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import LoadingMainPage from "../../../core/animations/loadingMainPage.json";
import { motion } from "framer-motion";
import { setDeleteToken } from "../../../core/utils/setDeleteToken";
import { useMediaQuery } from "react-responsive";

export const Favorite = () => {
  const {
    data: getFavorite,
    isSuccess: isGetFavoriteSuccess,
    error,
    isLoading: isGetFavoriteLoading,
  } = useGetFavorite();
  const [favoriteArray, setFavoriteArray] = useState<any>();
  const navigate = useNavigate();
  const Screen700 = useMediaQuery({ query: "(max-width: 700px)" });

  useEffect(() => {
    (async () => {
      if (isGetFavoriteSuccess && getFavorite) {
        const m = [];
        for (let i = 0; i < getFavorite.data.stars.length; i++) {
          const a = await apiClient.get(
            `/api/v2.2/films/${getFavorite.data.stars[i]}`
          );
          m.push(a.data);
        }
        setFavoriteArray(m);
      }
    })();
  }, [getFavorite, isGetFavoriteSuccess]);
  useEffect(() => {
    if (localStorage.getItem("token") && error) {
      setDeleteToken();
    }
  }, []);
  if (isGetFavoriteLoading || favoriteArray === undefined)
    return (
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        style={{
          position: "absolute",
          top: Screen700 ? "42%" : "48%",
          cursor: "pointer",
          left: Screen700 ? "41%" : "47%",
          transition: "all .5s",
        }}
        animate={{ x: 0 }}
      >
        <Lottie size={200} animationData={LoadingMainPage} />
      </motion.div>
    );
  return (
    <div style={{ padding: "30px 180px" }}>
      <Header isItemMovie />
      <Typography
        style={{ marginBottom: "20px" }}
        className="main_description-title"
      >
        Избранное
      </Typography>
      {favoriteArray.length === 0 ? (
        <Typography
          style={{ fontSize: "18px", marginTop: "10px" }}
          className="main_description-item"
        >
          Избранных фильмов нет :( Вы можете добавить их нажав на звездочку
          рядом с фильмом!
        </Typography>
      ) : (
        <div
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
        >
          {favoriteArray.map((v: any) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ scale: 1.06 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                onClick={() => navigate(`/movie/${v.kinopoiskId}`)}
                className="main_otherFilms-poster"
                src={v.posterUrl}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
