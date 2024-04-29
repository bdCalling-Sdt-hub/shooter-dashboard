import { Pagination } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MatchesCart from "../../../Components/MatchesCart";

import Loading from "../../../Components/Loading";
import { useGetAllMatchQuery } from "../../../redux/Features/getAllMatchApi";



const Matches = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const {data:AllMatch,isSuccess,isLoading} = useGetAllMatchQuery(currentPage);

    const onChange = (values) => {
      console.log(values);
      setCurrentPage(values);
    };
    if(isLoading){
      return <Loading/>  
    }
    console.log("alllllll",AllMatch);
    return (
        <div className="ml-[24px]">
      <div className="flex justify-between items-center">
        <p className="text-white text-[24px]">Matches</p>
        <div
          onClick={(e) => navigate("/matches/add-matches")}
          className="flex gap-2 items-center py-[15px]
                 px-[40px]
                  bg-[#FA1131]
                  rounded-lg
                  text-white
                  cursor-pointer
                  "
        >
          <FaPlus size={17} />
          <p>Add Match</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-3 my-7">
      
        {
          AllMatch?.data?.attributes?.map((match,index)=>(
            <MatchesCart key={index} match={match}/>
            
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
            total={AllMatch?.pagination?.totalMatches}
        />
      </div>
    </div>
    );
}

export default Matches;
