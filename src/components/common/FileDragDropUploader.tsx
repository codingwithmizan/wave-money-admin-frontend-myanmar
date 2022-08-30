import { useCallback, FC, Dispatch } from "react";
import { useDropzone } from "react-dropzone";
import classnames from "classnames";

interface FileUploaderProps {
  setFile: Dispatch<any>;
  setIsUploadReject: (value: boolean) => void;
  children: JSX.Element;
}
const FileUploader: FC<FileUploaderProps> = ({
  setFile,
  setIsUploadReject,
  children,
}) => {
  const onDrop = useCallback((acceptedFiles:any) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      // accept: 'image/jpeg,image/png'
    });

  setIsUploadReject(isDragReject);

  return (
    <div
      {...getRootProps()}
      className={classnames("dropzone-box w-full", {
        ["border-red-500 "]: isDragReject,
        ["border-green-500"]: isDragAccept,
      })}
    >
      <input {...getInputProps()} />

      {children}
    </div>
  );
};

export default FileUploader;
