import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllDocumentsQuery } from '../../../redux/Features/getAllDocuments';
import { FaPlus } from 'react-icons/fa6';
import { FaFileCode } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import baseURL from '../../../config';
import { GrView } from "react-icons/gr";

const AllDocuments = () => {
    const navigate = useNavigate();
    const {data,isSuccess,isLoading,isError} = useGetAllDocumentsQuery();
    console.log(data);
    const document = data?.data?.attributes;
    console.log(document);
   
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
            const response = await baseURL.delete(`/library/documents/${id}`, {
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
      
    }
    return (
        <div className='ml-5'>
            
      <div className="flex my-5 justify-between items-center">
        <p className="text-white text-[24px]">All Documents </p>
        <div
          onClick={(e) => navigate("/library/add-documents")}
          className="flex gap-2 items-center py-[15px]
                 px-[40px]
                  bg-[#FA1131]
                  rounded-lg
                  text-white
                  cursor-pointer
                  "
        >
          <FaPlus size={17} />
          <p>Add Document</p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-5">
          {document?.map((document,index) => (

            <div
           
              
              key={index}
              className="p-5 bg-[#281F1F] rounded-lg cursor-pointer"
            >
              <div className="flex text-white justify-between items-center">
              <FaFileCode size={30} />
                <p className="text-white text-[18px] font-semibold">
                  {document?.document?.fileName}
                </p>
                <div className='flex items-center gap-2'>
                <Link   target="_blank" to={`${import.meta.env.VITE_BASE_URL}${ document?.document?.publicFileURL}`}>
                <GrView color='green' size={30} />
                </Link>
                <MdDeleteForever onClick={()=>handleDelete(document?._id)} color='red' size={30} />
                </div>
                
                
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
    );
}

export default AllDocuments;
