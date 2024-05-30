const AboutUs = () => {
  return (
    <div>
      <span className="block font-sans text-5xl text-center">About Us</span>
      <span className="block my-8 text-2xl text-center">
        Vista Verde Village is a residential community in the township of Pueblo
        de Oro, Cagayan de Oro City, Philippines.
      </span>
      <div className="flex flex-col justify-center py-10 px-52">
        <span className="text-2xl">
          The community has the following features:
        </span>
        <ul className="text-2xl list-disc list-inside">
          <li>Gated community</li>
          <li>Swimming pool at the clubhouse</li>
          <li>Wide roads</li>
          <li>24/7 security</li>
          <li>Reliable water supply</li>
          <li>Guarded entrance/exit gate </li>
        </ul>
        <span className="text-2xl">
          The community is located in the Uptown district of Cagayan de Oro
          City, and borders the renowned Pueblo Golf course.
        </span>
      </div>
    </div>
  );
};

export default AboutUs;
