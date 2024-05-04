import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useGetTermsConditionQuery } from "../../../redux/Features/getTermsConditionApi";
import Loading from "../../../Components/Loading";
import { useState } from "react";


const TermsAndConditions = () => {
    const navigate = useNavigate();
    const {data,isSuccess,isLoading} = useGetTermsConditionQuery();
    // const [content,setContent] = useState(data?.data?.attributes?.content);
    const content = data?.data?.attributes?.content;
    if(isLoading){
      return <Loading/>
    }
    console.log(data?.data?.attributes?.content);
        return (
        <div className="relative ml-[24px] ">
        <div className=" mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
       <MdOutlineKeyboardArrowLeft
        className="text-white"
      onClick={() => navigate("/settings")}
      size={34}
    />
        <h1 className="text-[24px] text-primary font-semibold text-white">
          Terms & Conditions
        </h1>
      </div>
      <div className=" text-justify mt-[24px] h-[70vh] overflow-y-auto border-2 p-2 text-white" dangerouslySetInnerHTML={{__html: content}}>
        
        </div>
    <Link to='/settings/edit-terms-conditions'className="absolute text-center bottom-[-60px] bg-gradient-to-r from-red-500 via-red-600 to-red-800 
        text-white mt-5 py-3 rounded-lg w-full text-[18px] font-medium  duration-200">Edit</Link>
        </div>
    );
}

export default TermsAndConditions;
