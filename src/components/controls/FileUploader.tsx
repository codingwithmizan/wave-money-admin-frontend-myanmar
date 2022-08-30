import { FC } from "react";
import { Upload, message, Button } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
interface FileUploaderControlProps {
  setImageFile: (file: any) => void;
}

 const FileUploaderControl: FC<FileUploaderControlProps> = ({
  setImageFile,
}) => {
  const props: UploadProps = {
    name: "file_upload",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    multiple: false,
    maxCount: 1,
    listType: "picture-card",
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange(info) {
      // if (info.file.status !== "uploading") {
      //   // console.log(info.file, info.fileList);
      // }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setImageFile(info.file);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button
        icon={<PaperClipOutlined className="relative -top-1" />}
        block
        size="large"
        className="file-upload-btn"
      >
        Click to Upload
      </Button>
    </Upload>
  );
};

export default FileUploaderControl
