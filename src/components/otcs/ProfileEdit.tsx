import { useState, useEffect, FC } from "react";
import { Card } from "antd";
import { useFormContext } from "react-hook-form";
import { FieldLabel, Input, Select, DatePicker } from "@/components/controls";
import { getRegionList, getTownShips } from "@/lib/services";
import { generateNrcNo, splitedNrcNo } from "@/lib/helpers";
import moment from "moment";
interface ProfileEditProps {
  otc: any;
  title: string;
}

export const ProfileEdit: FC<ProfileEditProps> = ({ otc, title }) => {
  const [idType] = useState(() => otc.identity_documents?.[0]?.id_type);
  const [regions, setRegions] = useState<any>([]);
  const [townships, setTownships] = useState<any>([]);
  const {
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
      const res = getRegionList();
      if (res?.success) {
        setRegions(res?.data);
      } else {
        console.log(res?.message);
      }
  }, []);

  const watchRegionNo = watch("region_number");
  const watchTownship = watch("township_code");
  const watchIdType = watch("id_type");
  const watchDigits = watch("digits");

  useEffect(() => {
    if (idType === "nrc") {
      if (watchRegionNo && watchTownship && watchIdType && watchDigits) {
        const nrcNo = generateNrcNo(
          watchRegionNo,
          watchTownship,
          watchIdType,
          watchDigits
        );
        setValue("nrc_number", nrcNo);
      }
    }
  }, [watchRegionNo, watchTownship, watchIdType, watchDigits, setValue]);

  useEffect(() => {
    if (idType === "nrc") {
      if (watchRegionNo) {
        const res = getTownShips(watchRegionNo);
        if (res?.success) {
          setTownships(
            res?.data?.map((item: string, index) => ({
              id: index + 1,
              value: item,
              label: item,
            }))
          );
        } else {
          console.log(res?.message);
        }
      } else {
        setTownships([]);
      }
    }
  }, [watchRegionNo]);

  useEffect(() => {
    if (idType === "nrc") {
      const { region, township, id_type, digits } = splitedNrcNo(
        otc?.identity_documents?.[0]?.id_number
      );
      reset({
        name: otc?.name,
        name_mm: otc?.name_mm,
        father_name: otc?.father_name,
        father_name_mm: otc?.father_name_mm ? otc?.father_name_mm : "",
        dob: otc?.dob ? moment(otc?.dob) : "",
        gender: otc?.gender ? otc?.gender : "",
        address: otc?.address,
        employment_status: otc?.employment_status,
        msisdn: otc?.accounts?.[0]?.msisdn ? otc?.accounts?.[0]?.msisdn : "",
        profile_status: otc?.account_status ? otc?.account_status : "",
        kyc_status: otc?.kyc_status,
        nrc_number: otc?.identity_documents?.[0]?.id_number,
        region_number: region,
        township_code: township,
        id_type,
        digits,
      });
    } else {
      reset({
        name: otc?.name,
        name_mm: otc?.name_mm,
        father_name: otc?.father_name,
        father_name_mm: otc?.father_name_mm ? otc?.father_name_mm : "",
        dob: otc?.dob ? moment(otc?.dob) : "",
        gender: otc?.gender ? otc?.gender : "",
        address: otc?.address,
        employment_status: otc?.employment_status,
        msisdn: otc?.accounts?.[0]?.msisdn ? otc?.accounts?.[0]?.msisdn : "",
        profile_status: otc?.account_status ? otc?.account_status : "",
        kyc_status: otc?.kyc_status,
        nrc_number: otc?.identity_documents?.[0]?.id_number,
      });
    }
  }, [otc]);

  return (
    <Card title={title} className="page-body pl-6">
      <div className="form-group flex">
        <div className=" mr-4">
          <FieldLabel name="unique_id" label="Unique Customer ID :" />
        </div>
        <div className="w-1/2">
          <p>{otc?.unique_id}</p>
        </div>
      </div>
      <div className="form-group">
        <div className="w-36  ">
          <FieldLabel name="name" label="Full Name" required />
        </div>
        <div className="form-control">
          <Input control={control} name="name" errors={errors} />
        </div>
      </div>
      <div className="form-group">
        <div className="w-36  ">
          <FieldLabel name="name_mm" label="Full Name in MM" />
        </div>
        <div className="form-control">
          <Input control={control} name="name_mm" errors={errors} />
        </div>
      </div>
      <div className="form-group">
        <div className="w-36  ">
          <FieldLabel
            name="nrc_number"
            label={`${idType === "nrc" ? "NRC" : "Passport"} Number`}
            required
          />
        </div>
        <div className="form-control">
          <Input control={control} name="nrc_number" disabled={idType==='nrc'} />
        </div>
      </div>

      {idType === "nrc" && (
        <>
          <div className="form-control xl:flex xl:space-x-6  items-center">
            <div className="form-group xl:w-1/2">
              <div className="w-36  ">
                <FieldLabel
                  name="region_number"
                  label="Region Number"
                  required
                />
              </div>
              <div className="w-full">
                <Select
                  control={control}
                  name="region_number"
                  options={regions}
                  errors={errors}
                  placeholder="Select region number"
                />
              </div>
            </div>

            <div className="form-group xl:w-1/2">
              <div className="w-36   ">
                <FieldLabel
                  name="township_code"
                  label="Township Code"
                  required
                />
              </div>
              <div className="w-full">
                <Select
                  control={control}
                  name="township_code"
                  options={townships}
                  errors={errors}
                  placeholder="Select township code"
                />
              </div>
            </div>
          </div>

          <div className="form-control xl:flex xl:space-x-6  items-center">
            <div className="form-group xl:w-1/2">
              <div className="w-36  ">
                <FieldLabel name="id_type" label="ID type" required />
              </div>
              <div className=" w-full">
                <Select
                  control={control}
                  name="id_type"
                  options={idTypes}
                  errors={errors}
                  placeholder="Select id type"
                />
              </div>
            </div>

            <div className="form-group xl:w-1/2">
              <div className="  ">
                <FieldLabel name="digits" label="Digits" required />
              </div>
              <div className="w-full ">
                <Input
                  control={control}
                  name="digits"
                  placeholder="e.g. 123456"
                  errors={errors}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <div className="form-group">
        <div className="w-36  ">
          <FieldLabel name="dob" label="Date Of Birth" />
        </div>
        <div className="form-control">
          <DatePicker
            control={control}
            name="dob"
            format={"DD-MM-YYYY"}
            placeholder="e.g. 01-01-2022"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="w-36  ">
          <FieldLabel name="gender" label="Gender" />
        </div>
        <div className="form-control">
          <Select
            control={control}
            name="gender"
            options={genders}
            errors={errors}
            placeholder="Select gender"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="w-36  ">
          <FieldLabel name="father_name" label="Father Name" />
        </div>
        <div className="form-control">
          <Input
            control={control}
            name="father_name"
            errors={errors}
            placeholder="e.g. John Doe"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="w-36  ">
          <FieldLabel name="father_name_mm" label="Father Name in MM" />
        </div>
        <div className="form-control">
          <Input
            control={control}
            name="father_name_mm"
            errors={errors}
            placeholder="e.g. John Smith"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="w-36  ">
          <FieldLabel name="address" label="Address" />
        </div>
        <div className="form-control">
          <Input control={control} name="address" errors={errors} />
        </div>
      </div>
      {/* <div className="form-group">
        <div className="w-36  ">
          <FieldLabel name="employment_status" label="Employment Status" />
        </div>
        <div className="w-1/2">
          <Select
            control={control}
            name="employment_status"
            options={employment_status}
            errors={errors}
            placeholder="Select Employment Status"
          />
        </div>
      </div> */}
      <div className="form-group">
        <div className="w-36  ">
          <FieldLabel name="msisdn" label="MSISDN" />
        </div>
        <div className="form-control">
          <Input
            control={control}
            name="msisdn"
            errors={errors}
            placeholder="e.g. 95978315768"
            disabled
          />
        </div>
      </div>
      <div className="form-group">
        <div className="w-36  ">
          <FieldLabel name="profile_status" label="Profile Status" required />
        </div>
        <div className="form-control">
          <Select
            control={control}
            name="profile_status"
            options={profile_status}
            errors={errors}
            placeholder="Select profile status"
          />
        </div>
      </div>

      <div className="form-group">
        <div className="w-36  ">
          <FieldLabel name="kyc_status" label="KYC Status" required />
        </div>
        <div className="form-control">
          <Input
            control={control}
            name="kyc_status"
            errors={errors}
            placeholder="Select KYC status"
            disabled
          />
        </div>
      </div>
    </Card>
  );
};

const idTypes = [
  { id: 1, value: "N", label: "N" },
  { id: 2, value: "T", label: "T" },
  { id: 3, value: "C", label: "C" },
];

const profile_status = [
  { id: 1, value: "active", label: "Active" },
  { id: 2, value: "frozen", label: "Frozen" },
  { id: 3, value: "suspended", label: "Suspended" },
  { id: 4, value: "blacklist", label: "Blacklist" },
  { id: 5, value: "locked", label: "Locked" },
];

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];

const employment_status = [
  { value: "employed", label: "Employeed" },
  { value: "unemployeed", label: "Unemployeed" },
];
