import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../../../Components/SubscriptionCard";
import { useGetAllSubscriptionQuery } from "../../../redux/Features/getAllSubscription";
import Loading from "../../../Components/Loading";

const Subscription = () => {
  const navigate = useNavigate();
  const {data,isLoading,isSuccess} = useGetAllSubscriptionQuery();
  if(isLoading){
    return <Loading/>
  }
  console.log(data?.data?.attributes);
  return (
    <div className="ml-5">
      {
        data?.data?.attributes.length <= 2 && <div className="flex justify-between items-center">
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
      }
      {
        data?.data?.attributes.length === 0 ? <p className="text-white text-[24px] text-center">No Subscription Found</p>:<div className="grid grid-cols-2 gap-5">
        {
            data?.data?.attributes?.map((item,index)=>(
              <SubscriptionCard key={index} item={item}/>
            ))
        }
      </div>
      }
      
    </div>
  );
};

export default Subscription;
