import { FC } from "react";
import {FaFileExport} from 'react-icons/fa'
interface ExportDataToCSVProps {
  name: string;
  onExport: () => void;
}
const ExportDataToCSV: FC<ExportDataToCSVProps> = ({ onExport, name }) => {
  const handleClick = () => {
    onExport();
  };
  return (
    <div>
      <button
        className="btn btn-outline-warning hover:text-white text-sm"
        onClick={handleClick}
      >
       <FaFileExport className='inline-block mr-0.5 relative bottom-0.5 text-xs'/> {name}
      </button>
    </div>
  );
};

export default ExportDataToCSV;
