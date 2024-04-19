import React from "react";
import { Divider, Image, Modal, Space, Typography } from "antd";

import { AnnouncementProps } from "@/types";
import dayjs from "dayjs";

const AnnouncementDetails = ({
  open,
  close,
  announcement,
}: {
  open: boolean;
  close: () => void;
  announcement: AnnouncementProps | null;
}) => {
  return (
    <Modal
      open={open}
      onCancel={close}
      width={900}
      footer={null}
      title={
        <div
          style={{
            display: "block",
          }}
        >
          <Typography.Title level={2} style={{ margin: 0 }}>
            {announcement?.title}
          </Typography.Title>
          <Divider style={{ marginTop: 5, background: "#000" }} />
        </div>
      }
    >
      <Typography.Title level={5} style={{ margin: 0, marginTop: 20 }}>
        {announcement?.title}
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, marginTop: 5 }}>
        {dayjs(announcement?.createdAt).format("MMMM DD, YYYY hh:mma")}
      </Typography.Title>
      <Typography.Paragraph style={{ marginTop: 10 }}>
        {announcement?.description}
      </Typography.Paragraph>

      {announcement?.images && announcement.images.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Image.PreviewGroup>
            <Space>
              {announcement.images.map((e) => (
                <Image src={e} height={500} />
              ))}
            </Space>
          </Image.PreviewGroup>
        </div>
      )}
    </Modal>
  );
};

export default AnnouncementDetails;
