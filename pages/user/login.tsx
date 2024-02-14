import React, { useState } from "react";
import { Form, Input, Button, Card, Alert, message } from "antd";
import {
  MailOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";

import AuthService from "@/services/auth.service";
import { verify } from "@/assets/js";
import { useUserStore, useAuthStore } from "@/services/context";

const Login = ({ private_key }: { private_key: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: "" });
  const [form] = Form.useForm();
  const auth = new AuthService();

  const { setUser } = useUserStore();
  const { setAccessToken } = useAuthStore();

  const login = async (val: any) => {
    let res = await auth.login(val);
    if (!res.success) {
      setError({
        isError: true,
        errorMessage: res.data?.message ?? "Error in the server.",
      });
    } else {
      try {
        let currentUser = await verify(res?.data?.token, private_key);
        setAccessToken(res.data?.token);
        setUser(currentUser);
        Cookies.set("token", res.data?.token);
        window.location.reload();
      } catch (e) {
        console.log(e);
        message.error("Error in the login");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "60vw",
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        hoverable
      >
        <span
          style={{ fontFamily: "abel", fontSize: "1.8em", color: "#212B36" }}
        >
          Sign In to Vista Verde Village
        </span>
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
            label="Email/Username"
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
