import React, { FC, useState } from "react";
import { Popover, Typography } from "antd";
import { useGetSearchMovie } from "../../../core/api/apiMovies";
import { useNavigate } from "react-router";
import { StarFilled } from "@ant-design/icons";
import Back from "./img/back.svg";
import { motion } from "framer-motion";
import { setDeleteToken } from "../../../core/utils/setDeleteToken";
import { IoClose } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { TbReportSearch } from "react-icons/tb";
const Header: FC<{
  signUp?: boolean;
  signIn?: boolean;
  isItemMovie?: boolean;
}> = ({ signIn, isItemMovie, signUp }) => {
  const [findMovie, setFindMovie] = useState("");
  const Screen600 = useMediaQuery({ query: "(max-width: 640px)" });
  const Screen420 = useMediaQuery({ query: "(max-width: 420px)" });

  const { data: SearchMovieData, isSuccess: isSearchMovieSuccess } =
    useGetSearchMovie(findMovie);
  const navigate = useNavigate();
  const content = () => {
    return (
      <>
        {SearchMovieData?.data.films.map((v) => (
          <div
            style={{
              textAlign: "center",
              width: "150px",
              marginRight: "20px",
              marginBottom: "30px",
            }}
          >
            <img
              onClick={() => navigate(`/movie/${v.filmId}`)}
              style={{
                width: "150px",
                cursor: "pointer",
                borderRadius: "20px",
              }}
              src={v.posterUrl}
            />
            <Typography className="main_description-item ">
              {v.nameRu}
            </Typography>
          </div>
        ))}
      </>
    );
  };
  return (
    <div>
      <div className="header_main">
        <div style={{ display: "flex", alignItems: "center" }}>
          {isItemMovie && (
            <img
              onClick={() => navigate("/movie")}
              style={{ width: Screen420 ? 30 : "50px", cursor: "pointer" }}
              src={Back}
            />
          )}
          <Typography
            style={{
              paddingTop: Screen600 ? 8 : isItemMovie ? 13 : "unset",
              lineHeight: isItemMovie ? 0 : "unset",
              marginLeft: isItemMovie ? 6 : "unset",
            }}
            onClick={() => navigate("/movie")}
            className="header_main-title"
          >
            Playback
          </Typography>
        </div>

        {signUp && !signIn ? (
          <button onClick={() => navigate("/")} className="button">
            ??????????
          </button>
        ) : (
          !signIn && (
            <div style={{ display: "flex", alignItems: "center" }}>
              {localStorage.getItem("token") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ scale: 1.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <StarFilled
                    onClick={() => (window.location.href = "/favorite")}
                    style={{
                      color: "white",
                      cursor: "pointer",
                      marginRight: "20px",
                    }}
                  />
                </motion.div>
              )}
              {!Screen600 ? (
                <Popover
                  placement="bottomRight"
                  content={content}
                  open={
                    findMovie !== "" &&
                    isSearchMovieSuccess &&
                    SearchMovieData?.data.films.length > 0
                  }
                  trigger="click"
                >
                  <input
                    style={{ width: "400px" }}
                    value={findMovie}
                    onChange={(e) => setFindMovie(e.target.value)}
                    className="input"
                    placeholder="?????????? ????????????"
                  />
                  {findMovie !== "" && (
                    <IoClose
                      onClick={() => setFindMovie("")}
                      style={{
                        marginLeft: "-22px",
                        marginTop: 9,
                        cursor: "pointer",
                        position: "absolute",
                      }}
                    />
                  )}
                </Popover>
              ) : (
                <TbReportSearch style={{ fontSize: 22, color: "white" }} />
              )}
              <button
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    setDeleteToken();
                  } else {
                    navigate("/signUp");
                  }
                }}
                className="button"
              >
                {localStorage.getItem("token") ? "??????????" : "????????????????????????????????????"}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Header;
