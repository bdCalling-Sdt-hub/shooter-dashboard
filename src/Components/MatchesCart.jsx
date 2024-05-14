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
const MatchesCart = ({ match }) => {
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
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Do you want to delete this event?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });

      if (result.isConfirmed) {
        const response = await baseURL.delete(`/match/delete/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        if (response?.data?.statusCode == 200) {
          // Swal.fire({
          //   position: 'top-center',
          //   icon: 'success',
          //   title: response.data.message,
          //   showConfirmButton: false,
          //   timer: 1500
          // });
          setTimeout(() => {
            window.location.reload();
          }, 1);
        }
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "", "info");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      Swal.fire("Error", "Failed to delete event", "error");
    }
  };
  
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
        <h1 className="text-[18px] mt-4"> Event Name : {eventDetails?.eventName}</h1>
        <div className="text-black flex justify-between items-center my-[12px]">
          <h1 className="text-[18px]">{matchName}</h1>
          <div className="flex gap-2">
            <FaRegClock />
            <p className="text-[12px]">{convertTo12HourFormat(eventDetails?.eventTime)}</p>
          </div>
        </div>
        <div className="text-black ">
          {/* <p className="text-[12px] font-bold mb-[8px]">
            {gender === "Both" ? "Male/Female" : gender} : 3x20 Shots
          </p> */}
          {/* <p className="text-[12px] font-bold  mb-[8px]">{prone}</p> */}
          {/* <p className="text-[10px] font-normal  mb-[8px]">Prone,standing & kneeling </p> */}
          {/* <div className="flex justify-between items-center  mb-[8px]">
            <p className="text-[12px] font-bold">Registration fee : </p>
            <p className="text-[12px] font-bold">R {fee} Per Entry</p>
          </div> */}
        </div>
        
        <div>
          {/* <Link
            to={`/matches/upload-score/${_id}`}
            className="flex mt-3 justify-center cursor-pointer text-white py-[8px] bg-[#281F1F] rounded-md"
          >
            Upload Score
          </Link> */}
          {
            !toggle &&  <button disabled={toggle} onClick={()=>navigate(`/matches/upload-score/${_id}`)}  className="flex mt-3 justify-center w-full cursor-pointer text-white py-[8px] bg-[#281F1F] rounded-md"> Upload Score</button>
          }
         
        </div>
      </div>
    </div>
  );
};

export default MatchesCart;
