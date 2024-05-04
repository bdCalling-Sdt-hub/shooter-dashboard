import { Link } from "react-router-dom";
import MatchesCart from "../MatchesCart";
import { useGetAllMatchQuery } from "../../redux/Features/getAllMatchApi";
const DashboardMatchesList = () => {
  const {data:AllMatch,isSuccess,isLoading} = useGetAllMatchQuery();
  return (
    <div>
      <div className="flex justify-between items-center my-[23px]">
        <h1 className="text-white text-[24px]">Our Matches</h1>
        <Link to="/matches" className="text-[16px] text-white mr-[21px]">
          See all
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-5">
      {
          AllMatch?.data?.attributes?.slice(0,4)?.map((match,index)=>(
            <MatchesCart key={index} match={match}/>
            
          ))
        }
       
      </div>
    </div>
  );
};

export default DashboardMatchesList;
