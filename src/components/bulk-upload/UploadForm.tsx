import { FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  TextArea,
  Checkbox,
  FieldLabel,
  DragDrop,
} from "@/components/controls";
import { BULK_UPLOAD_FILE_FORMATS } from "@/lib/constants";
import { FileParsingMsg } from "@/components/bulk-upload/FileParsingMsg";
interface UploadFormProps {
  isParsingCompleted: boolean;
  setIsParsingCompleted: (value: boolean) => void;
  parsingErrorMessages: any[];
  setErrorMessages: (value: any[]) => void;
}
export const UploadForm: FC<UploadFormProps> = ({
  isParsingCompleted,
  setIsParsingCompleted,
  parsingErrorMessages,
  setErrorMessages,
}) => {
  const {
    control,
    reset,
    formState: { errors },
  } = useFormContext();

  const onRemoveFile = () => {
    setErrorMessages([]);
    setIsParsingCompleted(false);
    reset({
      bulk_file: "",
    });
  };
  return (
    <div>
      <div className="mr-4">
        <DragDrop
          control={control}
          name="bulk_file"
          acceptFileFormat={BULK_UPLOAD_FILE_FORMATS}
          errors={errors}
          onRemoveFile={onRemoveFile}
          fileTypeLabelText="Only CSV file is accepted."
        />
      </div>
      {isParsingCompleted && (
        <div className="mt-4">
          <FileParsingMsg parsingErrorMessages={parsingErrorMessages} />
        </div>
      )}
      <div className="mt-6">
        <Checkbox
          control={control}
          name="is_ocr_validated"
          label="OCR Validation"
        />
      </div>
      <div className="mt-4">
        <FieldLabel name="description" label="Description" />
        <div className="mt-2">
          <TextArea
            control={control}
            name="description"
            errors={errors}
          ></TextArea>
        </div>
      </div>
    </div>
  );
};
