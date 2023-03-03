import { Button, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { FC, useState } from "react";
import {
  reviewMovieArrayType,
  usePostReview,
} from "../../../core/api/reviewsMovie";
import toast from "react-hot-toast";
import Picker from "emoji-picker-react";
const ReviewModal: FC<{
  open: boolean;
  setReviewMovieArray: (value: reviewMovieArrayType[]) => void;
  setOpen: (value: boolean) => void;
  filmId: string;
}> = ({ open, setReviewMovieArray, setOpen, filmId }) => {
  const [userName, setUserName] = useState(
    localStorage.getItem("username") || ""
  );
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { mutate } = usePostReview();
  const closeModal = () => {
    setUserName(localStorage.getItem("username") || "");
    setReview("");
    setOpen(false);
  };
  const onEmojiClick = (event: any, emojiObject: { emoji: any }) => {
    const textAreaElement: any = document.getElementById("text-area");
    setReview(
      review.substr(0, textAreaElement?.selectionStart) +
        emojiObject.emoji +
        review.substr(textAreaElement?.selectionEnd)
    );
  };
  const addReview = () => {
    if (review === "") {
      setReviewError(true);
      toast.error("Заполните все поля");
    } else {
      mutate(
        {
          name: userName === "" ? localStorage.getItem("username") : userName,
          filmId: filmId,
          review: review,
        },
        {
          onSuccess(data: any) {
            setReviewMovieArray(data.data.foundReview);
            closeModal();
            toast.success("ok");
          },
        }
      );
    }
  };
  return (
    <Modal
      open={open}
      className="review-modal"
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key="back" onClick={closeModal}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={addReview}>
          Добавить отзыв
        </Button>,
      ]}
    >
      <div style={{ marginTop: "30px" }}>
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Введите ваше имя"
        />
        <div style={{ position: "relative" }}>
          <TextArea
            id="text-area"
            style={{ height: 120, marginTop: "20px", resize: "none" }}
            value={review}
            status={reviewError ? "error" : ""}
            onFocus={() => setReviewError(false)}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Введите ваш отзыв"
          />
          <div
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            style={{
              fontSize: 25,
              cursor: "pointer",
              position: "absolute",
              top: 21,
              right: 9,
            }}
          >
            😀
          </div>
          {showEmojiPicker && (
            <div
              style={{
                position: "absolute",
                zIndex: 1,
                top: 63,
                right: 10,
              }}
            >
              <Picker
                searchDisabled={true}
                onEmojiClick={(emojiObject, e) => onEmojiClick(e, emojiObject)}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
