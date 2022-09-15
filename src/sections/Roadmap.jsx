import React from "react";
import MapItem from "../components/MapItem";

function Roadmap() {
  return (
    <div
      id="map"
      className="relative md:mt-[800px] mt-[400px] pt-[30px] md:bg-roadmap bg-cover bg-top bg-no-repeat"
    >
      <div className="w-full absolute top-0 md:-translate-y-[75%] -translate-y-[25%] z-0">
        <img src="/img/connection1.png" alt="" className="w-full" />
      </div>
      <div className="">
        <img src="/img/roadmap.png" alt="" className="w-full" />{" "}
      </div>
      <div className="w-full absolute bottom-0 md:translate-y-[50%] translate-y-[33%] z-0">
        <img src="/img/connection1.png" alt="" className="w-full" />
      </div>
    </div>
  );
}
export default Roadmap;
