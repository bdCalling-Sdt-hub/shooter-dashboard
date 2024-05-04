import { Pagination } from "antd";
import NotificationCart from "../../../Components/NotificationCart";
import { useGetAdminNotificationQuery } from "../../../redux/Features/getAdminNotificationApi";
import { useState } from "react";
import Loading from "../../../Components/Loading";


const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {data,isSuccess,isLoading} = useGetAdminNotificationQuery(currentPage);
  if(isLoading){
    return <Loading/>
  }
  console.log(data?.data);
  const onChange = (values) => {
    console.log(values);
    setCurrentPage(values);
  };
    return (
        <div>
        <div className="pl-[24px] ">
          <div className="rounded-xl overflow-hidden">
            <div className="">
              <h1 className="text-[24px] text-primary text-white font-semibold pb-3">
                Notification
              </h1>
            </div>
            <div className="flex flex-col">
              {
                data?.data?.attributes?.map((item,index)=>(
                  <NotificationCart key={item?._id} item={item}/>
                ))
              }
            
            </div>
            <div className="flex justify-center my-10">
              <Pagination
                onChange={onChange}
                defaultCurrent={1}
                total={data?.pagination?.totalNotification}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Notification;
