import { Link } from "react-router-dom";
import EventCart from "../EventCart";
import { useGetAllEventQuery } from "../../redux/Features/getAllEventApi";


const DashboardEventsList = () => {
    const {data:AllEvent,isSuccess,isLoading} = useGetAllEventQuery();
    return (
        <div>
            <div className="flex justify-between items-center my-[23px]">
                <h1 className="text-white text-[24px]">Our Events</h1>
                <Link to='/events' className="text-[16px] text-white mr-[21px]">See all</Link>
            </div>
            <div className="grid grid-cols-4 gap-5">
            {
          AllEvent?.data?.attributes?.slice(0,4)?.map((event)=>(
            <EventCart key={event._id} event={event}/>
            
          ))
        }
          
            </div>
            
        </div>
    );
}

export default DashboardEventsList;
