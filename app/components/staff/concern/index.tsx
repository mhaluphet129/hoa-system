import React, { useState } from "react";
import { Space, Select, Table, Tag } from "antd";
import dayjs from "dayjs";

import jason from "@/assets/json/constants.json";

import ConcernDetailsCard from "./components/concern_details_card";

const StaffConcern = () => {
  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Homeowner",
      render: (_: any, row: any) =>
        row.homeOwnerId.name + " " + row.homeOwnerId.lastname,
    },
    {
      title: "Date Created",
      render: (_: any, row: any) =>
        dayjs(row?.dateCreated).format("MMM DD, YYYY"),
    },
    {
      title: "Status",
      render: (_: any, row: any) => (
        <Tag color={row.status == "solve" ? "success" : "error"}>
          {row.status == "solve" ? "Solved" : "Unsolved"}
        </Tag>
      ),
    },
    {
      title: "Action",
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 35 }}>
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
      <Table columns={columns} />
      {/* context */}
      <ConcernDetailsCard open={false} close={() => {}} />
    </>
  );
};

export default StaffConcern;
