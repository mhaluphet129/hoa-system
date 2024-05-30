import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
} from "antd";
import { NewCategoryProps } from "@/types";

const NewCategory = ({
  open,
  close,
  onAdd,
  onSave,
  isEdit,
  data,
}: NewCategoryProps) => {
  const [form] = Form.useForm();

  const clearAll = () => {
    form.resetFields();
    close();
  };
  useEffect(() => {
    if (isEdit && data != undefined) form.setFieldsValue(data);
  }, [data, open, isEdit]);

  return (
    <Modal
      open={open}
      onCancel={clearAll}
      afterClose={clearAll}
      title={
        <Typography.Title level={2}>
          {isEdit ? "Update Category" : "Add New Category"}
        </Typography.Title>
      }
      footer={null}
      closable={false}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(val) => {
          if (isEdit) onSave({ ...val, _id: data?._id });
          else onAdd(val);
        }}
      >
        <Form.Item
          name="category"
          label="Category"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
          tooltip={{
            title:
              isEdit && ["Yearly Due", "Monthly Due"].includes(data.category)
                ? "Cannot edit a Monthly or Yearly Due Name"
                : "",
          }}
        >
          <Input
            size="large"
            disabled={
              isEdit && ["Yearly Due", "Monthly Due"].includes(data.category)
            }
          />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Monthly/Yearly Due", value: "due" },
              { label: "Service/Rental", value: "service" },
            ]}
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} size="large" />
        </Form.Item>
        <Form.Item
          name="fee"
          label="Fixed Fee"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <InputNumber
            prefix="₱"
            style={{ width: "100%" }}
            min={0}
            size="large"
            formatter={(value: any) =>
              value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          initialValue="active"
          rules={[{ required: true }]}
        >
          <Select
            defaultValue="active"
            size="large"
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "Inactiveactive" },
            ]}
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            block
            style={{ fontSize: "2em", height: 60 }}
          >
            {isEdit ? "UPDATE" : "ADD"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewCategory;
