import { useState, useEffect, FC } from "react";
import { Card, Button, Image } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Checkbox, ImageUploader } from "@/components/controls";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import { postData } from "@/lib/services";
import { getBase64, splitedNrcNo } from "@/lib/helpers";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MAX_FILE_SIZE, IMAGE_UPLOAD_MIME_TYPES} from "@/lib/constants";
import { toUpper, capitalize } from "lodash";

interface NrcCardEditProps {
  otc: any;
  nrcImg: any;
  idType: string;
  setValue?: any;
  setOcrBypass: (value: any) => void;
  setOcrImg: (value: string) => void;
  setOcrResult: (ocrData: any) => void;
}

export const NrcCardEdit: FC<NrcCardEditProps> = ({
  otc,
  nrcImg,
  idType,
  setValue,
  setOcrBypass,
  setOcrImg,
  setOcrResult,
}) => {
  const [isOcrValidated, setIsOcrValidated] = useState(false);
  const [isImageReset, setIsImageReset] = useState(false);
  const {
    control,
    watch,
    setValue: setOcrValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      ocrValidation: false,
      ocr_img: null,
    },
    resolver: yupResolver(ocrSchema),
  });
  const { image } = nrcImg;
  const { region, township, id_type, digits } = splitedNrcNo(
    otc?.identity_documents?.[0]?.id_number
  );

  const onDownloadImg = () => {
    saveAs(image?.url, "nrc image");
  };
  const watchocrValidation = watch("ocrValidation");
  const watchOcrImg: any = watch("ocr_img");

  useEffect(() => {
    setIsOcrValidated(false);
  }, [watchocrValidation]);

  const onReset = () => {
    setOcrBypass(true);
    setOcrImg("");
    setValue("name", otc?.name);
    setValue("region_number", region);
    setValue("township_code", township);
    setValue("id_type", id_type);
    setValue("digits", digits);
    setValue("nrc_number", otc?.identity_documents?.[0]?.id_number);
    setIsOcrValidated(false);
    setIsImageReset(true);
    setOcrResult(undefined);
  };

  const onSubmit = async () => {
    const isValidFileSize = watchOcrImg.file.size <= MAX_FILE_SIZE;
    const isValidFileType = IMAGE_UPLOAD_MIME_TYPES.includes(watchOcrImg?.file?.type);
    if (isValidFileSize && isValidFileType) {
      if (isImageReset) return;
      const base64Img: any = await getBase64(watchOcrImg.file);
      const res = await postData("ocr/detect", {
        image: base64Img,
      });
      if (res?.success && res?.data?.side !== "back") {
        setIsImageReset(false);
        setIsOcrValidated(true);
        const nrc_id = res.data?.nrc_id?.en;
        setOcrBypass(false);
        setOcrImg(base64Img);
        setOcrResult(res?.data);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error("Image size or Image type is invalid");
    }
  };
  return (
    <Card
      title={`${idType === "nrc" ? `${toUpper(idType)} Card`: capitalize(idType)}`}
      className="page-body w-full h-fit"
    >
      <div className="flex-column  justify-between items-baseline ">
        <h4 className="text-base mb-3 font-medium">NRC Image</h4>
        <Image
          src={`${image?.url}`}
          alt={"otc image"}
          className=" w-40 xl:w-60 2xl:w-72"
          style={{ maxHeight: "200px" }}
        />
        <div className="mt-4">
          <Button
            className="btn-submit-outline"
            htmlType="button"
            size="large"
            onClick={onDownloadImg}
            icon={<DownloadOutlined className="relative -top-1" />}
          >
            Download
          </Button>
        </div>
      </div>

      <>
        <div className="mt-6">
          <Checkbox
            control={control}
            name="ocrValidation"
            label="OCR Validation"
          />
        </div>
        {watchocrValidation && (
          <form>
            <div className=" mt-4 ">
              <div>
                <ImageUploader
                  control={control}
                  name="ocr_img"
                  setValue={setOcrValue}
                  acceptFileFormat=""
                  errors={errors}
                  isfileRemoved={isImageReset}
                  afterFileUpload={() => {
                    setIsImageReset(false);
                  }}
                />
              </div>
              <div className="my-4 ml-6">
                <ul className="list-disc">
                  <li className="text-gray-500 ">
                    Image size not more than 1MB.
                  </li>
                  <li className="text-gray-500 ">
                    Image format must be "jpg, jpeg, png or webp".
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 ml-1 ">
              {isOcrValidated ? (
                <Button
                  className="btn-cancel w-24"
                  htmlType="button"
                  onClick={onReset}
                  size="large"
                >
                  Reset
                </Button>
              ) : (
                <Button
                  type="primary"
                  className="btn-submit w-24"
                  htmlType="button"
                  onClick={onSubmit}
                  size="large"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        )}
      </>
    </Card>
  );
};

const ocrSchema = yup
  .object()
  .shape(
    {
      ocr_img: yup.mixed().when("ocr_img", {
        is: (value: any) => value,
        then: (schema) =>
          schema
            .test(
              "fileSize",
              "Uploaded file is to big, image size not more than 1MB.",
              (value: any, context: any) => {
                return value?.file && value?.file?.size <= MAX_FILE_SIZE;
              }
            )
            .test(
              "type",
              "Invalid image format. Only (jpg, jpeg, png and webp) format are supported.",
              function (value: any) {
                return (
                  value?.file && IMAGE_UPLOAD_MIME_TYPES.includes(value?.file?.type)
                );
              }
            ),
        otherwise: (schema) => schema.nullable(),
      }),
    },
    [["ocr_img", "ocr_img"]]
  )
  .required();
