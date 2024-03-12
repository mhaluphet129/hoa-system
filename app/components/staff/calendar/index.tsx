import React, { useEffect, useState } from "react";

import "dayz/dist/dayz.css";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

import { Button, Select, Tooltip } from "antd";
import { LeftOutlined, RightOutlined, ReloadOutlined } from "@ant-design/icons";

// @ts-ignore
import * as Dayz from "dayz";
import { Space } from "antd";

import { EventService } from "@/services";
import jason from "@/assets/json/constants.json";

// TODO: onclick open announcement details
// TODO: add "+(number of rest) on more than 3 announcement per day"
// TODO: add calendar header

const StaffCalendar = () => {
  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [events, setEvents] = useState<any>([]);

  const event = new EventService();

  useEffect(() => {
    (async (_) => {
      let res = await _.getEventAll();

      if (res.success) {
        if (res.data?.events && res.data?.events?.length > 0) {
          setEvents(
            res.data?.events.map((e) => {
              return {
                content: e.title,
                range: moment.range(
                  moment(e.createdAt).clone(),
                  moment(e.createdAt).clone()
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
      {/* <Space
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
      </Space> */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div
          className="month-controller"
          style={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            let { year, month } = filter;

            if (month <= 0) {
              month = 11;
              year--;
            } else month--;

            setFilter({ month, year });
          }}
        >
          <Button
            icon={<LeftOutlined />}
            shape="round"
            className="prev-month"
            style={{
              height: 50,
              width: 50,
            }}
          />
        </div>

        <div
          style={{
            width: 900,
          }}
        >
          <div className="calendar-header">
            <Select
              value={moment().month(filter.month).format("MMMM")}
              className="custom-select-title"
              suffixIcon={null}
              options={jason.months.map((e, i) => {
                return {
                  label: e,
                  value: i,
                };
              })}
              onChange={(e) => setFilter({ ...filter, month: parseInt(e) })}
            />
            ,
            <Select
              value={moment().year(filter.year).format("YYYY")}
              className="custom-select-title"
              suffixIcon={null}
              style={{
                marginRight: 5,
                marginLeft: 5,
              }}
              options={Array(moment().year() - 1999)
                .fill(0)
                .map((_, e) => {
                  return {
                    label: 2000 + +e,
                    value: 2000 + +e,
                  };
                })}
              onChange={(e) => setFilter({ ...filter, year: parseInt(e) })}
            />
            <Tooltip title="Reset">
              <Button
                icon={<ReloadOutlined />}
                ghost
                onClick={() =>
                  setFilter({ month: moment().month(), year: moment().year() })
                }
              />
            </Tooltip>
          </div>

          <Dayz
            display="month"
            date={moment().year(filter.year).month(filter.month)}
            events={new Dayz.EventsCollection(events)}
            onEventClick={(_: any, e: any) => console.log(e)}
          />
        </div>
        <div
          className="month-controller"
          style={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            let { year, month } = filter;

            if (month >= 11) {
              month = 0;
              year++;
            } else month++;

            setFilter({ month, year });
          }}
        >
          <Button
            icon={<RightOutlined />}
            shape="round"
            className="next-month"
            style={{
              height: 50,
              width: 50,
            }}
          />
        </div>
      </div>
    </Space>
  );
};

export default StaffCalendar;
