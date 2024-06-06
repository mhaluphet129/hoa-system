const Home = () => {
  return (
    <div className="relative z-10 flex mx-16">
      <div className="flex flex-col items-center justify-center w-1/2">
        <p
          style={{
            fontFamily: "Abril Fatface",
            fontSize: 96,
            textAlign: "center",
          }}
        >
          Vista Verde <br /> Village
        </p>
        <img
          src="/landingpage_1.png"
          width={500}
          className="bg-cover rounded-full cursor-pointer hover:scale-[1.025] duration-200 transition-all"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-1/2">
        <img
          src="/landingpage_2.png"
          width={500}
          className="bg-cover rounded-full cursor-pointer hover:scale-[1.025] duration-200 transition-all"
        />
        <p className="w-9/12 mt-16 text-center">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to
        </p>
      </div>
    </div>
  );
};

export default Home;
