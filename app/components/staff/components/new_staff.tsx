import React, { useState } from "react";
import {
  Steps,
  Modal,
  Space,
  Button,
  Form,
  Input,
  Divider,
  Select,
  message,
  Typography,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import bcrypt from "bcryptjs";

import { NewStaffCardProps, Staff } from "@/types";
import { RegistrationService, UserService } from "@/services";

const NewHomeOwner = ({ open, close, refresh }: NewStaffCardProps) => {
  const [step, setStep] = useState(0);
  const [staffId, setStaffId] = useState("");

  const [form2Input, setForm2Input] = useState({
    name: "",
    number: "",
  });

  const nextStep = () => setStep(step + 1);

  const register = new RegistrationService();
  const user = new UserService();

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const cls = () => {
    setStep(0);
    form1.resetFields();
    form2.resetFields();
    close();
  };

  const getFooter = () => {
    if (step == 0) {
      return (
        <Button
          type="primary"
          loading={register.loaderHas("register")}
          onClick={async () => {
            await form1.validateFields().then(() => form1.submit());
          }}
        >
          Next
        </Button>
      );
    } else
      return (
        <Button type="primary" onClick={handleUpdateUser}>
          Save & Close
        </Button>
      );
  };

  const handleNewUser = async (val: any) => {
    val.password = await bcrypt.hash(val.password, 8);
    await user.createUser({ ...val, type: "staff" }).then((e) => {
      if (e.success) {
        if (e?.data?._id) setStaffId(e?.data?._id);
        refresh();
        message.success(
          "Succesfully created initital account and emailed the credentials"
        );
        nextStep();
      } else message.error(e?.message ?? "Error in the Server");
    });
  };

  const handleUpdateUser = async () => {
    let val: Staff = {
      name: form2Input.name,
      phone: form2Input.number,
      role: "admin",
    };

    await register
      .newStaff(val)
      .then(async (e) => {
        await user
          .updateUser({ id: staffId, staffId: e.data?._id ?? "" })
          .then((_) => {
            if (_.success) {
              refresh();
              message.success("Succesfully updated");
              cls();
            } else {
              message.error("Error in the server");
            }
          });
      })
      .catch((e) => {});
  };

  const getBodyByStep = () => {
    if (step == 0) {
      return (
        <Form layout="vertical" form={form1} onFinish={handleNewUser}>
          <Form.Item label="Username" name="username">
            <Input
              suffix={<MailOutlined />}
              size="large"
              style={{
                width: 300,
              }}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is empty" }]}
          >
            <Input.Password
              suffix={<MailOutlined />}
              size="large"
              style={{
                width: 300,
              }}
            />
          </Form.Item>
          <Form.Item label="Status" name="status" initialValue="active">
            <Select
              options={[
                {
                  label: "Active",
                  value: "active",
                },
                {
                  label: "Inactive",
                  value: "inactive",
                },
              ]}
            />
          </Form.Item>
        </Form>
      );
    } else
      return (
        <Form
          layout="vertical"
          className="MyForm"
          form={form2}
          // onFinish={handleUpdateUser}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Name is blank.",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setForm2Input({ ...form2Input, name: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Phone is empty" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const reg = /^(09\d{9})|\+(\d{12})$/;
                  const number = getFieldValue("phone");
                  if (/^09/.test(number) && number.length > 11) {
                    return Promise.reject(
                      "Number should have a maximum length of 11"
                    );
                  } else if (/^\+639/.test(number) && number.length > 13) {
                    return Promise.reject(
                      "Number should have a maximum length of 12"
                    );
                  } else if (reg.test(number) || number == "") {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      "It should be start in 09 or +639, maximum of 11 digits."
                    );
                  }
                },
              }),
            ]}
          >
            <Input
              onChange={(e) => {
                setForm2Input({ ...form2Input, number: e.target.value });
              }}
            />
          </Form.Item>
        </Form>
      );
  };

  return (
    <Modal
      title={
        <Typography.Title level={2}>New Staff Registration</Typography.Title>
      }
      open={open}
      width={900}
      onCancel={cls}
      style={{
        overflow: "scroll",
      }}
      footer={getFooter()}
    >
      <Space
        style={{
          alignItems: "start",
          width: "100%",
        }}
      >
        <Steps
          direction="vertical"
          size="small"
          current={step}
          style={{
            width: 120,
          }}
          items={[
            {
              title: "Credentials",
            },
            {
              title: "Personal Details",
            },
          ]}
        />
        <Divider type="vertical" style={{ height: 350 }} />
        {getBodyByStep()}
      </Space>
    </Modal>
  );
};

export default NewHomeOwner;
