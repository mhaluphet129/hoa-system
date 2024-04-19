import React, { useEffect, useState } from "react";
import {
  Space,
  Select,
  Pagination,
  Empty,
  Button,
  Typography,
  message,
} from "antd";

import { EventCardProps, PaginationProps, AnnouncementProps } from "@/types";

import { useUserStore } from "@/services/context";

import jason from "@/assets/json/constants.json";
import EventCard from "./components/event_card";
import EventCardShimmer from "@/app/shimmers/event_card";
import NewAnnouncement from "../announcement/components/new_announcement";

import { EventService, StaffService } from "@/services";
const staff = new StaffService();
const event = new EventService();

// TODO: fix no image

const StaffEvent: React.FC = () => {
  const [announcement, setAnnounncement] = useState<EventCardProps[]>([]);
  const [openNewAnnouncement, setOpenNewAnnouncement] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [paginationConfig, setPaginationConfig] = useState<PaginationProps>({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  const { currentUser } = useUserStore();

  const getEvents = async (page: number) => {
    (async (_) => {
      let res = await _.getEvent({ page, pageSize: paginationConfig.pageSize });

      if (res.success) {
        if (res.data?.events && res?.data?.events.length > 0) {
          setAnnounncement(
            res.data?.events.map((e) => {
              return {
                image: e.images[0],
                title: e.title,
                description: e.description,
                id: e._id ?? "",
              };
            })
          );

          setPaginationConfig({ ...paginationConfig, total: res.data?.total });
        }
      }
    })(event);
  };

  const newAnnouncement = async (props: AnnouncementProps) => {
    let res = await staff.newAnnouncement({
      ...props,
      images: props.images ?? [],
      staffId: currentUser?._id ?? "",
    });

    if (res.success ?? false) {
      message.success("New Announce added Successfully");
      setOpenNewAnnouncement(false);
      setTrigger(trigger + 1);
    }
  };

  useEffect(() => {
    (async () => {
      await getEvents(1);
    })();
  }, [trigger]);

  return (
    <>
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
            alignSelf: "start",
            maxWidth: "100%",
          }}
        >
          {event.loaderHas("get-events")
            ? Array(5)
                .fill(0)
                .map((e, i) => (
                  <EventCardShimmer key={`event-card-shimmer-${i}`} />
                ))
            : announcement.map((e, i) => (
                <EventCard
                  image={e.image}
                  title={e.title}
                  description={e.description}
                  id={e.id}
                  key={`event-card-${i}`}
                />
              ))}
        </Space>
        {announcement.length > 0 ? (
          <Pagination
            defaultCurrent={1}
            total={paginationConfig.total}
            pageSize={paginationConfig.pageSize}
            onChange={(page, pageSize) => {
              setPaginationConfig({ pageSize, page });
              getEvents(page);
            }}
          />
        ) : event.loaderHas("get-events") ? (
          <></>
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 120,
            }}
            description={
              <Typography.Text type="secondary">
                There are no announcement posted
              </Typography.Text>
            }
          >
            {["staff", "treasurer"].includes(currentUser?.type ?? "") && (
              <Button
                type="primary"
                onClick={() => setOpenNewAnnouncement(true)}
              >
                Create Now
              </Button>
            )}
          </Empty>
        )}
      </div>

      {/* context */}
      <NewAnnouncement
        open={openNewAnnouncement}
        onSave={newAnnouncement}
        close={() => setOpenNewAnnouncement(false)}
        isLoading={staff.loaderHas("new-announce")}
      />
    </>
  );
};

export default StaffEvent;
