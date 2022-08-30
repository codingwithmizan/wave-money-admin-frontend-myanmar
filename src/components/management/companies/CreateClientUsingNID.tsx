import { objectToFormData } from "@/lib/helpers/utils";
import { postData } from "@/lib/services/baseServices";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ImageUploader from "./ImageUploader";
  
interface IImages {
  frontImage: File
  backImage: File
  profileImage: File
  setFrontImage: (image: File)=>void
  setBackImage: (image: File)=>void
  setProfileImage: (image: File)=>void
  onProcessImages: (ocrData: any) => void
}
  
  const CreateClientUsingNID = ({frontImage, backImage, profileImage,setFrontImage, setBackImage, setProfileImage, onProcessImages}: IImages) => {
  
    const { handleSubmit } = useForm();
  
    const onSubmit = async (data:any) => {
      const images = {
        id_front :frontImage,
        id_back: backImage,
        face :profileImage
      }
      const serializedData = objectToFormData(images)
      const response = await postData("ocr/process_ids", serializedData);
        if (response?.success) {
          toast.success(response?.message);
          onProcessImages(response.data)
        } else {
          toast.error(response?.message);
        }
    };
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex gap-14 justify-center ">
          <div className="w-96">
            <ImageUploader file={frontImage} setFile={setFrontImage} />
            {frontImage && (
              <div className="text-sm text-center text-green-600">
                <span className="mr-1 ">Selected File :</span>
                {frontImage?.name}
              </div>
            )}
            <p className="text-center mt-2">NRC Front Side</p>
          </div>
          <div className="w-96">
            <ImageUploader file={backImage} setFile={setBackImage} />
            {backImage && (
              <div className="text-sm text-center text-green-600">
                <span className="mr-1 ">Selected File :</span>
                {backImage?.name}
              </div>
            )}
            <p className="text-center mt-3">NRC Back Side</p>
          </div>
          <div className="w-96">
            <ImageUploader file={profileImage} setFile={setProfileImage} />
            {profileImage && (
              <div className="text-sm text-center text-green-600">
                <span className="mr-1 ">Selected File :</span>
                {profileImage?.name}
              </div>
            )}
            <p className="text-center mt-3">Profile Picture</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button className="btn btn-info btn-block w-96" type="submit">
            Process
          </button>
        </div>
      </form>
    );
  };
  
  export default CreateClientUsingNID;
  