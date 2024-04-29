import { Link } from "react-router-dom";
import MatchesCart from "../MatchesCart";

const DashboardMatchesList = () => {
  return (
    <div>
      <div className="flex justify-between items-center my-[23px]">
        <h1 className="text-white text-[24px]">Our Matches</h1>
        <Link to="/" className="text-[16px] text-white mr-[21px]">
          See all
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <MatchesCart />

        <MatchesCart />

        <MatchesCart />

        <MatchesCart />
      </div>
    </div>
  );
};

export default DashboardMatchesList;
