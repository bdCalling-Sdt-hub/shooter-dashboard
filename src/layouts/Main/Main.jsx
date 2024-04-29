import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Main = () => {
  return (
    <div className="flex bg-[#111111] p-[32px] min-h-screen">
      <div className="fixed top-3 left-3 h-full">
      <Sidebar />
      </div>
     
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="ml-[300px] fixed top-3 w-[calc(100%-300px)] z-10">
          <Header />
        </div>
        <div className="overflow-y-auto h-full flex-1 pt-[80px] pl-[280px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
