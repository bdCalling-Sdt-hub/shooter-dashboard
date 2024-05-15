import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { BiSolidDashboard } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { BsCalendar2 } from "react-icons/bs";
import { BiDollarCircle } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { HiLogout } from "react-icons/hi";
import { TbTargetArrow } from "react-icons/tb";
import { FaCalendarDays } from "react-icons/fa6";
import Swal from "sweetalert2";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    
    Swal.fire({
      title: "Do you want to Logout from here?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user-update");

        navigate("/auth");
      } else if (result.isDenied) {
        Swal.fire("Ok", "", "info");
      }
    });
  };
  return (
    <div className="w-[300px] flex flex-col justify-between bg-[#281F1F] min-h-screen rounded-lg border-2 border-[#FA1131]">
      <div className="">
        <div className="p-[32px]">
          <img src={logo} alt="" />
        </div>
        <div className="">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "flex text-[#3BA6F6] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[white] m-[16px] rounded-lg "
                    : isActive
                    ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#FA1131]  m-[16px] rounded-lg border-2 border-gray-600"
                    : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                }
              >
                <div className="flex justify-start items-center gap-2">
                  <BiSolidDashboard width={25} height={25} /> Dashboard
                </div>
              </NavLink>
            </li>
            <NavLink
              to="/users"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                  : isActive
                  ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#FA1131]  m-[16px] rounded-lg"
                  : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px]  m-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                <HiOutlineUsers width={25} height={25} />
                All Users
              </div>
            </NavLink>

           

            <NavLink
              to="/events"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                  : isActive
                  ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#FA1131]  m-[16px] rounded-lg"
                  : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px]  m-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                <FaCalendarDays width={25} height={25} />
                Events
              </div>
            </NavLink>

            {/* <NavLink
              to="/events-register-list"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                  : isActive
                  ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#FA1131]  m-[16px] rounded-lg"
                  : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px]  m-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                <BsCalendar2 width={25} height={25} />
                Event Register List
              </div>
            </NavLink> */}

            {/* <NavLink
              to="/matches"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                  : isActive
                  ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#FA1131]  m-[16px] rounded-lg"
                  : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px]  m-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                <TbTargetArrow width={25} height={25} />
                Matches
              </div>
            </NavLink> */}

            <NavLink
              to="/settings"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#281F1F] m-[16px] rounded-lg"
                  : isActive
                  ? "flex text-white gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px] bg-[#FA1131]  m-[16px] rounded-lg"
                  : "flex text-[white] gap-2 cursor-pointer items-center text-[18px] font-medium p-[20px]  m-[16px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                <CiSettings width={25} height={25} /> <span className="flex-1"> Settings</span>
              </div>
            </NavLink>
          </ul>
        </div>
      </div>
      <div className="mb-[32px]">
        <div
          onClick={handleLogOut}
          className="flex items-center ml-[18px] cursor-pointer gap-2 text-[red] font-medium"
        >
          <HiLogout width={25} height={25} />
          <span className="text-[20px] ">Log Out</span>
        </div>
        {/* <Link to="/" className="flex items-center ml-[18px] cursor-pointer gap-2 text-[#3BA6F6] font-medium">
            
          </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;
