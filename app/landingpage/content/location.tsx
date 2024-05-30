const Location = () => {
  return (
    <div className="mx-16">
      <span className="block mb-8 font-sans text-5xl text-center">
        Location
      </span>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3946.5775815018824!2d124.6164072!3d8.4430748!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ff8d3860383ff7%3A0xf8de8f4c2406f521!2sVista%20Verde%20Club%20House%20-%20Uptown!5e0!3m2!1sen!2sph!4v1717065430262!5m2!1sen!2sph"
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <span>Address: 945: Masterson Ave, Cagayan de Oro, Philippines</span>
      <div className="my-4">
        Map links: <br />
        <a
          href="https://www.waze.com/en/live-map/directions/vista-verde-village-945-masterson-ave-cagayan-de-oro?place=w.81657940.816710476.10124182"
          className="hover:underline hover:text-blue-500"
          target="_blank"
        >
          https://www.waze.com/en/live-map/directions/vista-verde-village-945-masterson-ave-cagayan-de-oro?place=w.81657940.816710476.10124182
        </a>
        <br />
        <a
          href="https://maps.app.goo.gl/dvLtzgaJh9DynasBA"
          className="hover:underline hover:text-blue-500"
          target="_blank"
        >
          https://maps.app.goo.gl/dvLtzgaJh9DynasBA
        </a>
      </div>
    </div>
  );
};

export default Location;
