import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
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
  }, [data]);

  return (
    <Modal
      open={open}
      onCancel={clearAll}
      afterClose={clearAll}
      title={isEdit ? "Update Category" : "Add New Category"}
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
        >
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Monthly/Yearly Due", value: "due" },
              { label: "Service/Rental", value: "service" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          style={{ marginBottom: 5 }}
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} />
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
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "Inactiveactive" },
            ]}
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button size="large" type="primary" htmlType="submit" block>
            {isEdit ? "UPDATE" : "ADD"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewCategory;
