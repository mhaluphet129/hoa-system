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
} from "antd";
import { MailOutlined } from "@ant-design/icons";

import { NewHomeownerCardProps } from "@/types";
import { RegistrationService, UserService } from "@/services";

const NewHomeOwner = ({ open, close }: NewHomeownerCardProps) => {
  const [step, setStep] = useState(0);
  const [hoEmail, setHoEmail] = useState("");
  const [hoId, setHoId] = useState("");

  const nextStep = () => setStep(step + 1);

  const register = new RegistrationService();
  const user = new UserService();

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const cls = () => {
    console.log("form cleared");
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
        <Button
          type="primary"
          onClick={async () => {
            await form2.validateFields().then(() => form2.submit());
          }}
        >
          Save & Close
        </Button>
      );
  };

  const handleNewUser = async (val: any) => {
    await user.createUser({ ...val, type: "homeowner" }).then((e) => {
      if (e.success) {
        setHoEmail(val.email);
        setHoId(e?.data?._id);
        message.success(
          "Succesfully created initital account and emailed the credentials"
        );
        nextStep();
      } else message.error("Error in the server");
    });
  };

  const handleUpdateUser = async (val: any) => {
    val.emai = hoEmail;
    await register.newHomeOwner(val).then(async (e) => {
      console.log(e);

      await user
        .updateUser({ id: hoId, homeownerId: e.data?._id })
        .then((_) => {
          if (_.success) {
            message.success("Succesfully updated");
            cls();
          } else {
            message.error("Error in the server");
          }
        });
    });
  };

  const getBodyByStep = () => {
    if (step == 0) {
      return (
        <Form layout="vertical" form={form1} onFinish={handleNewUser}>
          <Form.Item
            label="Email"
            name="username"
            rules={[
              { required: true, message: "Email is empty" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  const email = getFieldValue("username");
                  if (reg.test(email)) return Promise.resolve("");
                  else if (email == "") return Promise.resolve();
                  else return Promise.reject("Invalid email");
                },
              }),
            ]}
          >
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
          onFinish={handleUpdateUser}
        >
          <Space>
            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Last Name is blank.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="First Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Last Name is blank.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Middle Name (Optional)" name="middlename">
              <Input />
            </Form.Item>
            <Form.Item label="Type of Member" name="type" initialValue="owner">
              <Select
                options={[
                  {
                    label: "Owner",
                    value: "owner",
                  },
                  {
                    label: "Renter",
                    value: "renter",
                  },
                ]}
              />
            </Form.Item>
          </Space>
          <Space
            style={{
              alignItems: "start",
            }}
          >
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
              <Input />
            </Form.Item>
            <Form.Item
              label="Home Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Home Address is empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Space>
        </Form>
      );
  };

  return (
    <Modal
      title="New Home Owner registration"
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
