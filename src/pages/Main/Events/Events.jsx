import { Pagination } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EventCart from "../../../Components/EventCart";
import { useGetAllEventQuery } from "../../../redux/Features/getAllEventApi";
import Loading from "../../../Components/Loading";

const Events = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (values) => {
    console.log(values);
    setCurrentPage(values);
  };

  const {data:AllEvent,isSuccess,isLoading} = useGetAllEventQuery(currentPage);
  console.log("alllllll",AllEvent);
  if(isLoading){
    return <Loading/>
  }

  return (
    <div className="ml-[24px]">
      <div className="flex justify-between items-center">
        <p className="text-white text-[24px]">Events</p>
        <div
          onClick={(e) => navigate("/events/add-event")}
          className="flex gap-2 items-center py-[15px]
                 px-[40px]
                  bg-[#FA1131]
                  rounded-lg
                  text-white
                  cursor-pointer
                  "
        >
          <FaPlus size={17} />
          <p>Add Events</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-3 my-7">
        {
          AllEvent?.data?.attributes?.map((event)=>(
            <EventCart key={event._id} event={event}/>
            
          ))
        }
            
            
         
      </div>
           

      <div className="flex justify-center my-10">
        <Pagination
          onChange={onChange}
          defaultCurrent={1}
          current={currentPage}
          pageSize={8}
            // total={totalMembershipCart}
            total={AllEvent?.pagination?.totalEvents}
        />
      </div>
    </div>
  );
};

export default Events;
