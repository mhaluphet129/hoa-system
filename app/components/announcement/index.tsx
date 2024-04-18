import React, { useState, useEffect } from "react";
import { Select, Button, Table, Space, message, Popconfirm } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import jason from "@/assets/json/constants.json";
import { AnnouncementDetailsProps, AnnouncementProps, Event } from "@/types";
import { StaffService, EventService } from "@/services";
import { useUserStore } from "@/services/context/user.context";

import StaffNewAnnouncement from "./components/new_announcement";
import AnnouncementDetails from "../announcement_details";

// todo: (future) add lazy-load

const StaffAnnouncement = ({ isHo }: { isHo?: boolean }) => {
  const [openNewAnnouncement, setOpenNewAnnouncement] = useState(false);
  const [announcement, setAnnouncement] = useState<Event[]>([]);
  const [announceOpt, setAnnouncementOpt] = useState<AnnouncementDetailsProps>({
    open: false,
    announcement: null,
  });
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
      dataIndex: "_id",
      render: (_: any, row: any) => (
        <Space>
          <Popconfirm
            title="Are you sure you want to delete?"
            okText="Delete"
            okType="danger"
            onConfirm={(e) => handleRemove(_)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const newAnnouncement = async (props: AnnouncementProps) => {
    let res = await staff.newAnnouncement({
      title: props.title,
      description: props.description,
      staffId: currentUser?._id ?? "",
      images: props?.image ?? [],
    });

    if (res.success ?? false) {
      message.success("New Announce added Successfully");
      setOpenNewAnnouncement(false);
      setTrigger(trigger + 1);
    }
  };

  const handleRemove = (id: string) => {
    (async (_) => {
      let res = await _.removeEvent(id);

      if (res.success) {
        message.success(res?.message ?? "Success");
        setTrigger(trigger + 1);
      }
    })(event);
  };

  useEffect(() => {
    (async (_) => {
      const res = await _.getEvent({ page: 1, pageSize: 10 });

      if (res?.success) {
        setAnnouncement(res?.data?.events ?? []);
        setTotal(res?.data?.total ?? 0);
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
        {!isHo && (
          <div>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setOpenNewAnnouncement(true)}
            >
              Add Announcement
            </Button>
          </div>
        )}
      </div>
      <Table
        dataSource={announcement}
        columns={columns}
        rowKey={(e) => e.title}
        pagination={{
          total,
        }}
        onRow={(data: any) => {
          return {
            onClick: () =>
              setAnnouncementOpt({ open: true, announcement: data }),
          };
        }}
      />

      {/* context */}
      <StaffNewAnnouncement
        open={openNewAnnouncement}
        onSave={newAnnouncement}
        close={() => setOpenNewAnnouncement(false)}
        isLoading={staff.loaderHas("new-annouce")}
      />
      <AnnouncementDetails
        {...announceOpt}
        close={() => setAnnouncementOpt({ open: false, announcement: null })}
      />
    </>
  );
};

export default StaffAnnouncement;
