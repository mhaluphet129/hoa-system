import React, { useState } from "react";
import { Col, Modal, Row, Input, Space, Form } from "antd";

import { AnnouncementProps, AnnouncementControllerProps } from "@/types";
import ImageUpload from "./image_upload";

const StaffNewAnnouncement = ({
  open,
  onSave,
  close,
}: AnnouncementControllerProps) => {
  const [image, setImage] = useState("");
  const [form] = Form.useForm();

  const handleFinish = (val: any) => {
    const { title, description } = val;

    if (title != "" && description != "") {
      if (image != "") {
        let obj = {
          title,
          description,
          image,
        };
        onSave(obj);
      }
      onSave({ title, description });
    }
  };

  return (
    <Modal
      title="Add Announcement"
      open={open}
      onCancel={close}
      closable={false}
      okText="Add"
      width={900}
      onOk={form.submit}
      centered
    >
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

        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ height: 190, width: 300 }}>
            <ImageUpload />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default StaffNewAnnouncement;
