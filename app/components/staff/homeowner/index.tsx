import React, { useEffect, useState } from "react";
import { Button, Input, Select, Spin, Table } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

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
        `${row?.homeownerId.name} ${row?.homeownerId.lastname}`,
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Contact Number",
      render: (_: any, row: any) => row?.homeownerId?.phone,
    },
    {
      title: "Status",
      render: (_: any, row: any) => row?.homeownerId?.status,
    },
    {
      title: "Functions",
    },
  ];

  useEffect(() => {
    (async (_) => {
      let res = await _.getUsers("homeowner");
      console.log(res);
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
