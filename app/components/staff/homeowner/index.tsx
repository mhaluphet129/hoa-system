import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Input,
  Popconfirm,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
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
import { User } from "@/types";

const HomeOwner = () => {
  const [openNewHomeowner, setOpenNewHomeowner] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  const user = new UserService();

  const columns = [
    {
      title: "Name",
      render: (_: any, row: any) =>
        row?.homeownerId ? (
          `${row?.homeownerId?.name} ${row?.homeownerId?.lastname}`
        ) : (
          <Typography.Text type="secondary" italic>
            Not Set
          </Typography.Text>
        ),
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
      dataIndex: "status",
      render: (status: any) =>
        status ? (
          <Tag color={status == "active" ? "green" : "red"}>
            <Badge
              color={status == "active" ? "green" : "red"}
              style={{ marginRight: 5 }}
            />{" "}
            {status}
          </Tag>
        ) : (
          <Typography.Text type="secondary" italic>
            Not Set
          </Typography.Text>
        ),
    },
    {
      title: "Functions",
      dataIndex: "_id",
      align: "center",
      render: (_: any) => (
        <Space>
          <Tooltip title="View">
            <Button icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this homeowner?"
              okText="Delete"
              okType="danger"
              onConfirm={() => handleDelete(_)}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    (async (_) => {
      let res = await _.removeHomeOwner(id);
      if (res.success) {
        message.success(res.message ?? "Success");
        setTrigger(trigger + 1);
      }
    })(user);
  };

  useEffect(() => {
    (async (_) => {
      let res = await _.getUsers("homeowner");
      if (res.success) {
        setUsers(res?.data ?? []);
      }
    })(user);
  }, [openNewHomeowner, trigger]);

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
        rowKey={(e) => e._id ?? "iser"}
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
