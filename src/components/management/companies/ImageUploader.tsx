import { useState, FC } from "react";
import FileDragDropUploader from "@/components/common/FileDragDropUploader";
import { AiOutlinePaperClip } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";

interface ImageUploaderProps {
  file: any;
  setFile: (file: any) => void;
}

const ImageUploader: FC<ImageUploaderProps> = ({ file, setFile }) => {
  const [isUploadReject, setIsUploadReject] = useState(false);

  const UploaderTxt = (
    <div className=" flex justify-center items-center text-gray-600 ">
      <div className="text-center">
        <MdCloudUpload
          className={`text-5xl ${
            isUploadReject ? "text-red-700" : "text-sky-700"
          }  mx-auto`}
        />
        {isUploadReject ? (
          <p className="text-red-600 py-14">
            Only jpeg and png files are accepted
          </p>
        ) : (
          <>
            <p className="my-2 text-xl">Drag & Drop file here</p>
            <p>or</p>
            <div className="my-2">
              <button className="btn btn-outline-info py-1" type="button">
                <AiOutlinePaperClip className="inline-block text-lg relative -left-1" />
                Choose file
              </button>
              <p>Maximum upload size 5 MB</p>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className=" flex justify-center ">
      <FileDragDropUploader
        setFile={setFile}
        setIsUploadReject={setIsUploadReject}
      >
        <div className="py-4">
          {UploaderTxt}
        </div>
      </FileDragDropUploader>
    </div>
  );
};

export default ImageUploader;
