import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import { UserService } from "@/services";

import NewHomeOwner from "./components/new_homeowner";

const HomeOwner = () => {
  const [openNewHomeowner, setOpenNewHomeowner] = useState(false);
  const [users, setUsers] = useState([]);

  const user = new UserService();

  const columns = [
    {
      title: "Name",
      render: (_: any, row: any) =>
        `${row?.homeownerId?.name} ${row?.homeownerId?.lastname}`,
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Contact Number",
      render: (_: any, row: any) =>
        row?.homeownerId ? (
          row?.homeownerId?.phone
        ) : (
          <Typography.Text type="secondary" italic>
            Not Set
          </Typography.Text>
        ),
    },
    {
      title: "Status",
      render: (_: any, row: any) =>
        row?.homeownerId ? (
          <Tag color={row?.homeownerId?.status == "active" ? "green" : "red"}>
            {row?.homeownerId?.status}
          </Tag>
        ) : (
          <Typography.Text type="secondary" italic>
            Not Set
          </Typography.Text>
        ),
    },
    {
      title: "Functions",
      align: "center",
      render: (_: any, row: any) => (
        <Space>
          <Tooltip title="View">
            <Button icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button icon={<DeleteOutlined />} danger />
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    (async (_) => {
      let res = await _.getUsers("homeowner");
      if (res.success) {
        setUsers(res?.data?.users);
      }
    })(user);
  }, [openNewHomeowner]);

  return (
    <Spin spinning={user.loaderHas("fetch-user")}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Input
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          placeholder="Search homeowner..."
        />
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={() => setOpenNewHomeowner(true)}
        >
          Add New Homeowner
        </Button>
      </div>
      <div
        style={{
          marginTop: 10,
        }}
      >
        <label htmlFor="status" style={{ marginRight: 5 }}>
          Filter:{" "}
        </label>
        <Select
          id="status"
          defaultValue="active"
          style={{ width: 90 }}
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
      </div>
      <Table
        dataSource={users}
        // @ts-ignore
        columns={columns}
        style={{
          marginTop: 10,
        }}
      />
      {/* context */}

      <NewHomeOwner
        open={openNewHomeowner}
        close={() => setOpenNewHomeowner(false)}
      />
    </Spin>
  );
};

export default HomeOwner;
