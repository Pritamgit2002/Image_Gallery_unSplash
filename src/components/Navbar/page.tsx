"use client";
import React from "react";
import SearchBox from "../SearchBox/page";
import localFont from "next/font/local";

type Props = {};

const fonts1 = localFont({
  src: "../../../public/fonts/Pattaya-Regular.ttf",
});
const Page = (props: Props) => {
  return (
    <div className="flex items-center justify-around bg-red-600 p-1">
      <span style={fonts1.style} className="text-xl">
        Image Gallery
      </span>
      <div>
        <SearchBox />
      </div>
      <div
        className="flex items-center justify-center gap-2 text-xl font-medium"
        style={fonts1.style}
      >
        <span>explore</span>
        <span>connection</span>
        <span>community</span>
      </div>
    </div>
  );
};

export default Page;
