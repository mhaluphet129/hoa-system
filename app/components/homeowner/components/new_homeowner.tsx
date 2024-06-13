import React, { useEffect, useState } from "react";
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
  Row,
  Col,
  DatePicker,
  Typography,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";

import { NewHomeownerCardProps } from "@/types";
import { RegistrationService, UserService } from "@/services";

const NewHomeOwner = ({ open, close, user }: NewHomeownerCardProps) => {
  const [step, setStep] = useState(0);
  const [hoEmail, setHoEmail] = useState("");
  const [hoId, setHoId] = useState("");

  const nextStep = () => setStep(step + 1);

  const register = new RegistrationService();
  const userService = new UserService();

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
          onClick={async () => {
            await form1.validateFields().then(() => form1.submit());
          }}
        >
          {user ? "UPDATE" : "NEXT"}
        </Button>
      );
    } else
      return (
        <Button
          type="primary"
          onClick={async () =>
            await form2.validateFields().then(() => form2.submit())
          }
        >
          {user ? "UPDATE" : "Save & Close"}
        </Button>
      );
  };

  const handleNewUser = async (val: any) => {
    if (user) {
      let obj = {
        username: form1.getFieldValue("username"),
        password: "",
      };

      if (!["", null, undefined].includes(form1.getFieldValue("password"))) {
        obj.password = await bcrypt.hash(form1.getFieldValue("password"), 8);
      }

      if (obj.password == "") delete (obj as any).password;
      await userService.updateUser(user?._id ?? "", obj).then((e) => {
        if (e.success) {
          message.success(e.message ?? "Success");
        }
      });
      return;
    }

    val.password = await bcrypt.hash(val.password, 8);
    await userService.createUser({ ...val, type: "homeowner" }).then((e) => {
      if (e.success) {
        setHoEmail(val.username);
        if (e?.data?._id) setHoId(e?.data?._id);
        message.success(
          "Succesfully created initital account and emailed the credentials"
        );
        nextStep();
      } else message.error(e?.message ?? "Error in the Server");
    });
  };

  const handleUpdateUser = async (aga: any) => {
    if (user) {
      await register
        .updateHomeowner(user?.homeownerId?._id ?? "", form2.getFieldsValue())
        .then((e) => {
          message.success(e.message);
        });
      return;
    }

    await register
      .newHomeOwner(aga)
      .then(async (e) => {
        await userService
          .updateUser(hoId, { homeownerId: e.data?._id ?? "" })
          .then((_) => {
            if (_.success) {
              message.success("Succesfully updated");
              cls();
            } else {
              message.error("Error in the server");
            }
          });
      })
      .catch((e) => {});
  };

  const handleNewHomeowner = async () =>
    await form2.validateFields().then((e) => handleUpdateUser(e));

  const getBodyByStep = () => {
    return (
      <>
        <Form
          layout="vertical"
          form={form1}
          onFinish={handleNewUser}
          style={{ display: step == 0 ? "block" : "none" }}
        >
          <Row gutter={[32, 32]}>
            <Col span={12}>
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
                rules={[
                  {
                    required: user ? false : true,
                    message: "Password is empty",
                  },
                ]}
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
            </Col>
          </Row>
        </Form>
        <Form
          layout="vertical"
          className="MyForm"
          form={form2}
          onFinish={handleNewHomeowner}
          style={{ display: step == 1 ? "block" : "none" }}
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
                  message: "First Name is blank.",
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
          <Typography.Title level={3}>Due Dates</Typography.Title>
          <Form.Item
            label="Yearly Due"
            name="yearlyDueDate"
            rules={[{ required: true, message: "Yearly Due is empty" }]}
          >
            <DatePicker
              size="large"
              format="MMMM DD, YYYY"
              style={{
                width: 300,
              }}
            />
          </Form.Item>
          <Form.Item
            label="Monthly Due"
            name="monthlyDueDate"
            rules={[{ required: true, message: "Monthly Due is empty" }]}
          >
            <DatePicker
              size="large"
              format="MMMM DD, YYYY"
              style={{
                width: 300,
              }}
            />
          </Form.Item>
        </Form>
      </>
    );
  };

  useEffect(() => {
    if (step == 0) form1.setFieldsValue({ ...user, password: null });
    if (step == 1)
      form2.setFieldsValue({
        ...user?.homeownerId,
        yearlyDueDate: dayjs(user?.homeownerId?.yearlyDueDate),
        monthlyDueDate: dayjs(user?.homeownerId?.monthlyDueDate),
      });
  }, [step, open]);

  return (
    <Modal
      title={
        <Typography.Title level={4}>
          {user ? "Update Homeowner" : "New Home Owner registration"}
        </Typography.Title>
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
          onChange={user ? setStep : undefined}
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
