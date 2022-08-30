import { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import {ComapnyForm} from "@/components/management/companies";
import { setHeaderTitle } from "@/lib/helpers/utils";
import CreateClientUsingNID from "@/components/management/companies/CreateClientUsingNID";
import ShowUploadedNID from "@/components/management/companies/ShowUploadedNID";
import * as yup from "yup";

const Add = () => {
  const [frontImage, setFrontImage] = useState<any>();
  const [backImage, setBackImage] = useState<any>();
  const [profileImage, setProfileImage] = useState<any>();
  const [isProcessed, setIsProcessed] = useState<boolean>(false);
  const [ocrData, setOcrData] = useState<any>();

  const validationSchema = yup
    .object({
      name: yup.string().trim().required("Name is required"),
      fatherName: yup.string().required("Father's Nmae Required"),
      gender: yup.string().required("Gender is Required"),
      dob: yup.string().trim().required("Date of Birth is required"),
      msisdn: yup.string().trim().required("Msisdn is required"),
      employeeStatus: yup.string().nullable(),
      nationality: yup.string().trim().required("Nationality is required"),
      address: yup.string().trim().required("Address is required"),
      status: yup.string().required("Status is Required"),
      confidence: yup.number().required("Confidence is Required"),
      id_type: yup.string().required("Id Type is required"),
      id_number: yup.string().required("Id number is required"),
    })
    .required();

  setHeaderTitle("client_management");

  const onProcessImages = (ocrData:any) => {
    setIsProcessed(true)
    setOcrData(ocrData)
  }

  return (
    <div className="bg-white mt-4 mx-4 rounded-lg p-8 pb-16 shadow-sm">
      <div className="flex justify-end">
        <Link to="/client/list" className="btn btn-outline-light">
          <BiArrowBack className="inline-block" /> Back to list
        </Link>
      </div>
      <div className="mt-4  mx-auto text-gray-600">
        <h2 className="page-title text-center  mb-10">Create New Client</h2>

        <div className="mt-8">
          <CreateClientUsingNID 
            frontImage={frontImage} 
            backImage ={backImage} 
            profileImage ={profileImage} 
            setFrontImage ={setFrontImage} 
            setBackImage ={setBackImage} 
            setProfileImage ={setProfileImage} 
            onProcessImages={onProcessImages}/>
        </div>

        <div className='mt-8'>
          {isProcessed &&
            <>
              <ShowUploadedNID 
                images={{
                  frontImage : frontImage,
                  backImage :backImage,
                  profileImage :profileImage,
                }}
              />
              {/* <ComapnyForm 
                formMode="CREATE" 
                schema={validationSchema}
                ocrData={ocrData}
                images={{
                  frontImage : frontImage,
                  backImage :backImage,
                  profileImage :profileImage,
                }}
              /> */}
               <ComapnyForm formMode="CREATE"  />
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Add;
