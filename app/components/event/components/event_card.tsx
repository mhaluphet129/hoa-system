import React, { useState } from "react";
import { Card, Watermark } from "antd";
import { AnnouncementDetailsProps, Event } from "@/types";
import AnnouncementDetails from "../../announcement_details";

const EventCard = ({ ...props }: Event) => {
  const [announceOpt, setAnnouncementOpt] = useState<AnnouncementDetailsProps>({
    open: false,
    announcement: null,
  });

  return (
    <>
      <Card
        hoverable
        style={{ width: 220 }}
        cover={
          props.images ? (
            <img
              alt="example"
              src={props.images[0]}
              style={{ width: 220, height: 220 }}
            />
          ) : (
            <Watermark content="No Image">
              <div
                style={{
                  width: 220,
                  height: 220,
                }}
              />
            </Watermark>
          )
        }
        styles={{
          body: {
            padding: 10,
          },
        }}
        onClick={() => setAnnouncementOpt({ open: true, announcement: props })}
      >
        <Card.Meta title={props.title} description={props.description} />
        <span
          className="underline-on-hover"
          style={{
            float: "right",
          }}
        >
          Read More
        </span>
      </Card>

      {/* context */}
      <AnnouncementDetails
        {...announceOpt}
        close={() => setAnnouncementOpt({ open: false, announcement: null })}
      />
    </>
  );
};

export default EventCard;
