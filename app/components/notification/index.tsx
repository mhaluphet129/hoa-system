import { Space } from "antd";
import NotificationCard from "./components/notification_card";
import { Notification as NotificationProp } from "@/types";

const Notification = ({
  notifications,
}: {
  notifications: NotificationProp[];
}) => {
  return (
    <Space direction="vertical">
      {notifications.map((e, i) => (
        <NotificationCard key={`notif-card-${i}`} {...e} />
      ))}
    </Space>
  );
};

export default Notification;
