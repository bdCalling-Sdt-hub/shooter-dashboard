import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllPhotosQuery } from "../../../redux/Features/getAllPhotosApi";
import { FaPlus } from "react-icons/fa6";
import baseURL from "../../../config";
import Swal from "sweetalert2";

const AllPhotos = () => {
  const navigate = useNavigate();
  const { data, isSuccess, isFetching, isLoading } = useGetAllPhotosQuery();
  console.log(data);
  const result = data?.data?.attributes;
  console.log(result);
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
        const response = await baseURL.delete(`/library/photos/${id}`, {
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
  return (
    <div className="ml-5">
      <div className="flex my-5 justify-between items-center">
        <p className="text-white text-[24px]">All Photos </p>
        <div
          onClick={(e) => navigate("/library/add-photos")}
          className="flex gap-2 items-center py-[15px]
                 px-[40px]
                  bg-[#FA1131]
                  rounded-lg
                  text-white
                  cursor-pointer
                  "
        >
          <FaPlus size={17} />
          <p>Add Photos</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {result?.map((item, index) => {
          return (
            <div
              key={index}
              className="border-2 rounded-md  border-[#FA1131] p-3"
            >
              <div className="">
                <img
                  className="h-[90%]"
                  key={index}
                  src={`${import.meta.env.VITE_BASE_URL}${
                    item?.image?.publicFileURL
                  }`}
                  alt=""
                />
              </div>

              <div className="lg:flex gap-2 my-3 ">
                {/* <p onClick={()=>navigate(`/library/edit-photo/${item?._id}`)} className='flex-1 cursor-pointer mt-2 text-center text-[#FA1131] px-10 py-2 rounded-md bg-[#FFE5E8]'>Edit</p> */}
                <p
                  onClick={() => handleDelete(item?._id)}
                  className="flex-1 cursor-pointer mt-2 text-center rounded-md text-white bg-[#FA1131] px-10 py-2"
                >
                  Delete
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllPhotos;
