import { Modal } from "antd";
import { FC } from "react";
import ReactPlayer from "react-player";

const TrailersModal: FC<{
  open: boolean;
  setOpen: (value: boolean) => void;
  trailerItemUrl: string;
}> = ({ open, setOpen, trailerItemUrl }) => {
  return (
    <Modal
      open={open}
      title="Трейлер"
      width={"70%"}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={[]}
    >
      <ReactPlayer height="620px" width={"100%"} url={trailerItemUrl} />
    </Modal>
  );
};
export default TrailersModal;
