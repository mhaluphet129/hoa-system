import React, { useEffect, useState } from "react";
import { Layout, message } from "antd";
import { Sider, Header, Content, Footer } from "../layout";
import { LuLayoutDashboard, LuMegaphone } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { PiUsersLight, PiSealWarningLight } from "react-icons/pi";
import { TbReceipt } from "react-icons/tb";
import { LuCalendarRange } from "react-icons/lu";
import { MdCalendarToday } from "react-icons/md";

import Announcement from "@/app/components/staff/announcement";
import Event from "@/app/components/staff/event";
import Concern from "@/app/components/staff/concern";

// TODO: Add notif banner count

const selectedItemsStyle = {
  color: "#DEE4EE",
  backgroundColor: "#000",
  borderRadius: 3,
  borderLeft: "5px solid #aaa",
};

const HomeOwner: React.FC = () => {
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
              label: "Notifications",
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
            {selectedKey == "announcement" ? <Announcement /> : null}
            {selectedKey == "event" ? <Event /> : null}
            {selectedKey == "concern" ? <Concern /> : null}
          </Content>
        </Layout>
      </Layout>
      {/* <Footer /> */}
    </>
  );
};

export default HomeOwner;
