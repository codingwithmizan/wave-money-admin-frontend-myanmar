import { FC } from "react";
import { Card, Button, Image } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import { toUpper, capitalize } from "lodash";

interface NrcCardDetailsProps {
  nrcImg: any;
  size?: number;
  idType: string;
}

export const NrcCardDetails: FC<NrcCardDetailsProps> = ({
  nrcImg,
  size = 300,
  idType,
}) => {
  const { image } = nrcImg;
  
  const onDownloadImg = () => {
    saveAs(image?.url, "nrc image");
  };


  return (
    <Card
      title={`${
        idType === "nrc" ? `${toUpper(idType)} Card` : capitalize(idType)
      }`}
      className="page-body w-full h-fit"
    >
      <div className=" ">
        <h4 className="wave-money-text font-medium">Front Side</h4>
      </div>
      <div className="my-4">
        <Image
          src={image?.url}
          alt={"otc image"}
          style={{ maxHeight: "200px" }}
          className=" w-40 xl:w-60 2xl:w-72"
        />
      </div>
      <div className="my-4">
        <Button
          className="btn-submit-outline wave-money-text"
          htmlType="button"
          size='large'
          onClick={onDownloadImg}
          icon={<DownloadOutlined className="relative -top-1" />}
        >
          Download
        </Button>
     
      </div>
    </Card>
  );
};
