import { Pagination, Select, Typography } from "antd";
import { motion } from "framer-motion";
import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import { useNavigate } from "react-router";
import {
  MovieOptions,
  MovieOptionsByGenres,
} from "../../../core/api/apiMovies";
import {
  country,
  genre,
  order,
  rating,
  type,
  year,
} from "../../../core/utils/sortedArraySelect";

export const OtherMovie: FC<{
  orderSelect: "YEAR" | "NUM_VOTE" | "RATING";
  totalPage?: number;
  ratingSelect: number | null;
  setGenres: (value: number | null) => void;
  genres: number | null;
  typeSelect: "ALL" | "MINI_SERIES" | "TV_SERIES" | "TV_SHOW" | "FILM";
  yearSelect: number | null;
  countriesSelect: number | null;
  setCountries: (value: number | null) => void;
  releasesData: MovieOptions | undefined | MovieOptionsByGenres;
  releaseArray: any[];
  total?: number;
  page: number;
  setPage: (value: number) => void;
  setRating: (value: number) => void;
  setYear: (value: number) => void;
  setType: (
    value: "ALL" | "MINI_SERIES" | "TV_SERIES" | "TV_SHOW" | "FILM"
  ) => void;
  setOrder: (value: "YEAR" | "NUM_VOTE" | "RATING") => void;
}> = ({
  releaseArray,
  countriesSelect,
  setCountries,
  typeSelect,
  ratingSelect,
  total,
  yearSelect,
  totalPage,
  orderSelect,
  setGenres,
  genres,
  page,
  setPage,
  releasesData,
  setRating,
  setYear,
  setType,
  setOrder,
}) => {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "50px" }}>
      <Typography className="main_description-title">Другие фильмы</Typography>
      <div className='genre-block' style={{ marginTop: 15, marginBottom: 30 }}>
        <Select
          style={{ minWidth: 150, marginRight: 20 }}
          allowClear
          className="genre-block_item"
          onChange={(e) => setOrder(e)}
          size="large"
          value={orderSelect}
          placeholder="По умолчанию"
          options={order}
        />
        <Select
          placeholder="Фильмы"
          className="genre-block_item"
          size="large"
          style={{ minWidth: 150, marginRight: 20 }}
          allowClear
          value={typeSelect}
          onChange={(e) => setType(e)}
          options={type}
        />
        <Select
          size="large"
          className="genre-block_item"
          placeholder="Год"
          value={yearSelect}
          onChange={(e) => setYear(e)}
          style={{ minWidth: 150, marginRight: 20 }}
          allowClear
          options={year}
        />
        <Select
          size="large"
          className="genre-block_item"
          placeholder="Рейтинг"
          value={ratingSelect}
          style={{ minWidth: 150, marginRight: 20 }}
          allowClear
          onChange={(e) => setRating(e)}
          options={rating}
        />
        <Select
          size="large"
          className="genre-block_item"
          placeholder="Жанр"
          style={{ minWidth: 150, marginRight: 20 }}
          allowClear
          value={genres}
          onChange={(e) => setGenres(e)}
          options={genre.sort((a, b) => {
            if (a.label.toLowerCase() < b.label.toLowerCase()) {
              return -1;
            }
            if (a.label.toLowerCase() > b.label.toLowerCase()) {
              return 1;
            }
            return 0;
          })}
        />
        <Select
          size="large"
          className="genre-block_item"
          placeholder="Страна"
          style={{ minWidth: 150, marginRight: 20 }}
          allowClear
          value={countriesSelect}
          onChange={(e) => setCountries(e)}
          options={country.sort((a, b) => {
            if (a.label.toLowerCase() < b.label.toLowerCase()) {
              return -1;
            }
            if (a.label.toLowerCase() > b.label.toLowerCase()) {
              return 1;
            }
            return 0;
          })}
        />
      </div>
      <div
          className='othersFilms'
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {releaseArray.map((v) => (
          <motion.div
              style={{ position: 'relative'}}
            initial={{ opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              loading="lazy"
              onClick={() => {
                navigate(`/movie/${v.kinopoiskId}`);
              }}
              className="main_otherFilms-poster"
              src={v.posterUrl}
            />
              {
                  v.ratingKinopoisk !== null && (
                      <div className='main_otherFilms-raiting'>{v.ratingKinopoisk}</div>
                  )
              }
          </motion.div>
        ))}
      </div>
      {releasesData !== undefined && total && (
        <Pagination
          prevIcon={<BackwardOutlined style={{ color: "white" }} />}
          nextIcon={<ForwardOutlined style={{ color: "white" }} />}
          onChange={(page) => setPage(page)}
          defaultCurrent={page}
          pageSize={totalPage && totalPage ? totalPage / totalPage : 1}
          total={totalPage}
        />
      )}
    </div>
  );
};
