import { Link } from "react-router-dom";
import eventImg from "../assets/eventImg2.png";
import { CiLocationOn } from "react-icons/ci";
import baseURL from "../config";
import Swal from "sweetalert2";
import { FaRegClock } from "react-icons/fa";

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

const EventCart = ({ event }) => {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const {
    eventName,
    location,
    description,
    image,
    closeDate,
    eventDate,
    matches,
    fee,
    eventTime,
    _id,
  } = event;
  console.log(eventName);
  const startingDate = new Date(eventDate);
  console.log(matches);

  // Current date
  const currentDate = new Date();

  let formattedDuration;

  // Check if the current date is greater than the starting date
  if (currentDate > startingDate) {
    formattedDuration = "0d : 0h : 0m";
  } else {
    // Calculate the difference in milliseconds between the current date and starting date
    const timeDifference = startingDate - currentDate;

    // Convert milliseconds to days, hours, and minutes
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    // Format the duration
    formattedDuration = `${days}d : ${hours}h : ${minutes}m`;
  }

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
        const response = await baseURL.delete(`/events/remove/${id}`, {
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
          }, 1600);
        }
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "", "info");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      Swal.fire("Error", "Failed to delete event", "error");
    }
  };

  console.log("img", image);
  // console.log(formattedDuration);
  return (
    <div className="border-2 border-[#FA1131] w-[370px] rounded-lg bg-[#FFE7EA21]">
      <div className="p-[15px]">
        <div className="w-[340px] relative flex justify-center">
          <img
            className="rounded-lg "
            src={`${import.meta.env.VITE_BASE_URL}${image?.publicFileURL}`}
            alt=""
          />
          <span
            className="bg-[#ffe5e8] px-2 py-1 absolute top-2 left-2 text-[#FA1131] rounded-md font-bold
          "
          >
            {eventDate?.split("T")[0]}
          </span>
        </div>
        <div>
          <div className="text-white flex justify-between mt-[12px]">
            <div>
              <h1 className="text-[28px]">{eventName}</h1>
              <p className="text-[15px] mt-2">Registration Close Date:</p>
              <p className="text-[15px]">{closeDate?.split("T")[0]}</p>
              <p className="text-[15px] mt-2">Event Date:</p>
              <p className="text-[15px]">{eventDate?.split("T")[0]}</p>
            </div>
            <div className="mt-[12px]">
              <div className="text-white flex items-center gap-1 my-2">
                <CiLocationOn  size={15} />
                <p className="text-[15px]">{location}</p>
              </div>
              <p className="text-[15px]">Started In:</p>
              <p className="text-[15px]">{formattedDuration}</p>
              <div className="flex gap-2 mt-3">
            <FaRegClock />
            <p className="text-[12px]">{convertTo12HourFormat(eventTime)}</p>
          </div>
            </div>
           
          </div>
          <div className="text-white mt-[12px]">
              <p className="text-[20px]">Fee : {fee}</p>
            </div>
           
        </div>
{/* <p className="text-[22px] text-white">Matches</p> */}
        {/* <div className="grid grid-cols-2">
         
          {
            // eslint-disable-next-line react/prop-types
            matches?.map((match, index) => (
              <div
                key={index}
                className="text-[12px] text-[white] flex gap-3 mt-2"
              >
                <div>
                  <p>{`Match ${index + 1}`}</p>
                  <p>Match: {match?.matchName}</p>
                  <p>Description: {match?.description}</p>
                </div>
              </div>
            ))
          }
        </div> */}
        <div className="flex justify-between mt-[24px]">
          <p
            onClick={() => handleDelete(_id)}
            className="flex justify-center w-[160px] cursor-pointer text-[#FA1131] py-[8px] bg-[#ffe5e8] border-2 border-[#FA1131] rounded-md"
          >
            Delete
          </p>
          <Link
            to={`/events/edit-event/${_id}`}
            className="flex justify-center w-[160px] cursor-pointer border-2 border-[#FFE5E8] text-white py-[8px] bg-[#FA1131] rounded-md"
          >
            Edit
          </Link>
        </div>
        <Link className='py-2 px-3 my-2 b border-2 border-[#FFE5E8] bg-[#FA1131] text-white rounded-md w-full block text-center' to={`/events-register-list/${_id}`}>User Register List </Link>
        <div className=" mt-[2px] text-center bg-[#FA1131] py-[8px] rounded-md text-white border-2 border-[#FFE5E8]  ">
          <Link
            to={`/match/${_id}`}
            className=" cursor-pointer"
          >
            Match
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCart;
