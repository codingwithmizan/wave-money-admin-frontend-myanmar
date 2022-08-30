import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import {ComapnyForm} from "@/components/management/companies";
import { setHeaderTitle } from "@/lib/helpers/utils";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "@/lib/services/baseServices";
import * as yup from "yup";


const Edit = () => {
  const [clientDetails, setClientDetails] = useState<any>({});
  const { id } = useParams();
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
    })
    .required();
  setHeaderTitle("client_management");

  useEffect(() => {
    getClientDetails();
  }, [id]);

  const getClientDetails = async () => {
    const response = await getDetails("customers", id);

    if (response?.success) {
      setClientDetails(response?.data);
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <div className="bg-white mt-4 mx-4 rounded-lg p-8 pb-16 shadow-sm">
      <div className="flex justify-end">
        <Link to="/client/list" className="btn btn-outline-light">
          <BiArrowBack className="inline-block" /> Back to list
        </Link>
      </div>
      <div className="mt-8  mx-auto text-gray-600">
        <h2 className="page-title text-center mb-10">
          Edit Client
        </h2>
        <div>
        {/* <ShowUploadedNID /> */}
        <ComapnyForm formMode="CREATE"  />
        </div>
      </div>
    </div>
  );
};

export default Edit;
