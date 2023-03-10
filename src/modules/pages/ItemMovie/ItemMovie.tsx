import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  MovieTypeItem,
  StaffArray,
  useGetFilmById,
  useGetStaffById,
} from "../../../core/api/apiMovies";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import LoadingMainPage from "../../../core/animations/loadingMainPage.json";
import Header from "../../components/layout/Header";
import MovieInformationItem from "../../components/Movie/MovieInformationItem";
import { useMediaQuery } from "react-responsive";

const ItemMovie = () => {
  const params = useParams();
  const [releaseItem, setReleaseItem] = useState<MovieTypeItem>(
    {} as MovieTypeItem
  );
  const Screen800 = useMediaQuery({ query: "(max-width: 1214px)" });
  const Screen700 = useMediaQuery({ query: "(max-width: 700px)" });

  const [staffArray, setStaffArray] = useState<StaffArray[]>([]);
  const [delay, setDelay] = useState(true);
  const {
    data: releaseItemData,
    isSuccess: isReleaseItemDataSuccess,
    isLoading: isReleaseItemDataLoading,
  } = useGetFilmById(Number(params.itemId));
  const { data: staffData, isSuccess: isStaffDataSuccess } = useGetStaffById(
    Number(params.itemId) === 0 ? 1 : Number(params.itemId)
  );

  useEffect(() => {
    if (isReleaseItemDataSuccess) {
      setReleaseItem(releaseItemData.data);
    }
    if (isStaffDataSuccess) {
      const staffArr = staffData.data.filter(
        (v) => v.professionKey === "DIRECTOR"
      );
      staffArr.length = 1;
      setStaffArray(staffArr);
    }
  }, [
    isReleaseItemDataSuccess,
    releaseItemData,
    isStaffDataSuccess,
    staffData,
  ]);
  setTimeout(() => setDelay(false), 1);
  if (isReleaseItemDataLoading) {
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
  } else
    return (
      <div style={{ padding: Screen800 ? "30px 20px" : "30px 180px" }}>
        <Header isItemMovie />
        <MovieInformationItem
          releaseItem={releaseItem}
          isItemMovie
          staffArray={staffArray}
        />
      </div>
    );
};

export default ItemMovie;
