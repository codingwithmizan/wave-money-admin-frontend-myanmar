import { FC } from "react";
import { Button, Image } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";

interface NrcImageProps {
  nrcImg: any;
  title: string;
  size?: number
}

export const NrcImage: FC<NrcImageProps> = ({ nrcImg, title, size = 200  }) => {
  const { image } = nrcImg;
  const onDownloadImg = () => {
    saveAs(image?.url, "nrc image");
  };

  return (
    <div className=" w-full">
      <div className="flex-column  justify-between items-baseline relative -top-4">
        <h4 className="wave-money-text mb-3 font-medium">{title}</h4>
        <Image
          src={image?.url}
          alt={"otc image"}
          className=" w-40 xl:w-60 2xl:w-72"
          style={{ maxHeight: "200px" }}
        />
        <div className="mt-4">
          <Button
            className="btn-submit-outline wave-money-text"
            htmlType="button"
            size="large"
            onClick={onDownloadImg}
            icon={<DownloadOutlined className="relative -top-1" />}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};
