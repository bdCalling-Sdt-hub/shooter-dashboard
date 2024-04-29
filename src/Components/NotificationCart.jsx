import { IoIosNotificationsOutline } from "react-icons/io";


function calculateTimeDifference(dateString) {
    const now = new Date();
    const date = new Date(dateString);

    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (yearsAgo > 0) {
      return yearsAgo === 1 ? "1 year ago" : `${yearsAgo} years ago`;
    } else if (daysAgo > 0) {
      return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
    } else if (hoursAgo > 0) {
      return hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;
    } else if (minutesAgo > 0) {
      return minutesAgo === 1 ? "1 minute ago" : `${minutesAgo} minutes ago`;
    } else {
      return "just now";
    }
}

const NotificationCart = ({item}) => {
    return (
        <div  className={`flex rounded-lg my-[16px]  ${
            "true" ? "bg-white" : "bg-[#e8e6fca8]"
        } p-[16px] gap-[16px] justify-between items-center`}>
             <div className={`flex gap-[16px] items-center p-[16px] `}>
              {/* <div className="w-10 h-10 flex p-[7px] rounded bg-[#EEF6EA] "> */}
              <IoIosNotificationsOutline
                style={{ cursor: "pointer" }}
                className={` bg-primary w-[52px] h-[52px] text-[#FA1131] border-2 border-[#3BA6F6] rounded-full p-2 `}
              />
              {/* </div> */}
              
                <h1 className="text-[16px] font-normal">
                    {`Ahad`} has booked an appointment for 
                    {/* {message}. */}
                </h1>
                {/* <p className="text-[14px] text-[#979797]">{formatDate(createdAt)}</p> */}
            
            </div>
            <div>
                <small>{calculateTimeDifference("2024-03-08T09:52:49.972Z")}</small>
            </div>
        </div>
    );
}

export default NotificationCart;
