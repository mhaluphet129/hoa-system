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
import { HomeownerColumn } from "@/types";
import { UtilService } from "@/services";

const Dashboard = () => {
  const [homeowners, setHomeowners] = useState<HomeownerColumn[]>([]);
  const util = new UtilService();

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

  useEffect(() => {
    (async (_) => {
      let res = await _.getDashboardData();
      if (res?.success ?? false) {
        setHomeowners(res?.data?.homeowners ?? []);
      }
    })(util);
  }, []);

  return (
    <Row gutter={[32, 32]}>
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
              <FaRegBell style={{ marginRight: 10, fontSize: "1.4em" }} />
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
              <PiUsersLight style={{ marginRight: 10, fontSize: "1.6em" }} />
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
        ></Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
