
import { Link } from "react-router-dom";
import eventImg from "../assets/eventImg2.png";
import { FaRegClock } from "react-icons/fa";
import baseURL from "../config";
import Swal from "sweetalert2";


function convertTo12HourFormat(time24) {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = time24.split(':').map(Number);

  // Determine whether it's AM or PM
  const period = hours < 12 ? 'AM' : 'PM';

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12;

  // Format the time in 12-hour format
  const time12 = `${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;

  return time12;
}

const MatchesCart = ({match}) => {
  const {_id, matchName, gender,matchDate, time,prone,fee,event,image} = match;




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
        if(response?.data?.statusCode == 200){
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
    return (
        <div className="border-2 border-[#FA1131] w-[370px] rounded-lg bg-[#ffffff]">
        <div className="p-[15px]">
          <div className="w-[340px] relative flex justify-center">
            <img className="rounded-lg " src={`${import.meta.env.VITE_BASE_URL}${image?.publicFileURL}`} alt="" />
            <span className="bg-[#fdf7f8] px-2 py-1 absolute top-2 left-2 text-[#FA1131] rounded-md font-bold
            ">{matchDate?.split("T")[0]}</span>
          </div>
          <div className="text-black flex justify-between items-center my-[12px]">
              <h1 className="text-[18px]">{matchName}</h1>
              <div className="flex gap-2">
                 <FaRegClock />
                  <p className="text-[12px]">{convertTo12HourFormat(time)}</p>
              </div>
          </div>
          <div className="text-black ">
          <p className="text-[12px] font-bold mb-[8px]">{gender === "Both" ? "Male/Female" : gender} : 3x20 Shots</p>
          <p className="text-[12px] font-bold  mb-[8px]">{prone}</p>
          {/* <p className="text-[10px] font-normal  mb-[8px]">Prone,standing & kneeling </p> */}
          <div className="flex justify-between items-center  mb-[8px]">
          <p className="text-[12px] font-bold">Registration fee : </p>
          <p className="text-[12px] font-bold">R {fee} Per Entry</p>
          </div>
          </div>
          <div className="flex justify-between mt-[24px]">
              <p onClick={() => handleDelete(_id)} className="flex justify-center w-[160px] cursor-pointer text-[#FA1131] py-[8px] bg-[#ffe5e8] border-2 border-[#FA1131] rounded-md">Delete</p>
              <Link to={`/matches/edit-matches/${_id}`} className="flex justify-center w-[160px] cursor-pointer text-white py-[8px] bg-[#FA1131] rounded-md">Edit</Link>
          </div>
        </div>
      </div>
    );
}

export default MatchesCart;
