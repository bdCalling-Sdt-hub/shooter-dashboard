import { LuBadgeDollarSign } from "react-icons/lu";
import { MdEmojiEvents } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiUserStarLine } from "react-icons/ri";
import { useGetAllStatusQuery } from "../redux/Features/getAllStatusApi";
import Loading from "./Loading";
const Status = () => {
    const {data,isSuccess,isError,isLoading} = useGetAllStatusQuery();
    if(isLoading){
        return <Loading/>
    }
    console.log(data?.data?.attributes);
    const result = data?.data?.attributes;
    return (
        <div className="grid grid-cols-4 gap-[24px] mt-[24px]">
            <div className="bg-[#281F1F] px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 border-[#FA1131]">
                <LuBadgeDollarSign size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/>
                <div className="">
                    <p className="text-white">Total Earnings</p>
                    <h1 className="text-white text-[44px]">R {result?.totalEarnings || 0}</h1>
                </div>
            </div>
            <div className="bg-[#281F1F] px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 border-[#FA1131]">
                <MdEmojiEvents size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/>
                <div className="">
                    <p className="text-white">All Event</p>
                    <h1 className="text-white text-[44px]">{result?.totalEvents || 0}</h1>
                </div>
            </div>
            <div className="bg-[#281F1F] px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 border-[#FA1131]">
                <FaUsers size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/>
                <div className="">
                    <p className="text-white">All User</p>
                    <h1 className="text-white text-[44px]">{result?.allUsers || 0}</h1>
                </div>
            </div>
            <div className="bg-[#281F1F] px-[20px] py-[32px] flex justify-between items-center rounded-lg border-2 border-[#FA1131]">
                <RiUserStarLine size={81} color="white" className="bg-[#FA1131] p-[10px] rounded-full"/>
                <div className="">
                    <p className="text-white">Active User</p>
                    <h1 className="text-white text-[44px]">{result?.paidUsers || 0}</h1>
                </div>
            </div>
        </div>
    );
}

export default Status;
