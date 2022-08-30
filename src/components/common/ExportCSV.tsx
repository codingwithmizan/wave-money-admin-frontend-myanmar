import { FC, useRef, useState } from "react";
import { FaFileExport } from "react-icons/fa";
import { getData } from "@/lib/services";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

interface ExportDataToCSVProps {
  name: string;
  url: string;
  params?: any;
  headers?: any;
  loadData: (item: any) => void;
  title?: string;
}
const ExportCSV: FC<ExportDataToCSVProps> = ({
  name,
  url,
  params,
  loadData,
  headers,
  title,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportingData, setExportingData] = useState([]);
  const csvLinkEl = useRef<any>();

  const generateFomattedData = (data: any) => {
    if (data) {
      return data?.map((item: any, i: number) => {
        return loadData(item);
      });
    } else {
      return [];
    }
  };

  const getExportingData = () => {
    setIsExporting(true);
    return getData(url, params)
      .then((res) => res)
      .catch((errMsg) => {
        toast.error("Failed to export");
        return [];
      });
  };

  const downloadReport = async () => {
    const data = await getExportingData();
    const fData = generateFomattedData(data?.data);
    if (fData?.length > 0) {
      setExportingData(fData);
      setTimeout(() => {
        try {
          if (csvLinkEl?.current) csvLinkEl.current.link.click();
          setIsExporting(false);
          toast.success(`${name} has been exported successfully`);
        } catch (exp: any) {
          toast.error("Something Wrong");
        }
      });
    } else {
      setIsExporting(false);
      toast.error("Nothing to export");
    }
  };

  return (
    <div>
      <button
        disabled={isExporting}
        onClick={() => downloadReport()}
        className="btn btn-export"
        title={title}
      >
        <FaFileExport className="inline-block mr-1 relative -top-0.5" />{" "}
        {isExporting ? "Exporting..." : "Export"}{" "}
      </button>
      <CSVLink
        className="d-none"
        filename={name}
        asyncOnClick={true}
        data={exportingData}
        headers={headers}
        ref={csvLinkEl}
      />
    </div>
  );
};

export default ExportCSV;
