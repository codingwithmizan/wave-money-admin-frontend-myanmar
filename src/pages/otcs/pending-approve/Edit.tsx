import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import {
  NrcCardEdit,
  ProfileEditReasons,
  ChangeLog,
  OCRDetails,
  PendingProfileEdit,
} from "@/components/otcs";
import { setHeaderTitle } from "@/lib/helpers";
import { getData, updateData } from "@/lib/services";
import { useCommon } from "@/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { serialize } from "object-to-formdata";
import { toast } from "react-toastify";
import { LoadingSpiner } from "@/components/common";
import { DATE_FORMMAT, MAX_FILE_SIZE } from "@/lib/constants";
import moment from "moment";

const Edit = () => {
  const [otcProfile, setOtcProfile] = useState<any>({});
  const [ocrBypass, setOcrBypass] = useState(true);
  const [ocrImg, setOcrImg] = useState("");
  const [ocrExtractedResult, setOcrExtractedResult] = useState();
  const { loading, setLoading } = useCommon();
  const { id } = useParams();
  const navigate = useNavigate();
  const method = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      name_mm: "",
      father_name: "",
      father_name_mm: "",
      gender: "",
      dob: "",
      address: "",
      employement_status: "",
      msisdn: "",
      account_status: "",
      kyc_status: "",
      region_number: "",
      township_code: "",
      id_type: "",
      digits: "",
      nrc_number: "",
      reasons: "",
      note: "",
      sr_number: "",
      profile_img: null,
    },
    resolver: yupResolver(
      otcProfile?.id_type === "nrc" ? otcProfileSchema : passportProfileSchema
    ),
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = method;

  useEffect(() => {
    setLoading(true);
    getOtcProfile();
    setLoading(false);
  }, [id]);

  const getOtcProfile = async () => {
    try {
      const res = await getData("otc_profiles/pending/details", {
        unique_id: id,
      });
      if (res.success) {
        setOtcProfile(res.data?.find((item: any) => item?.unique_id === id));
      } else {
        console.log(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("otcProfile111 new", otcProfile?.id_type);

  const onSubmit = async (data: any) => {
    const formData = serialize({
      name: data.name,
      name_mm: data.name_mm,
      father_name: data.father_name,
      father_name_mm: data.father_name_mm,
      gender: data.gender,
      dob: moment(data?.dob?._d).format(DATE_FORMMAT),
      address: data.address,
      employment_status: data.employment_status,
      msisdn: data.msisdn,
      status: data.account_status,
      profile_status: data.kyc_status,
      id_type: otcProfile.identity_documents?.[0]?.id_type,
      id_number: data.nrc_number,
      poi_front: ocrImg,
      poi_back: "",
      auto_verify: ocrBypass,
      ocr_response: ocrExtractedResult,
      reason_ids: [+data.reasons],
      note: data.note,
      sr_number: data?.sr_number,
      ref_file: data.profile_img?.file,
      account_id: otcProfile.accounts?.[0]?.profile_id,
      identity_document_id: otcProfile.identity_documents?.[0]?.id,
    });

    const res = await updateData("profiles", formData, id);
    if (res.success) {
      toast.success(res.message);
      navigate("/otc/pending-to-approve");
    } else {
      toast.error(res.message);
    }

    console.log("otc edit submit", data);
  };

  const setOcrResult = (ocrResult: any) => {
    setOcrExtractedResult(ocrResult);
  };

  const btnCancel = () => navigate("/otc/pending-to-approve");
  setHeaderTitle("pending-to-approve-otc-profiles");

  if (loading) {
    return <LoadingSpiner />;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/otc/pending-to-approve" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Pending to Approve
          List
        </Link>
      </div>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[24, 24]}>
            <Col xs={{ span: ocrExtractedResult ? 10 : 15 }}>
              <PendingProfileEdit
                otc={otcProfile}
                title="Pending to Approve Profile Edit"
              />
            </Col>
            {ocrExtractedResult && (
              <Col xs={{ span: 8 }}>
                <OCRDetails
                  ocrResult={ocrExtractedResult}
                  title="OCR results"
                />
              </Col>
            )}
            <Col xs={{ span: ocrExtractedResult ? 6 : 9 }}>
              <div className="h-full flex">
                {otcProfile?.photos?.[0] && (
                  <NrcCardEdit
                    otc={otcProfile}
                    nrcImg={otcProfile?.photos?.[0]}
                    idType={ otcProfile?.identity_documents?.[0]?.id_type}
                    setValue={setValue}
                    setOcrBypass={setOcrBypass}
                    setOcrImg={setOcrImg}
                    setOcrResult={setOcrResult}
                  />
                )}
              </div>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              xxl={{ span: 24 }}
            >
              <ProfileEditReasons />
            </Col>
          </Row>

          <div className="flex gap-6 justify-center my-12">
            <div className="w-96">
              <Button
                type="primary"
                block
                ghost
                size="large"
                className="btn-cancel"
                onClick={btnCancel}
              >
                Cancel
              </Button>
            </div>
            <div className="w-96">
              <Button
                type="primary"
                block
                htmlType="submit"
                className="btn-submit"
                size="large"
                disabled={!isDirty || !isValid}
                loading={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
      {id && (
        <div>
          <ChangeLog id={id} />
        </div>
      )}
    </div>
  );
};

export default Edit;

const otcProfileSchema = yup.object().shape(
  {
    name: yup
      .string()
      .typeError("Full Name is required")
      .required("Full Name is required")
      .max(100, "Full Name should contain at most 100 characters.")
      .trim(),
    // msisdn: yup
    //   .string()
    //   .typeError("MSISDN is required")
    //   .required("MSISDN is required")
    //   .matches(
    //     /^(09|\+?950?9|\+?95950?9)\d{7,9}$/,
    //     "Provide valid MM msisdn number in English"
    //   )
    //   .trim(),
    account_status: yup
      .string()
      .typeError("Account status is required")
      .required("Account status is required")
      .trim(),
    kyc_status: yup
      .string()
      .typeError("Profile status is required")
      .required("Profile status is required")
      .trim(),
    nrc_number: yup
      .string()
      .typeError("NRC number is required")
      .required("NRC number is required"),
    region_number: yup
      .string()
      .typeError("Region number is required")
      .required("Region number is required"),
    township_code: yup
      .string()
      .typeError("Township code is required")
      .required("Township code is required"),
    id_type: yup
      .string()
      .typeError("Id type is required")
      .required("Id type is required"),
    digits: yup
      .string()
      .typeError("Digits is required")
      .required("Digits is required"),
    // .matches(/^[0-9]{6}$/, "Digits length must be 6 (numbers only)"),
    reasons: yup
      .string()
      .typeError("Reasons is required")
      .required("Reasons is required"),

    note: yup
      .string()
      .optional()
      .max(120, "Note should contain at most 120 characters.")
      .trim(),

    profile_img: yup.mixed().when("profile_img", {
      is: (value: any) => value,
      then: (schema) =>
        schema.test(
          "fileSize",
          "Uploaded file is to big, file size not more than 1MB.",
          (value: any, context: any) => {
            return value?.file && value?.file?.size <= MAX_FILE_SIZE;
          }
        ),
      otherwise: (schema) => schema.nullable(),
    }),
  },
  [["profile_img", "profile_img"]]
);
const passportProfileSchema = yup.object().shape(
  {
    name: yup
      .string()
      .typeError("Full Name is required")
      .required("Full Name is required")
      .max(100, "Full Name should contain at most 100 characters.")
      .trim(),
    // msisdn: yup
    //   .string()
    //   .typeError("MSISDN is required")
    //   .required("MSISDN is required")
    //   .matches(
    //     /^(09|\+?950?9|\+?95950?9)\d{7,9}$/,
    //     "Provide valid MM msisdn number in English"
    //   )
    //   .trim(),
    account_status: yup
      .string()
      .typeError("Account status is required")
      .required("Account status is required")
      .trim(),
    kyc_status: yup
      .string()
      .typeError("Profile status is required")
      .required("Profile status is required")
      .trim(),
    nrc_number: yup
      .string()
      .typeError("NRC number is required")
      .required("NRC number is required"),
    reasons: yup
      .string()
      .typeError("Reasons is required")
      .required("Reasons is required"),

    note: yup
      .string()
      .optional()
      .max(120, "Note should contain at most 120 characters.")
      .trim(),

    profile_img: yup.mixed().when("profile_img", {
      is: (value: any) => value,
      then: (schema) =>
        schema.test(
          "fileSize",
          "Uploaded file is to big, file size not more than 1MB.",
          (value: any, context: any) => {
            return value?.file && value?.file?.size <= MAX_FILE_SIZE;
          }
        ),
      otherwise: (schema) => schema.nullable(),
    }),
  },
  [["profile_img", "profile_img"]]
);
