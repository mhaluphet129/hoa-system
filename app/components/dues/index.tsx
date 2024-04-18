import { ReactNode, useState } from "react";
import { Button, Table, Tag, Typography, notification } from "antd";
import dayjs from "dayjs";
import { CopyOutlined, PrinterOutlined } from "@ant-design/icons";

const Dues = () => {
  const [api, contextHolder] = notification.useNotification();
  const [counter, setCounter] = useState(1);
  const getTransationTypeBadge = (str: string): ReactNode => {
    let bgColor = "";
    let textColor = "";
    let name = "";

    if (str.startsWith("GCASH")) {
      bgColor = "#297bfa";
      textColor = "#fff";
      name = "GCASH";
    } else if (str.startsWith("ELOAD")) {
      bgColor = "#ffc107";
      textColor = "#fff";
      name = "ELOAD";
    }
    return (
      <Tag color={bgColor} style={{ color: textColor }}>
        {name}
      </Tag>
    );
  };

  const getStatusBadge = (str: string): ReactNode => {
    let bgColor = "";
    if (str == "pending") bgColor = "#ffc107";
    else if (str == "completed") bgColor = "#28a745";
    else bgColor = "#f00";
    return <Tag color={bgColor}>{str.toLocaleUpperCase()}</Tag>;
  };

  const mock = [
    {
      id: 1,
      type: "GCASH CASH-IN",
      dateCreated: dayjs().add(1, "day"),
      refNumber: null,
      status: "pending",
    },
    {
      id: 2,
      type: "GCASH CASH-IN",
      dateCreated: dayjs(),
      refNumber: "090909",
      status: "completed",
    },
    {
      id: 3,
      type: "ELOAD",
      dateCreated: dayjs(),
      refNumber: "123456",
      status: "completed",
    },
    {
      id: 4,
      type: "GCASH CASH-IN",
      dateCreated: dayjs().add(2, "day"),
      refNumber: null,
      status: "failed",
    },
    {
      id: 5,
      type: "GCASH CASH-IN",
      dateCreated: dayjs().add(1, "day"),
      refNumber: null,
      status: "pending",
    },
    {
      id: 6,
      type: "GCASH CASH-IN",
      dateCreated: dayjs(),
      refNumber: "090909",
      status: "completed",
    },
    {
      id: 7,
      type: "ELOAD",
      dateCreated: dayjs(),
      refNumber: "123456",
      status: "completed",
    },
    {
      id: 8,
      type: "GCASH CASH-IN",
      dateCreated: dayjs().add(2, "day"),
      refNumber: null,
      status: "failed",
    },
  ];

  return (
    <>
      <Button
        onClick={() => {
          setCounter(counter + 1);
          api.info({
            message: `Transaction ID #${counter} has been updated`,
          });
        }}
      >
        CLICK ME
      </Button>
      {contextHolder}
    </>
    // <Table
    //   dataSource={mock}
    //   columns={[
    //     {
    //       title: "ID",
    //       dataIndex: "id",
    //     },
    //     {
    //       title: "Transaction Type",
    //       render: (_, row) => getTransationTypeBadge(row?.type),
    //     },
    //     {
    //       title: "Date Request",
    //       render: (_, row) => dayjs(row?.dateCreated).format("MMMM DD, YYYY"),
    //     },
    //     {
    //       title: "Reference #",
    //       render: (_, row) =>
    //         row.refNumber ? (
    //           <Typography.Link>
    //             <CopyOutlined />
    //             {"   "}
    //             {row?.refNumber}
    //           </Typography.Link>
    //         ) : (
    //           <Typography.Text type="secondary" italic>
    //             Not Yet
    //           </Typography.Text>
    //         ),
    //     },
    //     {
    //       title: "Status",
    //       render: (_, row) => getStatusBadge(row?.status),
    //     },
    //     {
    //       title: "Action",
    //       align: "center",
    //       render: (_, row) => <Button icon={<PrinterOutlined />} />,
    //     },
    //   ]}
    //   style={{
    //     width: 900,
    //   }}
    // />
  );
};

export default Dues;
