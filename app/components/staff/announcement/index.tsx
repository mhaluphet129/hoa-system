import React, { useState, useEffect } from "react";
import { Select, Button, Table, Space, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import jason from "@/assets/json/constants.json";
import { AnnouncementProps } from "@/types";
import { StaffService, EventService } from "@/services";
import { useUserStore } from "@/services/context/user.context";

import StaffNewAnnouncement from "./components/new_announcement";

// todo: (future) add lazy-load

const StaffAnnouncement: React.FC = () => {
  const [openNewAnnouncement, setOpenNewAnnouncement] = useState(false);
  const [announcement, setAnnouncement] = useState([]);
  const [total, setTotal] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const { currentUser } = useUserStore();
  const staff = new StaffService();
  const event = new EventService();

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
      title: "Date Created",
      dataIndex: "createdAt",
      render: (_: any) => dayjs(_).format("MMM DD, YYYY"),
    },
    {
      title: "Created By",
      dataIndex: "staffId",
      render: (_: any) => _.name,
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

  const newAnnouncement = async (props: AnnouncementProps) => {
    let res = await staff.newAnnouncement({
      ...props,
      staffId: currentUser!._id,
    });

    if (res.success ?? false) {
      message.success("New Announce added Successfully");
      setOpenNewAnnouncement(false);
      setTrigger(trigger + 1);
    }
  };

  useEffect(() => {
    (async (_) => {
      const res = await _.getEvent({ page: 1, pageSize: 10 });

      if (res?.success) {
        setAnnouncement(res?.data?.events);
        setTotal(res?.data?.total);
      }
    })(event);
  }, [trigger]);

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
      <Table
        dataSource={announcement}
        columns={columns}
        rowKey={(e) => e._id}
        pagination={{
          total,
        }}
      />

      {/* context */}
      <StaffNewAnnouncement
        open={openNewAnnouncement}
        onSave={newAnnouncement}
        close={() => setOpenNewAnnouncement(false)}
        isLoading={staff.loaderHas("new-annouce")}
      />
    </>
  );
};

export default StaffAnnouncement;
