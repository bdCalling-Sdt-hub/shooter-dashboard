import { Link } from "react-router-dom";
import eventImg from "../assets/eventImg2.png";
import { CiLocationOn } from "react-icons/ci";
import baseURL from "../config";
import Swal from "sweetalert2";

const EventCart = ({ event }) => {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const { name, description, closingDate, startedDate, location, image, _id } = event;
  console.log(event);
  const startingDate = new Date(startedDate);

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


     

    

console.log("img",image);
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
           {startedDate?.split("T")[0]}
          </span>
        </div>
        <div className="text-white flex justify-between my-[12px]">
          <h1 className="text-[18px]">{name}</h1>
          <div>
            <p className="text-[10px]">Started In:</p>
            <p className="text-[12px]">{formattedDuration}</p>
            <p className="text-[10px] mt-2">Closing Date:</p>
           < p className="text-[12px]">{closingDate?.split("T")[0]}</p>
          </div>
        </div>
        <div className="text-white flex items-center gap-2">
          <CiLocationOn />
          <p className="text-[12px]">{location}</p>
        </div>
        <div className="flex justify-between mt-[24px]">
          <p
            onClick={() => handleDelete(_id)}
            className="flex justify-center w-[160px] cursor-pointer text-[#FA1131] py-[8px] bg-[#ffe5e8] border-2 border-[#FA1131] rounded-md"
          >
            Delete
          </p>
          <Link
            to={`/events/edit-event/${_id}`}
            className="flex justify-center w-[160px] cursor-pointer text-white py-[8px] bg-[#FA1131] rounded-md"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCart;
