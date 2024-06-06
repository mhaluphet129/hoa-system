import { useState } from "react";
import Footer from "./footer";
import Header from "./header";
import Home from "./content/home";
import AboutUs from "./content/about_us";
import Location from "./content/location";
import Amenities from "./content/amenities";

const Content = () => {
  const [activeKey, setActiveKey] = useState<
    "home" | "new" | "amen" | "loc" | "ab"
  >("home");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex-1 min-h-screen main-body">
        <Header active={activeKey} setActive={setActiveKey} />
        <div id="main" className="relative">
          {activeKey == "home" ? <Home /> : null}
          {activeKey == "ab" ? <AboutUs /> : null}
          {activeKey == "loc" ? <Location /> : null}
          {activeKey == "amen" ? <Amenities /> : null}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Content;
