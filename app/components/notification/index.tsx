import { Space } from "antd";
import NotificationCard from "./components/notification_card";
import { NotificationCardProps } from "@/types";

const Notification = () => {
  const dummy: NotificationCardProps[] = [
    {
      title: "System",
      status: "due",
      description: "You have remaining balance to pay.",
    },
    {
      title: "System",
      status: "pending",
      description: "You have remaining balance to pay.",
    },
    {
      title: "System",
      status: "due",
      description: "You have remaining balance to pay.",
    },
    {
      title: "System",
      status: "due",
      description: "You have remaining balance to pay.",
    },
    {
      title: "System",
      status: "completed",
      description: "You have remaining balance to pay.",
    },
  ];
  return (
    <Space direction="vertical">
      {dummy.map((e) => (
        <NotificationCard {...e} />
      ))}
    </Space>
  );
};

export default Notification;
