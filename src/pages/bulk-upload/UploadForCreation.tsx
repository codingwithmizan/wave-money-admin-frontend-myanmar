import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { setHeaderTitle } from "@/lib/helpers";
import { Col, Row, Card, Button } from "antd";
import { UploadForm } from "@/components/bulk-upload";
import { useForm, FormProvider } from "react-hook-form";
import { serialize } from "object-to-formdata";
import { postData } from "@/lib/services";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BULK_UPLOAD_FILE_MIME_TYPES } from "@/lib/constants";
import { usePapaParse } from "react-papaparse";
import { useState } from "react";
import { AssignmentReturned } from "@mui/icons-material";

const UploadForCreation = () => {
  const [isParsingCompleted, setIsParsingCompleted] = useState(false);
  const [parsingErrorMessages, setParsingErrorMessages] = useState<any[]>([]);
  const navigate = useNavigate();
  const { readRemoteFile } = usePapaParse();

  const checkMsisdn = (data?: any, row?: number) => {
    const msisdnPattern = /^(09|9|\+?950?9|\+?95950?9)\d{7,9}$/;
    if (data) {
      if (!msisdnPattern.test(data)) {
        return `In row ${row}, wrong msisdn provided.`;
      } else {
        return "";
      }
    } else {
      return `In row ${row}, misdn not found.`;
    }
  };

  const handleReadRemoteFile = (url?: string) => {
    if (url) {
      const errMsg = [...parsingErrorMessages];
      let i = 1;
      readRemoteFile(url, {
        download: true,
        header: true,
        skipEmptyLines: true,
        step: (row: any) => {
          console.log("Row:", row?.data);
          const msg = checkMsisdn(row?.data?.msisdn, i++);
          msg && errMsg.push({ msg: msg });
        },
        complete: () => {
          setParsingErrorMessages(errMsg);
          setIsParsingCompleted(true);
        },
      });
    } else {
      return false;
    }
  };

  const bulkUploadSchema = yup
    .object()
    .shape({
      bulk_file: yup
        .mixed()
        .test("required", "You need to provide a file", (value: any) => {
          if (value?.file) return true;
          return false;
        })
        .test(
          "type",
          "Invalid File format. Only CSV file is accepted.",
          (value: any) => {
            return (
              value?.file &&
              BULK_UPLOAD_FILE_MIME_TYPES.includes(value?.file?.type)
            );
          }
        )
        .test("Check row", "Every Row need to be valid.", (value?: any) => {
          value?.file && handleReadRemoteFile(value?.file);
          return true;
        }),

      description: yup
        .string()
        .max(200, "Maximum length of descriptions must be 200 characters"),
    })
    .required();

  const methods = useForm({
    mode: "all",
    defaultValues: {
      bulk_file: "",
      is_ocr_validated: false,
      description: "",
    },
    resolver: yupResolver(bulkUploadSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = methods;

  const onSubmit = async (data: any) => {
    const formData = serialize({
      file: data.bulk_file.file,
      ocr_checked: data.is_ocr_validated,
      note: data.description,
    });

    const res = await postData("subscribers/upload", formData);
    console.log("bulk res", res);
    if (res.success) {
      toast.success(res.message);
      navigate("/bulk-list");
    } else {
      toast.error(res.message);
    }
  };
  console.log("parsingErrorMessages", parsingErrorMessages);

  setHeaderTitle("bulk-upload-for-creation");
  return (
    <div className="mb-6">
      <div className="flex justify-end">
        <Link to="/bulk-list" className="btn-back">
          <BiArrowBack className="btn-back-icon" /> Back to Bulk List
        </Link>
      </div>
      <Card title="Bulk Upload for Creation" className="page-body pb-32">
        <Row>
          <Col
            className=" w-full"
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 22 }}
            lg={{ span: 20, offset: 2 }}
            xl={{ span: 14, offset: 4 }}
            xxl={{ span: 10, offset: 6 }}
          >
            <div className="mt-6 ">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <UploadForm
                      isParsingCompleted={isParsingCompleted}
                      setIsParsingCompleted={setIsParsingCompleted}
                      parsingErrorMessages={parsingErrorMessages}
                      setErrorMessages={setParsingErrorMessages}
                    />
                  </div>

                  <div className="mt-10 mr-3">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                      block
                      loading={isSubmitting}
                      disabled={
                        !isDirty || !isValid || parsingErrorMessages.length > 0
                      }
                    >
                      Process
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UploadForCreation;
