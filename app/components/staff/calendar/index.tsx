import React, { useEffect, useState } from "react";

import "dayz/dist/dayz.css";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

import { Button, Select } from "antd";

// @ts-ignore
import * as Dayz from "dayz";
import { Space } from "antd";

import { EventService } from "@/services";
import jason from "@/assets/json/constants.json";

// TODO: onclick open announcement details
// TODO: add "+(number of rest) on more than 3 announcement per day"

const StaffCalendar = () => {
  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [events, setEvents] = useState([]);

  const event = new EventService();

  useEffect(() => {
    (async (_) => {
      let res = await _.getEventAll();

      if (res.success) {
        if (res.data?.events ?? false) {
          setEvents(
            res.data?.events.map((e: any) => {
              return {
                content: e.title,
                range: moment.range(
                  moment(e.createAt).clone(),
                  moment(e.createAt).clone()
                ),
              };
            })
          );
        }
      }
    })(event);
  }, []);

  return (
    <Space
      direction="vertical"
      style={{
        display: "block",
      }}
    >
      <Space
        style={{
          marginBottom: 10,
        }}
        wrap
      >
        <Select
          defaultValue={filter.year}
          value={filter.year}
          style={{ width: 120 }}
          onChange={(e) => setFilter({ ...filter, year: e })}
          options={Array(100)
            .fill(0)
            .map((_, i) => {
              return {
                label: new Date().getFullYear() - i,
                value: new Date().getFullYear() - i,
              };
            })}
          placeholder="Year"
        />
        <Select
          defaultValue={filter.month}
          value={filter.month}
          style={{ width: 120 }}
          onChange={(e) => setFilter({ ...filter, month: e })}
          options={jason.months.map((_, i) => {
            return {
              label: _,
              value: i,
            };
          })}
          placeholder="Month"
        />
        <Button
          onClick={(e) =>
            setFilter({ year: moment().year(), month: moment().month() })
          }
        >
          Reset
        </Button>
      </Space>
      <Dayz
        display="month"
        date={moment().year(filter.year).month(filter.month)}
        events={new Dayz.EventsCollection(events)}
        onEventClick={(_: any, e: any) => console.log(e)}
      />
    </Space>
  );
};

export default StaffCalendar;
