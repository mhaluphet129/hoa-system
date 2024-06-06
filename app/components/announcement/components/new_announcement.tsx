import React, { useState } from "react";
import {
  Col,
  Modal,
  Row,
  Input,
  Space,
  Form,
  Spin,
  Progress,
  Button,
  Alert,
} from "antd";

import { CheckOutlined } from "@ant-design/icons";

import { AnnouncementControllerProps } from "@/types";
import ImageUpload from "./image_upload";
import FilestackApi from "@/assets/js/filestack";
import { bytesToMegabytes } from "@/assets/js";

const fs = new FilestackApi();

const StaffNewAnnouncement = ({
  open,
  onSave,
  close,
  isLoading,
}: AnnouncementControllerProps) => {
  const [image, setImage] = useState("");
  const [form] = Form.useForm();
  const [uploadConfig, setUploadConfig] = useState({
    isUploading: false,
    totalSize: 0,
    currentProgress: 0,
    currentSize: 0,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadWarningFlag, setUploadWarningFlag] = useState<boolean | null>(
    null
  );
  const [showUploadWarning, setUploadWarning] = useState(false);

  const uploadFile = async () => {
    if (selectedFile) {
      let res = await fs.upload(selectedFile, (ev) =>
        setUploadConfig({
          totalSize: uploadConfig.totalSize,
          isUploading: true,
          currentProgress: ev.totalPercent,
          currentSize: ev.totalBytes,
        })
      );

      if (res.status == "Stored") {
        setUploadConfig({ ...uploadConfig, isUploading: false });
        setImage(res.url);
        setUploadWarningFlag(true);
      }
    }
  };

  const handleFinish = (val: any) => {
    // check if user pick an image but not uploaded it yet
    if (uploadWarningFlag == false) {
      setUploadWarning(true);
      setUploadWarningFlag(true);

      return;
    }

    const { title, description } = val;
    if (title != "" && description != "") {
      if (image != "") {
        let obj = {
          title,
          description,
          images: [image],
        };
        onSave(obj);
      } else onSave({ title, description });

      clear();
    }
  };

  const clear = () => {
    form.resetFields();
    setImage("");
    setSelectedFile(null);
    setUploadWarningFlag(null);
    setUploadWarning(false);
  };

  return (
    <Modal
      title="Add Announcement"
      open={open}
      onCancel={() => {
        close();
        clear();
      }}
      closable={false}
      okText="ADD"
      okButtonProps={{ size: "large" }}
      cancelButtonProps={{ size: "large" }}
      width={900}
      onOk={form.submit}
      destroyOnClose
      centered
    >
      <Spin spinning={isLoading}>
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Form form={form} onFinish={handleFinish}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <label htmlFor="title">Title</label>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Title is empty. Please provide",
                      },
                    ]}
                  >
                    <Input
                      name="title"
                      style={{
                        width: "100%",
                        fontFamily: "abel",
                      }}
                    />
                  </Form.Item>
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <Form.Item
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Description is empty. Please provide",
                      },
                    ]}
                  >
                    <Input.TextArea
                      name="description"
                      style={{
                        fontFamily: "abel",
                      }}
                      autoSize={{
                        minRows: 12,
                        maxRows: 20,
                      }}
                    />
                  </Form.Item>
                </div>
              </Space>
            </Form>
          </Col>

          <Col span={12}>
            <label htmlFor="description" style={{ alignSelf: "start" }}>
              Image
            </label>
            {showUploadWarning && (
              <Alert
                type="warning"
                description="You didn't Upload the image yet. Continue will not upload the image."
                afterClose={() => setUploadWarning(false)}
              />
            )}

            <div style={{ height: 190, width: 300, marginTop: 10 }}>
              <ImageUpload
                setSelectedFile={(file: File | null) => {
                  setUploadWarningFlag(false);
                  setSelectedFile(file);
                  setUploadConfig({ ...uploadConfig, totalSize: file!.size });
                }}
                selectedFile={selectedFile}
                loading={uploadConfig.isUploading}
              />
              {image != "" && (
                <div
                  style={{
                    float: "right",
                    marginTop: 5,
                  }}
                >
                  Uploaded{" "}
                  <span
                    style={{
                      background: "#28a745",
                      borderRadius: "50%",
                      display: "inline-block",
                      width: 21,
                      height: 21,
                      textAlign: "center",
                    }}
                  >
                    <CheckOutlined style={{ color: "#fff" }} />
                  </span>
                </div>
              )}
              {selectedFile && !uploadConfig.isUploading && image == "" && (
                <Space style={{ marginTop: 5, float: "right" }}>
                  <Button
                    danger
                    type="text"
                    onClick={() => setSelectedFile(null)}
                  >
                    Remove
                  </Button>
                  <Button type="primary" onClick={uploadFile}>
                    Upload
                  </Button>
                </Space>
              )}
              {uploadConfig.isUploading && (
                <Row>
                  <Col span={14} offset={1}>
                    <Progress
                      percent={uploadConfig.currentProgress}
                      strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                    />
                  </Col>
                  <Col span={9}>
                    ({bytesToMegabytes(uploadConfig.currentSize)} of{" "}
                    {bytesToMegabytes(uploadConfig.totalSize)}MB)
                  </Col>
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};

export default StaffNewAnnouncement;
