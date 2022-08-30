import { FC } from "react";
import { Upload } from "antd";
import { Controller } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
const { Dragger } = Upload;
interface DragDropProps {
  control: any;
  name: string;
  errors?: any;
  msg?: string;
  acceptFileFormat: any;
  fileTypeLabelText?: string;
  fileSizeLabelText?: string;
  onRemoveFile: () => void;
}

export const DragDrop: FC<DragDropProps> = ({
  control,
  name,
  errors,
  msg,
  acceptFileFormat,
  fileTypeLabelText,
  fileSizeLabelText,
  onRemoveFile,
}) => {
  let errMsg = msg ? msg : errors?.[name]?.message;
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Dragger
            {...field}
            beforeUpload={() => false}
            multiple={false}
            accept={acceptFileFormat}
            maxCount={1}
            onRemove={(file) => {
              onRemoveFile();
            }}
          >
            <div className="flex justify-center mt-1">
              <AiOutlineCloudUpload className="text-4xl text-sky-600" />
            </div>
            <p className="text-sky-800 pt-2 text-base font-medium">
              Click or drag file to this area to upload.
            </p>
            {fileTypeLabelText && (
              <p className="text-sm text-gray-500 pt-2">{fileTypeLabelText}</p>
            )}{" "}
            {fileSizeLabelText && (
              <p className="text-sm text-gray-500 pt-2">
                {fileSizeLabelText}
                {/* Uploaded file size not more than 5 MB. */}
              </p>
            )}
          </Dragger>
        )}
      />
      <p className="error-msg mt-1">{errMsg}</p>
    </div>
  );
};
