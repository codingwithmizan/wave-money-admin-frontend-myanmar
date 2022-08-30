import { FC } from "react";
import { CSVLink } from "react-csv";

interface FileParsingMsgProps {
  parsingErrorMessages: any[];
}

const headers = [{ label: "Error Messages", key: "msg" }];

export const FileParsingMsg: FC<FileParsingMsgProps> = ({
  parsingErrorMessages,
}) => {
  return (
    <div className="ml-2">
      {parsingErrorMessages?.length > 0 ? (
        <>
          <p>
            Total {parsingErrorMessages?.length?.toString()}
            {parsingErrorMessages.length === 1 ? " error" : " errors"} are
            found.
            <CSVLink
              headers={headers}
              data={parsingErrorMessages}
              filename={"csv-file-upload-errors.csv"}
              className="text-red-600 font-medium pl-2 text-base underline cursor-pointer"
            >
              Export All
            </CSVLink>
          </p>
          <div className="ml-5 mt-2">
            <ol className="list-decimal">
              {parsingErrorMessages.map((error, i) => {
                if (i <= 4) {
                  return (
                    <li key={i} className="text-red-600 mb-1">
                      {error.msg}
                    </li>
                  );
                }
              })}
            </ol>
          </div>
        </>
      ) : (
        <p className="text-green-600">All Infomations are correct.</p>
      )}
    </div>
  );
};
