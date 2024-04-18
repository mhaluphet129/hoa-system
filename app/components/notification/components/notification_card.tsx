import { NotificationCardProps } from "@/types";
import { Typography } from "antd";

const NotificationCard = ({
  title,
  status,
  description,
}: NotificationCardProps) => {
  const getColor = () => {
    if (status == "due") return "#f00";
    else if (status == "pending") return "#A6B9FF";
    else return "#28a745";
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#fff",
        width: 300,
      }}
    >
      <div
        style={{
          background: getColor(),
          width: 15,
        }}
      />
      <div style={{ marginLeft: 10 }}>
        <Typography.Title level={5} style={{ margin: 0, padding: 0 }}>
          {title}
        </Typography.Title>
        <Typography.Text type="secondary">{status}</Typography.Text>
        <Typography.Paragraph style={{ marginBottom: 5 }}>
          {description}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default NotificationCard;
