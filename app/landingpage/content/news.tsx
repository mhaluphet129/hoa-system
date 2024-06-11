import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { EventService } from "@/services";
import { Event } from "@/types";
import dayjs from "dayjs";

const News = () => {
  const [fetching, setFetching] = useState(false);
  const [news, setNews] = useState<Event[]>([]);
  const event = new EventService();

  useEffect(() => {
    (async (_) => {
      setFetching(true);
      let res = await _.getEventAll();

      if (res?.success ?? false) {
        setFetching(false);
        setNews(res?.data?.events ?? []);
      } else {
        setFetching(false);
      }
    })(event);
  }, []);

  return (
    <Spin spinning={fetching}>
      <div className="relative z-10 flex flex-col mx-16">
        <span className="block w-full mb-8 font-sans text-5xl text-center">
          News and Announcement
        </span>
        <span className="text-center">
          This page is the recent News or Announcement that is posted from Home
          Owner Association Vista Verde Village Staff and Higher-ups.
        </span>
        <div className="grid items-center justify-center grid-cols-4 gap-16 m-16">
          {news.map((e, i) => (
            <div className="flex flex-col items-center" key={`${e._id}${i}`}>
              {e.images.length > 0 ? (
                <div className="relative group transition-all hover:scale-[1.025] duration-300 cursor-pointer">
                  <img
                    width={300}
                    className="bg-cover rounded max-w-none"
                    src={e.images[0]}
                  />
                  <span className="absolute bottom-0 z-10 flex items-center justify-center invisible w-full text-white h-1/6  bg-[#00000077] group-hover:visible">
                    Click for more details
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    width: 300,
                    height: 265,
                  }}
                ></div>
              )}
              <span
                style={{
                  fontFamily: "Abril Fatface",
                }}
                className="my-4 text-2xl"
              >
                {e.title}
              </span>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-px bg-slate-300" />{" "}
                <span className="text-slate-700">
                  {dayjs(e.createdAt).format("MMMM DD, YYYY")}
                </span>
                <div className="w-16 h-px bg-slate-300" />
              </div>
              <span
                style={{
                  width: 300,
                }}
                className="line-clamp-3"
              >
                {e.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Spin>
  );
};

export default News;
