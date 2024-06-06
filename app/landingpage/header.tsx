const Header = ({
  active,
  setActive,
}: {
  active: "home" | "new" | "amen" | "loc" | "ab";
  setActive: (s: "home" | "new" | "amen" | "loc" | "ab") => void;
}) => {
  let activeName = "border-b-[#FC621C4C] border-2"; //border-l-[#FC621C4C] border-r-[#55cc77] border-t-[#55cc77] rounded
  return (
    <div className="flex items-center justify-between p-10 mx-40">
      <img src="/logo.jpg" width="150px" />
      <ul className="flex gap-10">
        <li
          className={`p-4 font-bold border-2 border-transparent cursor-pointer hover:border-b-[#FC621C4C] ${
            active == "home" ? activeName : ""
          }`}
          onClick={() => setActive("home")}
        >
          HOME
        </li>
        <li
          className={`p-4 font-bold border-2 border-transparent cursor-pointer hover:border-b-[#FC621C4C] ${
            active == "new" ? activeName : ""
          }`}
          onClick={() => setActive("new")}
        >
          NEW
        </li>
        <li
          className={`p-4 font-bold border-2 border-transparent cursor-pointer hover:border-b-[#FC621C4C] ${
            active == "amen" ? activeName : ""
          }`}
          onClick={() => setActive("amen")}
        >
          AMENITIES
        </li>
        <li
          className={`p-4 font-bold border-2 border-transparent cursor-pointer hover:border-b-[#FC621C4C] ${
            active == "loc" ? activeName : ""
          }`}
          onClick={() => setActive("loc")}
        >
          LOCATION
        </li>
        <li
          className={`p-4 font-bold border-2 border-transparent cursor-pointer hover:border-b-[#FC621C4C] ${
            active == "ab" ? activeName : ""
          }`}
          onClick={() => setActive("ab")}
        >
          ABOUT US
        </li>
      </ul>
      <a
        className="px-8 py-4 font-semibold border border-black rounded text-1xl hover:bg-[#eee] hover:cursor-pointer"
        href="/user/login"
      >
        Login
      </a>
    </div>
  );
};

export default Header;
