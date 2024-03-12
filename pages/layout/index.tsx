import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography, Affix, Dropdown, Avatar } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { GetServerSideProps } from "next";
import Cookies from "js-cookie";

import { SiderProps, ContentProps, Staff, Homeowner, User } from "@/types";
import { useAuthStore } from "@/services/context";
import { verify } from "@/assets/js";

import { useUserStore } from "@/services/context/user.context";
import { UtilService } from "@/services";

const Sider = ({ selectedIndex, selectedKey, items }: SiderProps) => {
  return (
    <Affix>
      <Layout.Sider
        theme="dark"
        style={{
          boxShadow: "2px 0 1px -2px #888",
          backgroundColor: "#1C2434",
        }}
      >
        <Typography
          style={{
            color: "#fff",
            fontFamily: "Abhaya Libre",
            textAlign: "center",
            fontSize: "3em",
            marginBottom: 40,
            marginTop: 10,
          }}
        >
          VVVHOA
        </Typography>
        <Menu
          onClick={selectedIndex}
          selectedKeys={selectedKey}
          items={items}
          defaultSelectedKeys={["dashboard"]}
          style={{
            height: "100vh",
            fontSize: 17,
            background: "#1C2434",
          }}
        />
      </Layout.Sider>
    </Affix>
  );
};

const Header = () => {
  const { currentUser } = useUserStore();
  const util = new UtilService();
  const [user, setUser] = useState<User>();

  const getName = (): string => {
    switch (user?.type) {
      case "homeowner": {
        return `${user?.homeownerId?.name} ${user?.homeownerId?.lastname}`;
      }
      case "staff": {
        return user?.staffId?.name ?? "";
      }
      case "treasurer": {
        return "Treasurer no name";
      }

      case "bod": {
        return "BOD no name";
      }
    }

    return "N/A";
  };

  useEffect(() => {
    (async (_) => {
      let res = await _.getStakeholder(currentUser?._id!, currentUser?.type!);
      if (res.success) setUser(res.data as User);
    })(util);
  }, []);

  return (
    <Affix>
      <Layout.Header
        style={{
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          height: 60,
          width: "100%",
          paddingInline: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Text style={{ marginRight: 10, textAlign: "end" }}>
              {getName()}
            </Typography.Text>
            <Typography.Text
              type="secondary"
              style={{ marginRight: 10, textAlign: "end" }}
            >
              {user?.type?.toLocaleUpperCase()}
            </Typography.Text>
          </div>
          <Dropdown
            menu={{
              items: [
                {
                  label: "Edit Profile",
                  key: "edit",
                  // onClick: () =>
                  //   setOpenEditModal({
                  //     open: true,
                  //     data: JSON.parse(user),
                  //   }),
                },
                {
                  type: "divider",
                },
                {
                  label: (
                    <div style={{ color: "#ff0000" }}>
                      logout <LogoutOutlined />
                    </div>
                  ),
                  key: "3",
                  onClick: () => {
                    Cookies.remove("token");
                    window.location.reload();
                  },
                },
              ],
            }}
            trigger={["click"]}
          >
            <Avatar
              icon={<UserOutlined />}
              size={40}
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </div>
      </Layout.Header>
    </Affix>
  );
};

const Content = ({ selectedKey, children }: ContentProps) => {
  return (
    <div
      style={{
        backgroundColor: "#eee",
        height: "100%",
        padding: "10px",
        overflow: "scroll",
      }}
    >
      <PageHeader
        title={
          <span style={{ fontFamily: "Abel" }}>
            {selectedKey.toString().toUpperCase()}
          </span>
        }
      >
        {children}
      </PageHeader>
    </div>
  );
};

const Footer = () => {
  return (
    <Layout.Footer
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#aaa",
      }}
    >
      <Typography.Title level={5} style={{ marginTop: 10 }}></Typography.Title>
    </Layout.Footer>
  );
};

export default function MyLayout() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = useAuthStore();

  try {
    if (accessToken) {
      await verify(accessToken, process.env.JWT_PRIVATE_KEY!);
      return { props: {} };
    } else {
      throw new Error("No bearer token");
    }
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        permanent: false,
        destination: "/user/login",
      },
      props: {},
    };
  }
};

export { Sider, Header, Content, Footer };
