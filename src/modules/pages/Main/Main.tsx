import React, { useEffect, useState } from "react";
import {
  MovieTypeItem,
  StaffArray,
  useGetFilmByGenres,
  useGetFilmById,
  useGetStaffById,
} from "../../../core/api/apiMovies";
import Lottie from "lottie-react";
import LoadingMainPage from "../../../core/animations/loadingMainPage.json";
import { motion } from "framer-motion";
import "./style.css";
import Header from "../../components/layout/Header";
import MovieInformationItem from "../../components/Movie/MovieInformationItem";
import { OtherMovie } from "../../components/Movie/OtherMovie";
const Main = () => {
  const [genresItemArray, setGenresItemArray] = useState<MovieTypeItem[]>([]);
  const [releaseItem, setReleaseItem] = useState<MovieTypeItem>(
    {} as MovieTypeItem
  );
  const [year, setYear] = useState(2022);
  const [genres, setGenres] = useState<null | number>(null);
  const [page, setPage] = useState(1);
  const [rating, setRating] = useState<number | null>(null);
  const [countries, setCountries] = useState<number | null>(null);
  const [order, setOrder] = useState<"YEAR" | "NUM_VOTE" | "RATING">(
    "NUM_VOTE"
  );
  const [staffArray, setStaffArray] = useState<StaffArray[]>([]);
  const [type, setType] = useState<
    "ALL" | "MINI_SERIES" | "TV_SERIES" | "TV_SHOW" | "FILM"
  >("ALL");
  const {
    data: genresItemData,
    isSuccess: isGenresDataSuccess,
    isLoading: isGenresItemDataLoading,
  } = useGetFilmByGenres({
    genres: genres || "",
    page,
    yearFrom: year - 1 || "",
    yearTo: year || "",
    ratingFrom: rating !== null ? rating - 1 : "",
    ratingTo: rating || "",
    order,
    type,
    countries: countries || "",
  });
  const { data: staffData, isSuccess: isStaffDataSuccess } = useGetStaffById(
    genresItemData?.data?.items[0]?.kinopoiskId || 0
  );
  const { data: releaseItemData, isSuccess: isReleaseItemDataSuccess } =
    useGetFilmById(genresItemArray[0]?.kinopoiskId);
  useEffect(() => {
    if (isStaffDataSuccess) {
      const staffArr = staffData.data.filter(
        (v) => v.professionKey === "DIRECTOR"
      );
      staffArr.length = 1;
      setStaffArray(staffArr);
    }
    if (isGenresDataSuccess) {
      setGenresItemArray(genresItemData.data.items);
    }
    if (isReleaseItemDataSuccess) {
      setReleaseItem(releaseItemData.data);
    }
  }, [
    isGenresDataSuccess,
    isReleaseItemDataSuccess,
    releaseItemData,
    genresItemData,
    staffData,
    isStaffDataSuccess,
  ]);
  if (isGenresItemDataLoading || genresItemArray.length === 0) {
    return (
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        style={{
          position: "absolute",
          top: "48%",
          cursor: "pointer",
          left: "47%",
          transition: "all .5s",
        }}
        animate={{ x: 0 }}
      >
        <Lottie size={200} animationData={LoadingMainPage} />
      </motion.div>
    );
  } else
    return (
      <div style={{ padding: "30px 180px" }}>
        <Header />
        <MovieInformationItem
          releaseItem={releaseItem}
          // isItemMovie
          staffArray={staffArray}
        />
        <OtherMovie
          yearSelect={year}
          setGenres={setGenres}
          genres={genres}
          setCountries={setCountries}
          countriesSelect={countries}
          typeSelect={type}
          orderSelect={order}
          ratingSelect={rating}
          setYear={setYear}
          setType={setType}
          setOrder={setOrder}
          setRating={setRating}
          releasesData={genresItemData}
          releaseArray={genresItemArray}
          page={page}
          setPage={setPage}
        />
      </div>
    );
};

export default Main;
