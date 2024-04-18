import React, { useEffect, useState } from "react";
import { Layout, message } from "antd";
import { Sider, Header, Content, Footer } from "../layout";
import { LuLayoutDashboard, LuMegaphone } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { PiSealWarningLight } from "react-icons/pi";
import { TbReceipt } from "react-icons/tb";
import { LuCalendarRange } from "react-icons/lu";
import { MdCalendarToday } from "react-icons/md";

import Announcement from "@/app/components/announcement";
import Event from "@/app/components/event";
import Concern from "@/app/components/concern";
import Notification from "@/app/components/notification";
import Calendar from "@/app/components/calendar";
import Dues from "@/app/components/dues";
import Dashboard from "@/app/components/dashboard";
import HOTransacDetails from "@/app/components/homeowner/components/homeowner_transaction_details";

import { useUserStore } from "@/services/context";

const selectedItemsStyle = {
  color: "#DEE4EE",
  backgroundColor: "#000",
  borderRadius: 3,
  borderLeft: "5px solid #aaa",
};

const HomeOwner: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");

  const { currentUser } = useUserStore();

  useEffect(() => {
    message.info({
      content: `Welcome ${currentUser?.homeownerId?.name} ${currentUser?.homeownerId?.lastname}`,
      icon: null,
    });
  }, []);

  return (
    <>
      <Layout>
        <Sider
          selectedIndex={(e) => setSelectedKey(e.key)}
          selectedKey={[selectedKey]}
          items={[
            {
              label: "Dashboard",
              key: "dashboard",
              icon: <LuLayoutDashboard />,
              style:
                selectedKey == "dashboard"
                  ? selectedItemsStyle
                  : {
                      color: "#fff",
                    },
            },
            {
              label: (
                <>
                  <span className="ant-menu-title-content">Notifications</span>{" "}
                  <span
                    style={{
                      color: "#fff",
                      background: "#3C50E0",
                      borderRadius: 2,
                      padding: 4,
                      width: 20,
                      height: 20,
                      fontSize: ".65em",
                      textAlign: "center",
                    }}
                  >
                    5
                  </span>
                </>
              ),
              key: "notification",
              icon: <FaRegBell />,
              style:
                selectedKey == "notification"
                  ? selectedItemsStyle
                  : {
                      color: "#fff",
                    },
            },
            {
              label: "List of Record",
              key: "list of record",
              icon: <TbReceipt />,
              style:
                selectedKey == "list of record"
                  ? selectedItemsStyle
                  : {
                      color: "#fff",
                    },
            },
            {
              label: "Announcement",
              key: "announcement",
              icon: <LuMegaphone />,
              style:
                selectedKey == "announcement"
                  ? selectedItemsStyle
                  : {
                      color: "#fff",
                    },
            },
            {
              label: "Dues",
              key: "due",
              icon: <TbReceipt />,
              style:
                selectedKey == "due"
                  ? selectedItemsStyle
                  : {
                      color: "#fff",
                    },
            },
            {
              label: "Calendar",
              key: "calendar",
              icon: <LuCalendarRange />,
              style:
                selectedKey == "calendar"
                  ? selectedItemsStyle
                  : {
                      color: "#fff",
                    },
            },
            {
              label: "Event",
              key: "event",
              icon: <MdCalendarToday />,
              style:
                selectedKey == "event"
                  ? selectedItemsStyle
                  : {
                      color: "#fff",
                    },
            },
            {
              label: "Concern",
              key: "concern",
              icon: <PiSealWarningLight />,
              style:
                selectedKey == "concern"
                  ? selectedItemsStyle
                  : {
                      color: "#fff",
                    },
            },
          ]}
        />
        <Layout>
          <Header />
          <Content selectedKey={selectedKey}>
            {selectedKey == "dashboard" ? <Dashboard /> : null}
            {selectedKey == "announcement" ? (
              <Announcement isHo={true} />
            ) : null}
            {selectedKey == "event" ? <Event /> : null}
            {selectedKey == "concern" ? <Concern /> : null}
            {selectedKey == "notification" ? <Notification /> : null}
            {selectedKey == "calendar" ? <Calendar /> : null}
            {selectedKey == "due" ? <Dues /> : null}
            {selectedKey == "list of record" ? (
              <HOTransacDetails user={currentUser!} />
            ) : null}
          </Content>
        </Layout>
      </Layout>
      {/* <Footer /> */}
    </>
  );
};

export default HomeOwner;
