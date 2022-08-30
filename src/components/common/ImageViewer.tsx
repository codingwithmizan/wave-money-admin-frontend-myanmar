import { FC, useState } from "react";
import { Modal } from "antd";
import { AiOutlineEye } from "react-icons/ai";

interface ImageViewerProps {
  image: string;
  title: string;
  width: number;
  height: number;
}

export const ImageViewer: FC<ImageViewerProps> = ({
  image,
  title,
  width,
  height,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = () => {
    setPreviewVisible(true);
  };

  return (
    <>
      <Modal
        visible={previewVisible}
        title={title}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt={title} style={{ width: "100%" }} src={image} />
      </Modal>
      <div className="relative" onClick={handlePreview}>
        <div style={{ height: `${height}px` }}>
          <img
            src={image}
            alt={title}
            width={`${width}px`}
            height={`${height}px`}
          />
        </div>
        <div
          className="hover:opacity-100 bg-black bg-opacity-50 opacity-0 absolute top-0"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className="flex flex-col justify-center items-center w-full h-full cursor-pointer">
            <AiOutlineEye className="text-white text-xl" />
            <span className="text-white text-lg">Preview</span>
          </div>
        </div>
      </div>
    </>
  );
};
