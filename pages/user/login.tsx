import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Alert,
  message,
  Image,
  Flex,
  Typography,
} from "antd";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import {
  MailOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { FaLocationPin } from "react-icons/fa6";

import { verify } from "@/assets/js";
import {
  AuthService,
  UtilService,
  UserService,
  TreasurerService,
  RegistrationService,
} from "@/services";
import { useUserStore, useAuthStore } from "@/services/context";
import { Staff, Treasurer, User, UserType } from "@/types";

// TODO:  board of director, otherwise create each one of them

const Login = ({ private_key }: { private_key: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: "" });
  const [form] = Form.useForm();
  const auth = new AuthService();
  const util = new UtilService();
  const user = new UserService();
  const treasurer = new TreasurerService();
  const register = new RegistrationService();

  const { setUser } = useUserStore();
  const { setAccessToken } = useAuthStore();

  const login = async (val: any) => {
    let res = await auth.login(val);
    if (!res.success) {
      setError({
        isError: true,
        errorMessage: res?.message ?? "Error in the server.",
      });
    } else {
      try {
        let currentUser = await verify(res?.data?.token!, private_key);
        setAccessToken(res.data?.token!);
        setUser(currentUser);
        Cookies.set("token", res.data?.token!);
        window.location.reload();
      } catch (e) {
        console.log(e);
        message.error("Error in the login");
      }
    }
  };

  const createStakeholder = async (type: string) => {
    let username = "";
    let password = await bcrypt.hash(
      "password",
      8
    ); /* await bcrypt.hash(passwordGenerator(), 8); */
    let stakeholder: Staff | Treasurer | null = null;

    switch (type) {
      case "staff": {
        username = "staff-01";
        stakeholder = {
          name: "Staff 1",
          role: "admin",
        };
        break;
      }

      case "treasurer": {
        username = "treasurer-01";
        stakeholder = {
          account_balance: 0,
          name: "Treasurer-01",
        };
        break;
      }

      case "bod": {
        return;
      }
    }

    if (username != "" && stakeholder != null) {
      let _;
      if (type == "treasurer")
        _ = await treasurer.newTreasurer(stakeholder as Treasurer);
      else _ = await register.newStaff(stakeholder as Staff);

      let newUser: User = {
        username,
        password,
        type: type as UserType,
        [`${type}Id`]: _?.data?._id,
      };

      let res = await user.createUser(newUser);
      if (res.success)
        message.success(
          "Successfully initiated account for Staff, Treasurer and Board of Director"
        );
      else message.error("There is error on creation of initial stakeholders");
    }
  };

  useEffect(() => {
    // check stakeholders
    (async (_) => {
      let res = await _.checkStakeholders();
      if (res.success) {
        if (res.data) {
          Object.keys(res.data).map((e) => {
            if (!(res.data as any)[e]) createStakeholder(e);
          });
        }
      } else {
        message.error("There is an error on checking api");
      }
    })(util);
  }, []);

  return (
    <div
      className="login-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      <Typography.Link
        href="https://maps.app.goo.gl/dvLtzgaJh9DynasBA"
        target="_blank"
        className="login-location-text"
        style={{
          position: "absolute",
          display: "flex",
          gap: 5,
          left: 5,
          top: 5,
          color: "#fff",
          fontSize: "1.15em",
        }}
      >
        <FaLocationPin style={{ marginTop: 3 }} />
        945: Masterson Ave, Cagayan de Oro, Philippines
      </Typography.Link>
      <Flex justify="center" align="center" vertical>
        {/* flag: Login Image */}
        <Image
          preview={false}
          src="/web-logo.jpg"
          width={200}
          style={{
            borderRadius: "100%",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
          }}
        />
        <span
          style={{
            fontFamily: "abel",
            fontSize: "2em",
            color: "#fff",
            textShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          Welcome to VVVHOA Portal Login Portal
        </span>
      </Flex>
      <Card
        style={{
          width: "25vw",
          minHeight: "40vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        styles={{
          body: {
            padding: "2.5em",
          },
        }}
        hoverable
      >
        {error.isError && (
          <Alert
            type="warning"
            message={error.errorMessage}
            closable
            afterClose={() => setError({ isError: false, errorMessage: "" })}
            showIcon
          />
        )}

        <Form
          layout="vertical"
          style={{ marginTop: 20 }}
          className="myCustomForm"
          form={form}
          onFinish={login}
        >
          <Form.Item
            label="Email / Username"
            name="username"
            style={{ marginBottom: 10 }}
          >
            <Input
              size="large"
              styles={{
                input: {
                  fontFamily: "Abel",
                },
              }}
              addonAfter={<MailOutlined />}
              autoFocus
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              size="large"
              type={showPassword ? "text" : "password"}
              styles={{
                input: {
                  fontFamily: "Abel",
                },
              }}
              addonAfter={
                showPassword ? (
                  <EyeOutlined
                    onClick={() => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => {
                      setShowPassword(true);
                    }}
                  />
                )
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                fontFamily: "abel",
                background: "#3056D3",
                color: "#fff",
              }}
              size="large"
              htmlType="submit"
              block
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <span
          style={{
            fontFamily: "Abel",
            color: "#64748B",
            display: "block",
            textAlign: "center",
          }}
        >
          Don't have any account? Please Contact Staff
        </span>
      </Card>
    </div>
  );
};

Login.getInitialProps = () => {
  return {
    private_key: process.env.JWT_PRIVATE_KEY,
  };
};

export default Login;
