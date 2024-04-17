import React from "react";

import { ConcernDetalsCardProps, Homeowner } from "@/types";
import { Divider, Modal, Typography } from "antd";
import dayjs from "dayjs";

// todo: no homeownerid

const ConcernDetailsCard = ({
  open,
  close,
  concern,
}: ConcernDetalsCardProps) => {
  // const { name, lastname, phone, address } = concern?.homeownerId as Homeowner;
  console.log(concern);
  return (
    <Modal open={open} onCancel={close} footer={null} width={700}>
      <Typography.Title level={3} style={{ marginBottom: 0 }}>
        Concern Details
      </Typography.Title>
      <Divider style={{ marginTop: 0, marginBottom: 15, color: "#000" }} />
      <Typography.Title level={4} style={{ margin: 0 }}>
        {concern?.title}
      </Typography.Title>
      <Typography>
        {dayjs(concern?.createdAt).format("MMMM DD, YYYY")}
      </Typography>
      <Typography.Paragraph style={{ marginTop: 10 }}>
        {concern?.description}
      </Typography.Paragraph>
      {/* <Typography>{`${name} ${lastname}`}</Typography>
      <Typography>{address}</Typography>
      <Typography>{phone}</Typography> */}
    </Modal>
  );
};

export default ConcernDetailsCard;
