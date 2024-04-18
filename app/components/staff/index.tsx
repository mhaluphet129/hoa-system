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

import NewStaff from "./components/new_staff";
import { User } from "@/types";

const Staff = () => {
  const [openNewStaff, setOpenNewStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [trigger, setTrigger] = useState(0);

  const user = new UserService();

  const columns: TableProps<User>["columns"] = [
    {
      title: "Name",
      render: (_: any, row: any) =>
        row?.staffId ? (
          row?.staffId?.name
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
        row?.staffId ? (
          row?.staffId?.phone
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
                setSelectedStaff(user);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this staff?"
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
    // todo: remove staff not homeowner
    (async (_) => {
      let res = await _.removeStaff(id);
      if (res.success) {
        message.success(res.message ?? "Success");
        setTrigger(trigger + 1);
      }
    })(user);
  };

  useEffect(() => {
    (async (_) => {
      let res = await _.getUsers("staff");
      if (res?.success ?? false) {
        console.log(res?.data);
        setUsers(res?.data ?? []);
      }
    })(user);
  }, [setOpenNewStaff, trigger]);

  return (
    <Spin spinning={user.loaderHas("fetch-user")}>
      {selectedStaff ? (
        <></>
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
              onClick={() => setOpenNewStaff(true)}
            >
              Add New Staff
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
            rowKey={(e) => e._id ?? "iser"}
          />
        </>
      )}

      {/* context */}
      <NewStaff
        open={openNewStaff}
        close={() => setOpenNewStaff(false)}
        refresh={() => setTrigger(trigger + 1)}
      />
    </Spin>
  );
};

export default Staff;
