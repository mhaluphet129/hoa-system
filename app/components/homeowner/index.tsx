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
  TableProps,
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
import HOTransacDetails from "./components/homeowner_transaction_details";

const HomeOwner = ({
  setKey,
  customKey,
}: {
  setKey: any;
  customKey: string;
}) => {
  const [openNewHomeowner, setOpenNewHomeowner] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [trigger, setTrigger] = useState(0);

  const user = new UserService();

  const columns: TableProps<User>["columns"] = [
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
      align: "center",
      render: (_, user) => (
        <Space>
          <Tooltip title="View">
            <Button
              icon={<EyeOutlined />}
              onClick={() => {
                setKey(
                  user.homeownerId
                    ? `homeowner / ${
                        user.homeownerId?.name +
                        " " +
                        user.homeownerId?.lastname
                      }`
                    : "homeowner / No Name"
                );
                setSelectedUser(user);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this homeowner?"
              okText="Delete"
              okType="danger"
              onConfirm={() => handleDelete(user?._id ?? "")}
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

  useEffect(() => {
    if (customKey == "homeowner") setSelectedUser(null);
  }, [customKey]);

  return (
    <Spin spinning={user.loaderHas("fetch-user")}>
      {selectedUser ? (
        <HOTransacDetails
          user={selectedUser}
          goBack={() => setKey("homeowner")}
        />
      ) : (
        <>
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
            columns={columns}
            style={{
              marginTop: 10,
            }}
            rowKey={(e) => e._id ?? "user"}
            onRow={(data) => {
              return {
                onClick: () => {
                  setKey(
                    data.homeownerId
                      ? `homeowner / ${
                          data.homeownerId?.name +
                          " " +
                          data.homeownerId?.lastname
                        }`
                      : "homeowner / No Name"
                  );
                  setSelectedUser(data);
                },
              };
            }}
          />
        </>
      )}

      {/* context */}
      <NewHomeOwner
        open={openNewHomeowner}
        close={() => setOpenNewHomeowner(false)}
      />
    </Spin>
  );
};

export default HomeOwner;
