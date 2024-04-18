import React from "react";
import { Card, Typography, Watermark } from "antd";
import { EventCardProps } from "@/types";

const EventCard = ({ image, title, description, id }: EventCardProps) => {
  return (
    <Card
      hoverable
      style={{ width: 220 }}
      cover={
        image ? (
          <img alt="example" src={image} style={{ width: 220, height: 220 }} />
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
    >
      <Card.Meta title={title} description={description} />
      <span
        className="underline-on-hover"
        style={{
          float: "right",
        }}
      >
        Read More
      </span>
    </Card>
  );
};

export default EventCard;
