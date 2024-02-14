import React, { useState } from "react";
import { Space, Select, Pagination } from "antd";
import jason from "@/assets/json/constants.json";
import EventCard from "./components/event_card";

const StaffEvent: React.FC = () => {
  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ alignSelf: "self-start" }}>
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
      <Space
        style={{
          marginTop: 20,
          marginBottom: 20,
          overflow: "scroll",
          padding: 20,
        }}
      >
        {Array(5)
          .fill(0)
          .map((e, i) => (
            <EventCard
              image="https://picsum.photos/240"
              title="LOREM IPSUM"
              description="Lorem ipsum dolor sit amet, consectetur"
              id={i.toString()}
            />
          ))}
      </Space>
      <Pagination defaultCurrent={1} total={500} />
    </div>
  );
};

export default StaffEvent;
