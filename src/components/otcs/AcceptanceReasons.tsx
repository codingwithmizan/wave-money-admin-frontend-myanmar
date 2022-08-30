import { FC, useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import { OtcReason } from "@/lib/models";
import { getData, updateData } from "@/lib/services";
import { useCommon } from "@/hooks";
import {
  Select,
  FieldLabel,
  TextArea,
  ImageUploader,
} from "@/components/controls";
import { AiOutlineDelete } from "react-icons/ai";
import otc_on_accept from "@/assets/images/confirm-msg-success.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";
import { serialize } from "object-to-formdata";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AcceptanceReasonsProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  id: string;
}

export const AcceptanceReasons: FC<AcceptanceReasonsProps> = ({
  isModalVisible,
  toggleModal,
  id,
}) => {
  const { loading, setLoading } = useCommon();
  const [accepttanceReasons, setAcceptanceReasons] = useState<OtcReason[]>([]);
  const [filteredAcceptanceReasons, setFilteredAcceptanceReasons] = useState<
    OtcReason[]
  >([]);
  const navigate = useNavigate();

  

  const {
    control,
    handleSubmit,
    getFieldState,
    formState: { errors, isValid, isDirty, isSubmitting, touchedFields },
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      reasons: [{ reason_id: "" }],
      description: "",
      attachment: "",
    },
    resolver: yupResolver(reasonSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "reasons",
  });

  useEffect(() => {
    getAcceptRasons();
  }, []);

  useEffect(() => {
    const reasonList = accepttanceReasons.filter(
      (reason: any) => !fields.some((item) => item.reason_id === reason.id)
    );
    setFilteredAcceptanceReasons(reasonList);
  }, [fields]);

  const getAcceptRasons = async () => {
    setLoading(true);
    try {
      const res = await getData("reasons/acceptance");
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
    setLoading(false);
  };

  const onSubmit = async (data: any) => {
    const reason_ids: any = [];
    data.reasons.map((reason: any) => reason_ids.push(+reason.reason_id));

    const formData = serialize({
      note: data.description,
      ref_file: data.attachment.file,
      reason_ids,
    });

    const res = await updateData(`otc_profiles/${id}/accept`, formData);
    if (res.success) {
      toast.success(res.message);
      navigate("/otc/approved/list");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      onOk={toggleModal}
      onCancel={toggleModal}
      className="reasons"
      width={500}
    >
      <div className="px-6 my-4">
        <div className="flex flex-col items-center mb-6">
          <img src={otc_on_accept} alt={""} className="w-32" />
          <h2 className="text-2xl font-medium mt-4">Approved the user?</h2>
        </div>
        <div
          style={{
            height: "470px",
            overflow: "auto",
          }}
        >
          <div className="mr-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <FieldLabel
                  name="reasons"
                  label="Approval Reason(s)"
                  className="text-sky-700 font-medium"
                  required
                />
              </div>

              {fields.map((item, i) => {
                const reasonIdError = _.isEmpty(errors)
                  ? ""
                  : errors?.reasons?.[i]?.reason_id?.message;

                return (
                  <Row key={item.id} className="mb-4">
                    <Col
                      xs={{ span: 21 }}
                      sm={{ span: 21 }}
                      md={{ span: 21 }}
                      lg={{ span: 21 }}
                      xl={{ span: 21 }}
                      xxl={{ span: 21 }}
                    >
                      <Select
                        key={item.id}
                        control={control}
                        name={`reasons.${i}.reason_id`}
                        placeholder="Please select an acceptance reason"
                        msg={reasonIdError}
                        options={
                          fields.length > 1
                            ? (filteredAcceptanceReasons as any)
                            : accepttanceReasons
                        }
                      />
                    </Col>

                    <Col
                      xs={{ span: 2, offset: 1 }}
                      sm={{ span: 2, offset: 1 }}
                      md={{ span: 2, offset: 1 }}
                      lg={{ span: 2, offset: 1 }}
                      xl={{ span: 2, offset: 1 }}
                      xxl={{ span: 2, offset: 1 }}
                    >
                      <div className="relative top-3">
                        {fields.length > 1 && (
                          <Button
                            type="primary"
                            block
                            danger
                            ghost
                            onClick={() => remove(+item.id)}
                          >
                            <AiOutlineDelete className="relative -left-1.5" />
                          </Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                );
              })}
              {accepttanceReasons.length > fields.length &&
                (isDirty || isValid) && (
                  <div className="flex justify-end mr-12 mt-5 mb-4 ml-1">
                    <Button
                      className="btn-reset rounded-sm w-full"
                      onClick={() => append({ reason_id: "" })}
                      size="middle"
                    >
                      Add More
                    </Button>
                  </div>
                )}

              <div className="mr-8 mt-6">
                <FieldLabel
                  name="description"
                  label="Description"
                  className="text-sky-700 font-medium"
                />
                <div className="mt-2 mb-5">
                  <TextArea
                    name="description"
                    control={control}
                    className="text-sm"
                    placeholder="Add reason description here..."
                  />
                </div>
              </div>
              <div className="mr-12">
                <FieldLabel
                  name="attachment"
                  label="Upload Attachment"
                  className="text-sky-700 font-medium"
                />
                <div className="mt-2 flex justify-between items-center">
                  <ImageUploader
                    name="attachment"
                    control={control}
                    setValue={setValue}
                    acceptFileFormat=""
                  />
                  {/* <div>
                    <ul>
                      <li>*Image format must be "jpg, jpeg, png or webp".</li>
                      <li>*Image size not more than 1MB.</li>
                    </ul>
                  </div> */}
                </div>
                {/* <div>
                  <p className="text-red-500">{errors?.attachment?.message}</p>
                </div> */}
              </div>
              <div className="flex gap-6 mt-10 mr-14">
                <div className="w-1/2">
                  <Button
                    type="primary"
                    block
                    ghost
                    size="large"
                    className="btn-cancel"
                    onClick={()=> toggleModal()}
                  >
                    No
                  </Button>
                </div>
                <div className="w-1/2">
                  <Button
                    type="primary"
                    className="btn-submit"
                    block
                    size="large"
                    htmlType="submit"
                    disabled={!isDirty || !isValid}
                    loading={isSubmitting}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const reasonSchema = yup
  .object({
    reasons: yup.array(
      yup.object({
        reason_id: yup.string().required("Acceptance reason is required "),
      })
    ),
    // attachment: yup
    //   .mixed()
    //   .test(
    //     "fileSize",
    //     "Uploaded file is to big, image size not more than 1MB.",
    //     (value, context) => {
    //       return value.file && value.file.size <= MAX_FILE_SIZE;
    //     }
    //   )
    //   .test(
    //     "type",
    //     "Invalid image format. Only (jpg, jpeg, png and webp) format are supported.",
    //     function (value) {
    //       return value.file && SUPPORTED_FORMATS.includes(value.file.type);
    //     }
    //   )
  })
  .required();
