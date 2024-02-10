import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import {
  MailOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
          height: "50vh",
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
        <Form
          layout="vertical"
          style={{ marginTop: 35 }}
          className="myCustomForm"
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

export default Login;
