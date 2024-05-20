import React from "react";

import { ConcernDetalsCardProps, Homeowner } from "@/types";
import { Button, Divider, Modal, Typography } from "antd";
import dayjs from "dayjs";

const ConcernDetailsCard = ({
  open,
  close,
  concern,
}: ConcernDetalsCardProps) => {
  return (
    <Modal
      open={open}
      onCancel={close}
      footer={null}
      width={700}
      closable={false}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Typography.Title level={3} style={{ marginBottom: 0 }}>
          Concern Details
        </Typography.Title>

        <Button type="primary">RESOLVE</Button>
      </div>
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
      <Typography>{`${(concern?.homeownerId as Homeowner)?.name} ${
        (concern?.homeownerId as Homeowner)?.lastname
      }`}</Typography>
      <Typography>{(concern?.homeownerId as Homeowner)?.address}</Typography>
      <Typography>{(concern?.homeownerId as Homeowner)?.phone}</Typography>
    </Modal>
  );
};

export default ConcernDetailsCard;
