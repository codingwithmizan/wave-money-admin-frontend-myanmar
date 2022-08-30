import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "@/lib/services/baseServices";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { setHeaderTitle } from "@/lib/helpers/utils";

const Details = () => {
  const [threshold, setThreshold] = useState<any>({});
  const { id } = useParams();

  setHeaderTitle("threshold_management");

  useEffect(() => {
    getThresholdDetails();
  }, [id]);

  const getThresholdDetails = async () => {
    const response = await getDetails("customers/threshold_settings", id);

    if (response?.success) {
      setThreshold(response?.data);
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <>
        <div className="bg-white mt-4 mx-4 rounded-lg p-8 shadow-sm">
      <div className="flex justify-end">
        <Link to="/client/list" className="btn btn-outline-light">
          <BiArrowBack className="inline-block" /> Back to list
        </Link>
      </div>
      <h1 className="page-title py-4">Client Details</h1>

      <div className=" mt-8 grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div>
            <table className="min-w-full  table-fixed ">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td
                    colSpan={3}
                    className="bg-sky-700 text-white pl-6 py-2.5 text-xl border border-sky-600"
                  >
                    General Information
                  </td>
                </tr>
                <tr className="hover:bg-gray-100" >
                  <td className="detail-key ">Key</td>
                  <td className="font-bold">:</td>
                  <td className="detail-data">
                    {threshold?.key}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100" >
                  <td className="detail-key ">Lower Raange</td>
                  <td className="font-bold">:</td>
                  <td className="detail-data">
                    {threshold?.lower_range}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100" >
                  <td className="detail-key ">Upper Range</td>
                  <td className="font-bold">:</td>
                  <td className="detail-data">
                    {threshold?.upper_range}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Details;
