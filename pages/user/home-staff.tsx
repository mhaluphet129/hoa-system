import React, { useEffect, useState } from "react";
import { Layout, message } from "antd";
import { Sider, Header, Content, Footer } from "../layout";
import { LuLayoutDashboard, LuMegaphone } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { PiUsersLight, PiSealWarningLight } from "react-icons/pi";
import { TbReceipt } from "react-icons/tb";
import { LuCalendarRange } from "react-icons/lu";
import { MdCalendarToday } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import Announcement from "@/app/components/staff/announcement";
import Event from "@/app/components/staff/event";
import Concern from "@/app/components/staff/concern";
import Notification from "@/app/components/staff/notification";
import Calendar from "@/app/components/staff/calendar";
import HomeOwner from "@/app/components/staff/homeowner";
import Dues from "@/app/components/staff/dues";
import Dashboard from "@/app/components/staff/dashboard";
import CollectionCategories from "@/app/components/staff/collection";

const selectedItemsStyle = {
  color: "#DEE4EE",
  backgroundColor: "#000",
  borderRadius: 3,
  borderLeft: "5px solid #aaa",
};

const Staff: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");

  useEffect(() => {
    message.info({
      content: "Welcome Staff-01",
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
              label: "Collection Categories",
              key: "collection categories",
              icon: <RxHamburgerMenu />,
              style:
                selectedKey == "collection categories"
                  ? selectedItemsStyle
                  : {
                      color: "#fff",
                    },
            },
            {
              label: "Homeowners",
              key: "homeowner",
              icon: <PiUsersLight />,
              style:
                selectedKey == "homeowner"
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
            {selectedKey == "announcement" ? <Announcement /> : null}
            {selectedKey == "event" ? <Event /> : null}
            {selectedKey == "concern" ? <Concern /> : null}
            {selectedKey == "notification" ? <Notification /> : null}
            {selectedKey == "calendar" ? <Calendar /> : null}
            {selectedKey == "homeowner" ? <HomeOwner /> : null}
            {selectedKey == "due" ? <Dues /> : null}
            {selectedKey == "collection categories" ? (
              <CollectionCategories />
            ) : null}
          </Content>
        </Layout>
      </Layout>
      {/* <Footer /> */}
    </>
  );
};

export default Staff;
