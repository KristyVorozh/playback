import React, { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pagination, Typography } from "antd";
import { useNavigate, useParams } from "react-router";
import {
  MovieTypeItem,
  StaffArray,
  TrailerItems,
  useGetMoviePlayer,
  useGetTrailer,
} from "../../../core/api/apiMovies";
import {
  BackwardOutlined,
  ForwardOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import {
  useDeleteFavorite,
  useGetFavorite,
  usePostFavorite,
} from "../../../core/api/favorite";
import toast from "react-hot-toast";
import Account from "./img/account.svg";
import ReviewModal from "../ReviewModal/ReviewModal";
import {
  reviewMovieArrayType,
  useGetReviews,
} from "../../../core/api/reviewsMovie";
import { setDeleteToken } from "../../../core/utils/setDeleteToken";
import { BsCollectionPlay } from "react-icons/bs";
import TrailersModal from "./TrailersModal";
import { useMediaQuery } from "react-responsive";

interface IProps {
  releaseItem: MovieTypeItem;
  staffArray: StaffArray[];
  isItemMovie?: boolean;
}
const MovieInformationItem: FC<IProps> = ({
  releaseItem,
  staffArray,
  isItemMovie,
}) => {
  const navigate = useNavigate();
  const [frame, setFrame] = useState<any>();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [star, setStar] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const isBigScreen = useMediaQuery({ query: "(max-width: 1824px)" });
  const Screen600 = useMediaQuery({ query: "(max-width: 600px)" });

  const [reviewMovieArray, setReviewMovieArray] = useState<
    reviewMovieArrayType[]
  >([]);
  const {
    data: frameData,
    isSuccess: isFrameDataSuccess,
    isLoading: isFrameDataLoading,
  } = useGetMoviePlayer(String(releaseItem.kinopoiskId));
  const params = useParams();
  const [trailerItem, setTrailerItem] = useState<TrailerItems>(
    {} as TrailerItems
  );
  const {
    data: trailersData,
    isSuccess: isTrailersDataSuccess,
    isLoading: isTrailersLoading,
  } = useGetTrailer(Number(params.itemId));
  useEffect(() => {
    if (isTrailersDataSuccess && trailersData) {
      setTrailerItem(
        trailersData.data.items.filter((v) => v.site === "YOUTUBE")[0]
      );
    }
  }, [isTrailersDataSuccess, trailersData]);
  const { mutate: postFavorite } = usePostFavorite(
    String(releaseItem.kinopoiskId)
  );
  const {
    data: reviewMovieData,
    isSuccess: isReviewMovieDataSuccess,
    isLoading: isReviewLoading,
  } = useGetReviews({
    page: page,
    filmId: String(releaseItem.kinopoiskId) || "",
  });
  const { mutate: deleteFavorite } = useDeleteFavorite(releaseItem.kinopoiskId);
  const {
    data: getFavorite,
    isSuccess: isGetFavoriteSuccess,
    error,
  } = useGetFavorite();
  useEffect(() => {
    if (localStorage.getItem("token") && error) {
      setDeleteToken();
    }
  }, []);
  const postFavoriteFunction = () => {
    if (!localStorage.getItem("token")) {
      toast.error(
        "?????????? ???????????????? ?????????????????? ?????????? ?? ??????????????????, ???? ???????????? ????????????????????????????????????"
      );
    } else {
      if (!star) {
        postFavorite(
          {
            resp: null,
          },
          {
            onSuccess() {
              toast.success("?????????? ?????????????? ???????????????? ?? ??????????????????!");
              setStar(true);
            },
          }
        );
      } else {
        deleteFavorite(
          { resp: null },
          {
            onSuccess() {
              toast.success("?????????? ?????????????? ???????????? ???? ????????????????????!");
              setStar(false);
            },
          }
        );
      }
    }
  };
  useEffect(() => {
    if (isFrameDataSuccess) {
      setFrame(frameData.data.data[0]);
    }
    if (isGetFavoriteSuccess) {
      if (
        getFavorite.data.stars.find(
          (v) => v === String(releaseItem.kinopoiskId)
        )
      ) {
        setStar(true);
      }
    }
    if (isReviewMovieDataSuccess && reviewMovieData !== undefined) {
      setPage(Number(reviewMovieData?.data.page));
      setReviewMovieArray(reviewMovieData?.data?.foundReview);
      setLimit(reviewMovieData.data.limit);
    }
  }, [
    isFrameDataSuccess,
    reviewMovieData,
    isReviewMovieDataSuccess,
    frameData,
    isGetFavoriteSuccess,
    getFavorite,
  ]);
  return (
    <div style={{ position: "relative" }}>
      {isItemMovie &&
        trailerItem !== undefined &&
        trailerItem.url !== undefined && (
          <TrailersModal
            trailerItemUrl={trailerItem.url}
            setOpen={setIsModalOpen}
            open={isModalOpen}
          />
        )}
      <div
        style={{ display: "flex", flexWrap: isBigScreen ? "wrap" : "inherit" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          style={{ position: "relative" }}
          whileHover={{ scale: 1.03 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {!isBigScreen ? (
            <img
              loading="lazy"
              className="main-poster"
              style={{
                opacity:
                  isItemMovie && trailerItem !== undefined ? 0.4 : "inherit",
              }}
              onClick={() =>
                !isItemMovie && navigate(`/movie/${releaseItem.kinopoiskId}`)
              }
              src={releaseItem.posterUrl}
            />
          ) : (
            <div
              onClick={() =>
                !isItemMovie && navigate(`/movie/${releaseItem.kinopoiskId}`)
              }
              className="main-poster-adaptive"
              style={{ backgroundImage: `url("${releaseItem.posterUrl}")` }}
            ></div>
          )}
          {isItemMovie &&
            trailerItem !== undefined &&
            trailerItem.url !== undefined && (
              <BsCollectionPlay
                onClick={() => setIsModalOpen(true)}
                style={{
                  fontSize: 60,
                  color: "white",
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  cursor: "pointer",
                  right: 0,
                  top: "38%",
                  background: "#70788c91",
                  padding: 20,
                  borderRadius: 20,
                }}
              />
            )}
        </motion.div>
        <div style={{ marginLeft: !isBigScreen ? "50px" : "" }}>
          <div
            style={{
              position: isBigScreen ? "absolute" : "relative",
              top: isBigScreen ? 30 : "inherit",
            }}
          >
            <div>
              {staffArray.map((v) => (
                <div style={{ color: "white" }}>{v.nameRu}</div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography className="main-title-name">
                {releaseItem.nameRu === null
                  ? releaseItem.nameOriginal
                  : releaseItem.nameRu}
              </Typography>
              {releaseItem?.ratingAgeLimits !== null && (
                <div className="main-age-container">
                  {releaseItem?.ratingAgeLimits?.split("age")[1] + "+"}
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                width: !isBigScreen ? "700px" : "inherit",
                flexWrap: "wrap",
              }}
            >
              {releaseItem?.genres?.map((v) => (
                <div className="genre_item" style={{ marginBottom: 10 }}>
                  {v.genre}
                </div>
              ))}
            </div>
            <div
              style={{ display: "flex", marginTop: 30, alignItems: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div>
                  <div style={{ display: "flex" }}>
                    {releaseItem.ratingKinopoisk !== null ? (
                      <div className="main_container-item">
                        <Typography className="main_container-item-title">
                          ??????????????
                        </Typography>
                        <div className="main_container-item-block">
                          {releaseItem.ratingKinopoisk}
                        </div>
                      </div>
                    ) : releaseItem.ratingImdb !== null ? (
                      <div className="main_container-item">
                        <Typography className="main_container-item-title">
                          ??????????????
                        </Typography>
                        <div className="main_container-item-block">
                          {releaseItem.ratingImdb}
                        </div>
                      </div>
                    ) : (
                      releaseItem.ratingKinopoiskVoteCount !== null &&
                      releaseItem.ratingKinopoiskVoteCount !== 0 && (
                        <div className="main_container-item">
                          <Typography className="main_container-item-title">
                            ??????????????
                          </Typography>
                          <div className="main_container-item-block">
                            {releaseItem.ratingKinopoiskVoteCount}
                          </div>
                        </div>
                      )
                    )}
                    {releaseItem.filmLength !== null && (
                      <div
                        style={{ marginRight: 0 }}
                        className="main_container-item"
                      >
                        <Typography className="main_container-item-title">
                          ??????????
                        </Typography>
                        <div className="main_container-item-block">
                          {releaseItem.filmLength} m.
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    style={{ marginRight: 0, marginTop: 10, width: "270px" }}
                    className="main_container-item"
                  >
                    <Typography className="main_container-item-title">
                      ??????
                    </Typography>
                    <div className="main_container-item-block">
                      {releaseItem.year}
                    </div>
                  </div>
                </div>
                {star ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ scale: 1.2 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <StarFilled
                      onClick={postFavoriteFunction}
                      style={{
                        marginTop: 20,
                        color: "white",
                        fontSize: "34px",
                        cursor: "pointer",
                        marginLeft: "20px",
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ scale: 1.2 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <StarOutlined
                      onClick={postFavoriteFunction}
                      style={{
                        color: "white",
                        marginTop: 20,
                        fontSize: "34px",
                        cursor: "pointer",
                        marginLeft: "20px",
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          {releaseItem.description !== null && (
            <div style={{ marginTop: "50px" }}>
              <Typography className="main_description-title">
                ????????????????
              </Typography>
              <Typography className="main_description-item">
                {releaseItem.description}
              </Typography>
            </div>
          )}
        </div>
      </div>
      {isItemMovie && frame !== undefined && (
        <iframe
          src={`https:${frame?.iframe_src}`}
          style={{
            borderRadius: "20px",
            marginTop: "20px",
          }}
          allowFullScreen={true}
          width="100%"
          height={Screen600 ? "300px" : "600px"}
          frameBorder="0"
        ></iframe>
      )}
      {isItemMovie && (
        <div>
          <Typography
            style={{ margin: "20px 0" }}
            className="main_description-title"
          >
            ????????????
          </Typography>
          {reviewMovieArray &&
            reviewMovieArray.length > 0 &&
            reviewMovieArray.map((v) => (
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <img
                  loading="lazy"
                  style={{ width: "50px", marginRight: "20px" }}
                  src={Account}
                />
                <div>
                  <Typography
                    style={{
                      fontFamily: '"Comfortaa", cursive',
                      fontWeight: 600,
                      color: "white",
                      fontSize: "22px",
                    }}
                  >
                    {v.name}
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: '"Comfortaa", cursive',
                      color: "white",
                    }}
                  >
                    {v.review}
                  </Typography>
                </div>
              </div>
            ))}
          {limit > 1 && (
            <Pagination
              style={{ marginBottom: 20 }}
              prevIcon={<BackwardOutlined style={{ color: "white" }} />}
              nextIcon={<ForwardOutlined style={{ color: "white" }} />}
              onChange={(page, pageSize) => setPage(page)}
              defaultCurrent={page}
              total={limit}
            />
          )}
          {localStorage.getItem("token") && (
            <div>
              <button
                className="button"
                onClick={() => setOpen(true)}
                style={{
                  padding: "11px 12px",
                  borderRadius: 14,
                  fontSize: 12,
                }}
              >
                ???????????????? ??????????
              </button>
              <ReviewModal
                setReviewMovieArray={setReviewMovieArray}
                filmId={String(releaseItem.kinopoiskId)}
                open={open}
                setOpen={setOpen}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieInformationItem;
