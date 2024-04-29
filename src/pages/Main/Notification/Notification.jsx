import { Pagination } from "antd";
import NotificationCart from "../../../Components/NotificationCart";


const Notification = () => {
    return (
        <div>
        <div className="pl-[24px] ">
          <div className="rounded-xl overflow-hidden">
            <div className="">
              <h1 className="text-[24px] text-primary font-semibold pb-3">
                Notification
              </h1>
            </div>
            <div className="flex flex-col">
              <NotificationCart/>
            </div>
            <div className="flex justify-center my-10">
              <Pagination
                // onChange={onChange}
                defaultCurrent={1}
                // total={totalResults}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Notification;
