import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { StaffService } from "@/services";
import { Category } from "@/types";

const Amenities = () => {
  const [amenities, setAmenities] = useState<Category[]>([]);
  const [fetching, setFetching] = useState(false);

  const staff = new StaffService();

  useEffect(() => {
    (async (_) => {
      setFetching(true);
      let res = await _.getCategory();

      if (res?.success ?? false) {
        setAmenities(res?.data ?? []);
        setFetching(false);
      } else {
        setFetching(false);
      }
    })(staff);
  }, []);
  return (
    <Spin spinning={fetching}>
      <div className="relative z-10 flex flex-col mx-16">
        <span className="block w-full mb-8 font-sans text-5xl text-center">
          Amenities
        </span>
        <div className="grid items-center justify-around grid-cols-4 gap-8 mx-16 mt-8">
          {amenities
            .filter((e) => !e.category.toLocaleLowerCase().includes("due"))
            .map((e, i) => (
              <div
                className="flex flex-col items-center p-8 border rounded-md border-slate-300"
                key={`${e._id}${i}`}
              >
                <img
                  width={300}
                  className="bg-cover rounded transition-all hover:scale-[1.025] duration-300 cursor-pointer"
                  src="https://picsum.photos/300"
                />
                <span
                  style={{
                    fontFamily: "Abril Fatface",
                  }}
                  className="my-4 text-3xl"
                >
                  {e.category}
                </span>
                <div className="w-full h-px mb-4 bg-slate-800" />
                <span
                  style={{
                    width: 260,
                  }}
                  className="line-clamp-1"
                >
                  {e.description}
                </span>
              </div>
            ))}
        </div>
      </div>
    </Spin>
  );
};

export default Amenities;
