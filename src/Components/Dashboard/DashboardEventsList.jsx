import { Link } from "react-router-dom";
import EventCart from "../EventCart";


const DashboardEventsList = () => {
    return (
        <div>
            <div className="flex justify-between items-center my-[23px]">
                <h1 className="text-white text-[24px]">Our Events</h1>
                <Link to='/' className="text-[16px] text-white mr-[21px]">See all</Link>
            </div>
            <div className="grid grid-cols-4 gap-5">
            
            <EventCart/>
            <EventCart/>
            <EventCart/>
            <EventCart/>
            </div>
            
        </div>
    );
}

export default DashboardEventsList;
