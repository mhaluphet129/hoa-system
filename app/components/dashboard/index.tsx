import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { FaRegBell } from "react-icons/fa";
import { TbReceipt } from "react-icons/tb";
import { PiUsersLight } from "react-icons/pi";
import { LuMegaphone } from "react-icons/lu";
import {
  Card,
  Col,
  Row,
  Select,
  Spin,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Title);

import jason from "@/assets/json/constants.json";
import dayjs from "dayjs";
import Notification from "../notification";
import {
  HomeownerColumn,
  Event,
  AnnouncementDetailsProps,
  User,
} from "@/types";
import { EventService, UtilService, UserService } from "@/services";
import { useUserStore } from "@/services/context";
import AnnouncementDetails from "../announcement_details";

const Dashboard = () => {
  const [homeowners, setHomeowners] = useState<HomeownerColumn[]>([]);
  const [staffs, setStaffs] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [announceOpt, setAnnouncementOpt] = useState<AnnouncementDetailsProps>({
    open: false,
    announcement: null,
  });

  const { currentUser } = useUserStore();
  const role = currentUser?.type;

  const util = new UtilService();
  const event = new EventService();
  const user = new UserService();

  const homeownerColumn: TableColumnsType<HomeownerColumn> = [
    {
      title: "Name",
      render: (_, { name, lastname }) =>
        name == null ? (
          <Typography.Text type="secondary" italic>
            N/A
          </Typography.Text>
        ) : (
          `${name} ${lastname}`
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_) => (
        <Tag color={_ ? "success" : "error"}>{_ ? "Active" : "Inactive"}</Tag>
      ),
    },
  ];

  const staffColumn: TableColumnsType<User> = [
    {
      title: "Name",
      render: (_, { staffId }) =>
        staffId == null ? (
          <Typography.Text type="secondary" italic>
            N/A
          </Typography.Text>
        ) : (
          staffId.name
        ),
    },
    {
      title: "Created At",
      width: 180,
      render: (_, { createdAt }) =>
        dayjs(createdAt).format("MMMM DD, YYYY - hh:mma"),
    },
  ];

  const eventsColumn: TableColumnsType<Event> = [
    {
      title: "Name",
      render: (_, { title }) =>
        name == null ? (
          <Typography.Text type="secondary" italic>
            N/A
          </Typography.Text>
        ) : (
          title
        ),
    },
    {
      title: "Posted Date",
      dataIndex: "createdAt",
      render: (_) => dayjs(_).format("MMMM DD, YYYY"),
    },
    {
      title: "Posted By",
      render: (_, { staffId }) => `${(staffId as any).staffId.name}`,
    },
  ];

  useEffect(() => {
    setLoading(true);
    (async (_) => {
      let res = await _.getDashboardData();
      if (res?.success ?? false) {
        setHomeowners(res?.data?.homeowners ?? []);
        setLoading(false);
      } else setLoading(false);
    })(util);

    (async (_) => {
      let res = await _.getEventAll();
      if (res?.success ?? false) setEvents(res?.data?.events ?? []);
    })(event);

    (async (_) => {
      let res = await _.getUsers("staff");
      if (res?.success ?? false) setStaffs(res?.data ?? []);
    })(user);
  }, []);

  return (
    <>
      <Spin spinning={loading}>
        <Row gutter={[32, 32]}>
          {role != "homeowner" && (
            <Col span={8}>
              <Card
                title={
                  <Typography.Title level={5} style={{ margin: 5 }}>
                    Proportion of paid, pending and <br />
                    overdue homeowners
                  </Typography.Title>
                }
                extra={
                  <Select
                    defaultValue={dayjs().format("MMMM")}
                    style={{
                      width: 120,
                    }}
                    options={jason.months.map((e) => ({
                      label: e,
                      value: e.toLocaleLowerCase(),
                    }))}
                  />
                }
                styles={{
                  body: {
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    maxHeight: 500,
                    minHeight: 500,
                    overflow: "scroll",
                  },
                }}
                hoverable
              >
                <div
                  style={{
                    width: 220,
                    height: 220,
                  }}
                >
                  <Doughnut
                    data={{
                      labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
                      datasets: [
                        {
                          label: "Dataset 1",
                          data: [1, 2, 3, 4],
                          backgroundColor: ["#f00", , "#0f0", "#00f", "#fff"],
                        },
                      ],
                    }}
                    options={{
                      cutout: 70,
                      responsive: true,
                    }}
                  />
                </div>
                <Table
                  style={{
                    width: "90%",
                    marginTop: 20,
                  }}
                  dataSource={[
                    { type: "Paid", color: "#0E5FD9", total: 100 },
                    { type: "Ongoing", color: "#FF9500", total: 30 },
                    { type: "Overdue", color: "#E84646", total: 10 },
                  ]}
                  columns={[
                    { title: "Type", dataIndex: "type" },
                    { title: "Total Users", dataIndex: "total" },
                  ]}
                  rowKey={(e) => e.type}
                  pagination={false}
                />
              </Card>
            </Col>
          )}
          {role == "staff" && (
            <>
              <Col span={8}>
                <Card
                  styles={{
                    body: {
                      maxHeight: 500,
                      minHeight: 500,
                      overflow: "scroll",
                    },
                  }}
                  title={
                    <div
                      style={{
                        margin: 5,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaRegBell
                        style={{ marginRight: 10, fontSize: "1.4em" }}
                      />
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Notifications
                      </Typography.Title>
                    </div>
                  }
                  hoverable
                >
                  <Notification />
                </Card>
              </Col>
            </>
          )}
          {["staff", "treasurer"].includes(role!) && (
            <Col span={8}>
              <Card
                styles={{
                  body: {
                    maxHeight: 500,
                    minHeight: 500,
                    overflow: "scroll",
                  },
                }}
                title={
                  <div
                    style={{
                      margin: 5,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PiUsersLight
                      style={{ marginRight: 10, fontSize: "1.6em" }}
                    />
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      Homeowner
                    </Typography.Title>
                  </div>
                }
                hoverable
              >
                <Table
                  dataSource={homeowners}
                  columns={homeownerColumn}
                  rowKey={(e) => e.name ?? "null-agoy"}
                  pagination={false}
                />
              </Card>
            </Col>
          )}
          {["homeowner", "staff", "treasurer"].includes(role!) && (
            <Col span={8}>
              <Card
                styles={{
                  body: {
                    maxHeight: 500,
                    minHeight: 500,
                    overflow: "scroll",
                  },
                }}
                title={
                  <div
                    style={{
                      margin: 5,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PiUsersLight
                      style={{ marginRight: 10, fontSize: "1.6em" }}
                    />
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      Staff Members
                    </Typography.Title>
                  </div>
                }
                hoverable
              >
                <Table
                  dataSource={staffs}
                  columns={staffColumn}
                  rowKey={(e) => e._id ?? "null-agoy"}
                  pagination={false}
                />
              </Card>
            </Col>
          )}
          {["treasurer"].includes(role!) && (
            <Col span={8}>
              <Card
                styles={{
                  body: {
                    maxHeight: 500,
                    minHeight: 500,
                    overflow: "scroll",
                  },
                }}
                title={
                  <div
                    style={{
                      margin: 5,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TbReceipt style={{ marginRight: 10, fontSize: "1.6em" }} />
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      Due Dates
                    </Typography.Title>
                  </div>
                }
                hoverable
              ></Card>
            </Col>
          )}
          <Col span={16}>
            <Card
              styles={{
                body: {
                  maxHeight: 500,
                  minHeight: 500,
                  overflow: "scroll",
                },
              }}
              title={
                <div
                  style={{
                    margin: 5,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LuMegaphone style={{ marginRight: 10, fontSize: "1.6em" }} />
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Events / Announcements
                  </Typography.Title>
                </div>
              }
              hoverable
            >
              <Table
                dataSource={events}
                columns={eventsColumn}
                rowKey={(e) => e._id ?? "null-agoy"}
                pagination={false}
                onRow={(data) => {
                  return {
                    onClick: () =>
                      setAnnouncementOpt({ open: true, announcement: data }),
                  };
                }}
              />
            </Card>
          </Col>
        </Row>
      </Spin>

      {/* context */}
      <AnnouncementDetails
        {...announceOpt}
        close={() => setAnnouncementOpt({ open: false, announcement: null })}
      />
    </>
  );
};

export default Dashboard;
