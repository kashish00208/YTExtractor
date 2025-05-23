"use client";
import React, { useState } from "react";

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const navItems = [
    { title: "Home", link: "#home" },
    { title: "How it works", link: "#howItworks" },
    { title: "FAQ", link: "#faq" },
    { title: "About", link: "#about" },
  ];

  return (
    <div className="m-5 rounded-2xl px-6 py-4 text-sm bg-black bg-opacity-95 text-white ">
      <div className="flex justify-between items-center ">
        <div className="text-xl font-bold">TubeSave</div>
        <div className=" gap-6 hidden md:block">
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.link}
              onClick={() => setActiveIndex(i)}
              className={`rounded-3xl py-2 px-3 transition-colors duration-300 ${
                activeIndex === i
                  ? "bg-blue-600"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              {item.title}
            </a>
          ))}
        </div>

        <div className="lg:flex block md:hidden ">
            <button className="">SignUp</button>
            <span className="mx-2">|</span>
            <button className="">LogIn</button>
          </div>
        </div>
      </div>
  );
};

export default NavBar;
