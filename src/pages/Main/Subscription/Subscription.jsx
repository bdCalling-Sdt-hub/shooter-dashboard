import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../../../Components/SubscriptionCard";

const Subscription = () => {
  const navigate = useNavigate();
  return (
    <div className="ml-5">
      <div className="flex justify-between items-center">
        <p className="text-white text-[24px]">Subscription</p>
        <div
          onClick={(e) => navigate("/add-subscription")}
          className="flex gap-2 items-center py-[15px]
                 px-[40px]
                  bg-[#FA1131]
                  rounded-lg
                  text-white
                  cursor-pointer
                  "
        >
          <FaPlus size={17} />
          <p>Add Subscription</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <SubscriptionCard/>
        <SubscriptionCard/>
      </div>
    </div>
  );
};

export default Subscription;
