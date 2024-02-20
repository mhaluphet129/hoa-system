import React, { useState } from "react";
import {
  Steps,
  Modal,
  Space,
  Button,
  Form,
  Input,
  Divider,
  DatePicker,
  Select,
  message,
  Typography,
  InputNumber,
} from "antd";
import dayjs from "dayjs";
import { MailOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { NewHomeownerCardProps } from "@/types";
import { RegistrationService, UserService } from "@/services";

// TODO: no age on immediate family

const NewHomeOwner = ({ open, close }: NewHomeownerCardProps) => {
  const [step, setStep] = useState(0);
  const [userId, setUserId] = useState("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const resetStep = () => setStep(0);

  const [stepFlag, setStepFlag] = useState({
    step1: false,
    step2: false,
  });

  const register = new RegistrationService();
  const user = new UserService();

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [tempForm] = Form.useForm();

  const [imm, setImm] = useState<Record<any, any>[]>([]);

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
    } else if (step == 1) {
      return (
        <Space>
          <Button onClick={prevStep}>Prev</Button>
          <Button
            type="primary"
            onClick={async () => {
              await form2.validateFields().then(() => form1.submit());
            }}
          >
            Next
          </Button>
        </Space>
      );
    } else
      return (
        <Space>
          <Button onClick={prevStep}>Prev</Button>
          <Button
            type="primary"
            onClick={async () => {
              await form3.validateFields().then(() => form3.submit());
            }}
          >
            Save & Close
          </Button>
        </Space>
      );
  };

  const handleInitialRegistration = async (val: any) => {
    if (!stepFlag.step1) {
      await register.newHomeOwner(val).then((e: any) => {
        console.log(e);
        if (e.success) {
          setStepFlag({ ...stepFlag, step1: true });
          setUserId(e?.data?.data?.userId);
          message.success("Succesfully created and emailed the credentials");
          nextStep();
        } else {
          message.error("Error in the server");
        }
      });
    } else nextStep();
  };

  const handleInitialRegistration2 = async (val: any) => {
    if (!stepFlag.step2) {
      await register.updateHomeowner({ ...val, id: userId }).then((e) => {
        if (e.success) {
          setStepFlag({ ...stepFlag, step2: true });
          nextStep();
        } else {
          message.error("Error in the server");
        }
      });
    } else nextStep();
  };

  const handleInitialRegistration3 = async (val: any) => {
    await user.updateUser({ ...val, id: userId }).then((e) => {
      setStep(0);
      form1.resetFields();
      form2.resetFields();
      form3.resetFields();
      setStepFlag({ step1: false, step2: false });
      close();
    });
  };

  const getBodyByStep = () => {
    if (step == 0) {
      return (
        <Form
          layout="vertical"
          className="MyForm"
          form={form1}
          onFinish={handleInitialRegistration}
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
              label="Home Number"
              name="homeNumber"
              rules={[
                {
                  required: true,
                  message: "Home Number is empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Move In Date"
              name="move_in_date"
              initialValue={dayjs()}
            >
              <DatePicker format="MMM/DD/YYYY" defaultValue={dayjs()} />
            </Form.Item>
          </Space>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Email is empty" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  const email = getFieldValue("email");
                  if (reg.test(email)) return Promise.resolve("");
                  else if (email == "") return Promise.resolve();
                  else return Promise.reject("Invalid email");
                },
              }),
            ]}
          >
            <Input prefix={<MailOutlined />} style={{ width: 250 }} />
          </Form.Item>
        </Form>
      );
    } else if (step == 1) {
      return (
        <Form
          layout="vertical"
          className="MyForm"
          form={form2}
          onFinish={handleInitialRegistration2}
        >
          <Space>
            <Form.Item
              label="Employers Name/Business Name"
              name="businessName"
              rules={[
                {
                  required: true,
                  message: "This is empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Years in Business/Current Employer"
              name="currentEmployer"
              rules={[
                {
                  required: true,
                  message: "This is empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Space>
          <Space>
            <Form.Item
              label="Partner/Spouse Name"
              name="spouseName"
              rules={[
                {
                  required: true,
                  message: "This is empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Partner/Spouse Mobile Number"
              name="spouseNumber"
              rules={[
                {
                  required: true,
                  message: "This is empty",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const reg = /^(09\d{9})|\+(\d{12})$/;
                    const number = getFieldValue("spouseNumber");
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
          </Space>
          <Form.Item
            label="Nature of Business or Position at work"
            name="workPosition"
            rules={[
              {
                required: true,
                message: "This is empty",
              },
            ]}
          >
            <Input
              style={{
                width: 300,
              }}
            />
          </Form.Item>
        </Form>
      );
    } else
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 50,
          }}
        >
          <div style={{ width: "55%" }}>
            <Typography.Text>
              Names and ages of all immidiate family members moving into VVV:
            </Typography.Text>
            <Form
              form={tempForm}
              onFinish={(e: any) => {
                setImm([...imm, { name: e.name, age: e.age }]);
                tempForm.resetFields();
              }}
            >
              <Space
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                  }}
                >
                  <label htmlFor="name">Name</label>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Name is empty",
                      },
                    ]}
                  >
                    <Input style={{ width: 200 }} id="name" />
                  </Form.Item>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                >
                  <label htmlFor="age">Age</label>
                  <Form.Item
                    name="age"
                    rules={[
                      {
                        required: true,
                        message: "Age is empty",
                      },
                    ]}
                  >
                    <InputNumber style={{ width: 70 }} id="age" min={1} />
                  </Form.Item>
                </div>
                <Button
                  style={{ marginTop: 10 }}
                  type="primary"
                  onClick={async () => {
                    await tempForm
                      .validateFields()
                      .then(() => tempForm.submit());
                  }}
                >
                  ADD
                </Button>
              </Space>
              <Space direction="vertical">
                {imm.map((e, i) => (
                  <Space key={`immediate-${i}`}>
                    <Button
                      icon={
                        <MinusCircleOutlined
                          style={{
                            fontSize: "1.5em",
                            color: "#f00",
                          }}
                        />
                      }
                      type="text"
                      onClick={(e) =>
                        setImm(imm.filter((_) => imm.indexOf(_) != i))
                      }
                    />
                    <Typography.Text>{e.name}</Typography.Text>
                  </Space>
                ))}
              </Space>
            </Form>
          </div>
          <div style={{ width: "45%" }}>
            <Form
              layout="vertical"
              form={form3}
              onFinish={handleInitialRegistration3}
            >
              <Form.Item
                label="Username/Email"
                name="username"
                rules={[{ required: true, message: "Username is empty" }]}
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
          </div>
        </div>
      );
  };

  return (
    <Modal
      title="New Home Owner registration"
      open={open}
      width={900}
      onCancel={() => {
        setStep(0);
        form1.resetFields();
        form2.resetFields();
        form3.resetFields();
        setStepFlag({ step1: false, step2: false });
        close();
      }}
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
          onChange={(e) => setStep(e)}
          items={[
            {
              title: "Personal",
            },
            {
              title: "Business and Partner",
            },
            {
              title: "Credentials and Immediate Family",
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
