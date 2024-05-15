/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import eventImg from "../assets/eventImg2.png";
import { FaRegClock } from "react-icons/fa";
import baseURL from "../config";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function convertTo12HourFormat(time24) {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = time24.split(":").map(Number);

  // Determine whether it's AM or PM
  const period = hours < 12 ? "AM" : "PM";

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Format the time in 12-hour format
  const time12 = `${hours12}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;

  return time12;
}

// eslint-disable-next-line react/prop-types
const MatchesCart = ({ match,index }) => {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const { _id, matchName, description,eventDetails, registrationStatus } = match;

  useEffect(() => {
    if (eventDetails?.eventDate) {
      const today = new Date().toISOString().split("T")[0];
      console.log(today);
      setToggle(today >= eventDetails?.eventDate.split("T")[0] ? false : true);
    }
  }, [eventDetails?.eventDate]);
  
  
console.log(toggle);
  return (
    <div className="border-2 border-[#FA1131] w-[370px] rounded-lg bg-[#ffffff]">
      <div className="p-[15px]">
        <div className="w-[340px] relative flex justify-center">
          <img
            className="rounded-lg "
            src={`${import.meta.env.VITE_BASE_URL}${eventDetails?.image?.publicFileURL}`}
            alt=""
          />
          <span
            className="bg-[#fdf7f8] px-2 py-1 absolute top-2 left-2 text-[#FA1131] rounded-md font-bold
            "
          >
            {eventDetails?.eventDate.split("T")[0]}
          </span>
        </div>
        <h1 className="text-[18px] mt-4"> {`Match ${index + 1}`}</h1>
        <h1 className="text-[18px] mt-4"> Event Name : {eventDetails?.eventName}</h1>
        <div className="text-black flex justify-between items-center my-[12px]">
          <h1 className="text-[18px]">Match Name : {matchName}</h1>
          {/* <div className="flex gap-2">
            <FaRegClock />
            <p className="text-[12px]">{convertTo12HourFormat(eventDetails?.eventTime)}</p>
          </div> */}
        </div>
        <div className="text-black ">
          <div>
            
            <p className="text-[20px] font-normal mb-[8px]">
              Description : {description}
            </p>
          </div>
        </div>
        
        <div>
          
          {
            !toggle &&  <button disabled={toggle} onClick={()=>navigate(`/matches/upload-score/${_id}`)}  className="flex mt-3 justify-center w-full cursor-pointer text-white py-[8px] bg-[#281F1F] rounded-md"> Upload Score</button>
          }
         
        </div>
      </div>
    </div>
  );
};

export default MatchesCart;
