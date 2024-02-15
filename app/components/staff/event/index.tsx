import React, { useEffect, useState } from "react";
import { Space, Select, Pagination } from "antd";

import { EventService } from "@/services";
import { EventCardProps, PaginationProps } from "@/types";

import jason from "@/assets/json/constants.json";
import EventCard from "./components/event_card";
import EventCardShimmer from "@/app/shimmers/event_card";

const StaffEvent: React.FC = () => {
  const [fetching, setFetching] = useState(false);
  const [announcement, setAnnounncement] = useState<EventCardProps[]>([]);
  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [paginationConfig, setPaginationConfig] = useState<PaginationProps>({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  const event = new EventService();

  useEffect(() => {
    setFetching(true);

    (async (_) => {
      let res = await _.getEvent(paginationConfig);

      if (res.success) {
        if (res.data?.events ?? false) {
          setAnnounncement(
            res.data?.events.map((e: any) => {
              return {
                image: e.images[0],
                title: e.title,
                description: e.description,
                id: e._id,
              };
            })
          );

          setPaginationConfig({ ...paginationConfig, total: res.data?.total });
          setFetching(false);
        }
      } else setFetching(false);
    })(event);
  }, [paginationConfig]);

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
          alignSelf: "start",
        }}
      >
        {fetching && announcement.length == 0
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
      <Pagination
        defaultCurrent={1}
        total={paginationConfig.total}
        pageSize={paginationConfig.pageSize}
        onChange={(page, pageSize) => setPaginationConfig({ pageSize, page })}
      />
    </div>
  );
};

export default StaffEvent;
