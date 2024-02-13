import React, { useState } from "react";
import { Select, Button, Table, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import jason from "@/assets/json/constants.json";

import StaffNewAnnouncement from "./components/new_announcement";

const StaffAnnouncement: React.FC = () => {
  const [openNewAnnouncement, setOpenNewAnnouncement] = useState(false);
  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const columns = [
    {
      title: "Title",
    },
    {
      title: "Description",
    },
    {
      title: "Date Created",
      render: (_: any, row: any) =>
        dayjs(row?.createdAt).format("MMM DD, YYYY"),
    },
    {
      title: "Created By",
    },
    {
      title: "Action",
      render: (_: any, row: any) => (
        <Space>
          <Button icon={<DeleteOutlined />} danger />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
          <span style={{ marginRight: 25 }}>Filter:</span>
          <Space wrap>
            <Select
              // defaultValue={filter.year}
              style={{ width: 120 }}
              onChange={(e) => setFilter({ ...filter, year: e })}
              options={Array(100)
                .fill(0)
                .map((_, i) => {
                  return {
                    label: new Date().getFullYear(),
                    value: new Date().getFullYear() - i,
                  };
                })}
              placeholder="Year"
            />
            <Select
              // defaultValue={filter.year}
              style={{ width: 120 }}
              onChange={(e) => setFilter({ ...filter, year: e })}
              options={jason.months.map((_, i) => {
                return {
                  label: _,
                  value: i,
                };
              })}
              placeholder="Month"
            />
          </Space>
        </div>
        <div>
          <Button
            icon={<PlusOutlined />}
            onClick={() => setOpenNewAnnouncement(true)}
          >
            Add Announcement
          </Button>
        </div>
      </div>
      <Table columns={columns} />

      {/* context */}
      <StaffNewAnnouncement
        open={openNewAnnouncement}
        onSave={({ title, description, image }) => {}}
        close={() => setOpenNewAnnouncement(false)}
      />
    </>
  );
};

export default StaffAnnouncement;
