import { Notification } from "@/types";
import { Typography } from "antd";

const NotificationCard = ({
  type,
  status,
  title,
  description,
  sub_title,
}: Notification) => {
  const getColor = () => {
    if (status == "error") return "#f00";
    else if (status == "success") return "#28a745";
    else return "#A6B9FF";
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#fff",
      }}
    >
      <div
        style={{
          background: getColor(),
          width: 15,
        }}
      />
      <div style={{ paddingLeft: 25, paddingRight: 25 }}>
        <Typography.Title level={5} style={{ margin: 0, padding: 0 }}>
          {type == "events"
            ? "Events / Announcement"
            : title == "all"
            ? "All"
            : "SYSTEM"}
        </Typography.Title>
        <Typography.Text type="secondary">
          {title.toLocaleUpperCase()}
        </Typography.Text>
        <Typography.Paragraph style={{ marginBottom: 5 }}>
          {sub_title ?? description}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default NotificationCard;
