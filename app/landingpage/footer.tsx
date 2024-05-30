const Footer = () => {
  return (
    <div className="z-50 px-40 py-16 bg-black">
      <span className="text-5xl font-extrabold text-white ">
        VISTA VERDE VILLAGE
      </span>
      <div className="w-full my-16 border border-white" />
      <div className="flex justify-between ">
        <span className="text-white">
          All Right Reserved &#169; {new Date().getFullYear()}
        </span>
        <div className="flex justify-between w-2/3 2xl:w-1/2">
          <div>
            <span className="font-mono text-2xl font-extrabold text-white">
              ABOUT US
            </span>
            <div className="flex flex-col gap-3 mt-4">
              <p className="text-white">Home</p>
              <p className="text-white">About</p>
              <p className="text-white">BOD</p>
            </div>
          </div>
          <div>
            <span className="font-mono text-2xl font-extrabold text-white">
              COMPANY
            </span>
            <div className="flex flex-col gap-3 mt-4">
              <p className="text-white">Contact</p>
            </div>
          </div>
          <div>
            <span className="font-mono text-2xl font-extrabold text-white">
              SUPPORT
            </span>
            <div className="flex flex-col gap-3 mt-4">
              <p className="text-white">Support Center</p>
              <p className="text-white">Feedback</p>
              <p className="text-white">Accessibility</p>
            </div>
          </div>
          <div className="w-[200px]">
            <span className="font-mono text-2xl font-extrabold text-white">
              GET IN TOUCH
            </span>
            <div className="flex flex-col gap-3 mt-4">
              <input
                className="bg-[#351608] rounded-full p-2 text-sm text-white"
                width="250px"
                placeholder="Your email here..."
              />
              <div className="w-full p-3 font-bold text-center text-sm text-white bg-[#fc621d] rounded-full cursor-pointer hover:bg-orange-600">
                Get Access
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
