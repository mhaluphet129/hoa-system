import React, { useState } from "react";

const Home = () => {
  const [active, setActive] = useState("home");

  const renderContent = (str: string) => {
    switch (str) {
      case "home":
        return showHome();
    }
  };

  const showHome = () => (
    <div className="flex bg-slate-100 mx-5 mt-16 main-content">
      <div className="right-content flex-none w-96 px-8 pt-8 pb-36 flex flex-col">
        <span className="text-2xl font-bold">
          Vista Verde Village Association
        </span>
        <span className="mt-6 ml-4">
          A homeowners’ association (HOA) is an organization that manages and
          maintains common areas and facilities in a residential subdivision.
          They collect dues and fees from their members to fund their operations
          and services. HOAs also enforce rules and regulations that aim to
          preserve the quality and value of the properties within their
          jurisdiction.
        </span>
      </div>
      <div className="grow bg-cover bg-no-repeat bg-[url('/main-content-img.png')]"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <div className="bg-[#e7eae9] items-center flex sticky top-0 justify-between">
        <div className="py-1 flex align-center">
          <a href="/" className="text-md ml-5 mr-5 my-1 rounded-lg">
            <img src="/logo.jpg" width={100} />
          </a>
          <span className="text-3xl font-bold uppercase tracking-wide flex items-center">
            Vista Verde Village Association
          </span>
        </div>
        <a
          href="/user/login"
          className="text-2xl mr-5 hover:underline cursor-pointer"
        >
          LOGIN
        </a>
      </div>
      <nav className="bg-white ml-4">
        <div className="max-w-7xl px-1 sm:px-6 lg:px-1">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              <a
                href="#"
                onClick={() => setActive("home")}
                className={`text-black px-3 py-2 text-lg font-medium nav-link ${
                  active == "home" ? "active" : ""
                }`}
              >
                Home
              </a>
              <a
                href="#"
                onClick={() => setActive("news")}
                className={`text-black px-3 py-2 text-lg font-medium nav-link ${
                  active == "news" ? "active" : ""
                }`}
              >
                News
              </a>
              <a
                href="#"
                className={`text-black px-3 py-2 text-lg font-medium nav-link ${
                  active == "amen" ? "active" : ""
                }`}
              >
                Amenities
              </a>
              <a
                href="#"
                onClick={() => setActive("location")}
                className={`text-black px-3 py-2 text-lg font-medium nav-link ${
                  active == "location" ? "active" : ""
                }`}
              >
                Location
              </a>
              <a
                href="#"
                onClick={() => setActive("about")}
                className={`text-black px-3 py-2 text-lg font-medium nav-link ${
                  active == "about" ? "active" : ""
                }`}
              >
                About Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      {renderContent(active)}
      {/* END OF CONTENT */}

      <div className="absolute bottom-0 h-16 min-w-full bg-[#495057] flex justify-between items-center">
        <span></span>
        <div className="flex flex-col">
          <span className="tracking-wide text-white mr-1 uppercase">
            @2024 All Rights Reserved{" "}
            <span className="font-black hover:underline">
              Vista Verde Village HOA
            </span>
          </span>
          {/* <span className="text-white ml-5">This website is made with ❤️</span>  */}
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 my-2 bg-contain mr-4 bg-no-repeat cursor-pointer bg-[url('/fb-icon.png')]"></div>
          <div className="w-6 h-6 my-2 bg-contain mr-4 bg-no-repeat cursor-pointer bg-[url('/x-icon.png')]"></div>
          <div className="w-6 h-6 my-2 bg-contain mr-4 bg-no-repeat cursor-pointer bg-[url('/insta-icon.png')]" />
        </div>
      </div>
    </div>
  );
};

export default Home;
