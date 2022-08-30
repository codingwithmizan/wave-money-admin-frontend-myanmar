import { useState, useEffect } from "react";
import { Card } from "antd";
import { useFormContext } from "react-hook-form";
import { OtcReason } from "@/lib/models";
import { getData } from "@/lib/services";
import { IMAGE_UPLOAD_FORMATS } from "@/lib/constants";
import {
  FieldLabel,
  Input,
  Select,
  TextArea,
  ImageUploader,
} from "@/components/controls";

export const ProfileEditReasons = () => {
  const [accepttanceReasons, setAcceptanceReasons] = useState<OtcReason[]>([]);
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    getAcceptRasons();
  }, []);

  const getAcceptRasons = async () => {
    try {
      const res = await getData("reasons/modification");
      if (res.success) {
        setAcceptanceReasons(
          res.data.map((reason: OtcReason) => ({
            id: reason.id,
            value: reason.id,
            label: reason.portal_message,
          }))
        );
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card title="Profile Edit Reasons" className="page-body pl-6 ">
      <div className="w-2/3">
        <div className="form-group mr-20">
          <div className="w-36  ">
            <FieldLabel name="reasons" label="Reasons" required />
          </div>
          <div className="form-control">
            <Select
              control={control}
              name="reasons"
              options={accepttanceReasons as any}
              errors={errors}
              placeholder="Select profile status"
            />
          </div>
        </div>

        <div className="form-group mr-20">
          <div className="w-36  mb-1">
            <FieldLabel name="note" label="Note" />
          </div>
          <div className="form-control">
            <TextArea
              control={control}
              name="note"
              placeholder="Type Here..."
              errors={errors}
            />
          </div>
        </div>

        <div className="form-group mr-20">
          <div className="w-36 mb-1">
            <FieldLabel name="sr_number" label="SR Number" />
          </div>
          <div className="form-control">
            <Input
              control={control}
              name="sr_number"
              errors={errors}
              placeholder="e.g. 5465465"
            />
          </div>
        </div>

        <div className="form-group mr-20">
          <div className="w-36 mb-1">
            <FieldLabel name="file" label="File" />
          </div>
          <div className="flex">
            <div className="form-control w-72">
              <ImageUploader
                control={control}
                name="profile_img"
                acceptFileFormat={IMAGE_UPLOAD_FORMATS}
                setValue={setValue}
                errors={errors}
              />
            </div>
            <div>
              <ul className="list-disc">
                <li className="text-gray-500">File size not more than 1MB.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
