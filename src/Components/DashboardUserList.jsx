import { Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";

import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useGetAllUserQuery } from "../redux/Features/getAllUserApi";
import Loading from "./Loading";
import { useState } from "react";


const DashboardUserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const { data: usersAll , isLoading, isSuccess } = useGetAllUserQuery();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(isLoading){
        <Loading/>
      }
      const columns = [
        {
          title: "#SI",
          dataIndex: "si",
          key: "si",
          render: (text,_,index) =>  index + 1,
        },
        {
          title: "User Name",
          dataIndex: "name",
          key: "name",
          render: (_, record) => (
            <div className="flex gap-2 items-center">
              <img
                className="w-[34px] h-[34px] rounded-full"
                src={`${import.meta.env.VITE_BASE_URL}/${record?.image?.publicFileURL}`}
                alt=""
              />
              <p className="font-medium">{record.name}</p>
            </div>
          ),
        },
        // {
        //   title: 'Phone',
        //   dataIndex: 'phone',
        //   key: 'phone',
        // },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          render: (_, record) => (
            <p>{emailPattern.test(record?.email) ?  record?.email : "Apple Or Facebook User"}</p>
          )
        },
        {
          title: "Club Name",
          dataIndex: "club",
          key: "club",
          render: (_, record) => (
            <p>{record?.club ? record?.club : "N/A"}</p>
          )
        },
        {
          title: "Date",
          key: "date",
          dataIndex: "date",
          render: (_, record) => (
            <p>{record?.createdAt?.split("T")[0] ? record?.createdAt?.split("T")[0] : "N/A"}</p>
          )
        },
        // {
        //   title: 'Amount',
        //   key: 'amount',
        //   dataIndex: 'amount',
    
        // },
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
             
                <BsInfoCircle  onClick={() => handleView(record)}  size={18} className="text-[red] cursor-pointer" />
              
              {/* <a><RxCross2 size={18} className='text-[red]'/></a> */}
            </Space>
          ),
        },
      ];
      const handleView = (value) => {
        setUser(value);
        console.log(value)
        setIsModalOpen(true);
      };
      const onChange = (date, dateString) => {
        console.log(date, dateString);
      };
      console.log(user);
      const handleChangePage = (page) => {
        setCurrentPage(page);
        console.log(page);
      };
    return (
      <div className="ml-[24px]">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-[24px]">All User</h1>
        {/* <DatePicker
          className="custom-date-picker"
          onChange={onChange}
          picker="month"
          suffixIcon
        /> */}
      </div>
      <div className="bg-[#281F1F] border-2 border-red-500 rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] mx-[20px] justify-between items-center">
          <p className="text-white test-[24px]">Customer List</p>
          <Link to="/users" className="text-white text-[16px]">View All</Link>
        </div>
        <Table
          pagination={false}
          columns={columns}
          dataSource={usersAll?.data?.attributes?.slice(0,5)}
        />
      </div>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        closeIcon
      >
      <div>
        <div style={{fontFamily:'Aldrich'}} className="flex justify-center items-center gap-2 flex-col border-b border-b-gray-300">
          <img className="w-[140px] h-[140px] rounded-full my-4"   src={`${import.meta.env.VITE_BASE_URL}/${user?.image?.publicFileURL}`} alt="" />
          <p className="text-white text-[16px] mb-[16px]">{user?.name}</p>
        </div>
        <div style={{fontFamily:'Aldrich'}} className="p-[20px] text-white">
        <div className="flex justify-between border-b py-[16px]">
            <p>Date:</p>
            <p>
              {user?.createdAt  ? user?.createdAt?.split("T")[0] : "N/A"}
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Full Name:</p>
            <p>
              {user?.name ? user?.name : "N/A"}
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px] ">
            <p>Email:</p>
            <p>
              {user?.email ? user?.email : "N/A"}
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Phone:</p>
            <p>
              {user?.phone ? user?.phone : "N/A"}
            </p>
          </div>
          {/* <div className="flex justify-between border-b py-[16px]">
            <p>Score:</p>
            <p>
              {user?.score ? user?.score : "N/A"}
            </p>
          </div> */}
          <div className="flex justify-between border-b py-[16px]">
            <p>Club Name:</p>
            <p>
              {user?.club ? user?.club : "N/A"}
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Class:</p>
            <p>
              {user?.class ? user?.class : "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center pt-[16px]">
            <p>Subscription:</p>
            <p className="px-[15px] py-[10px] bg-red-600 rounded-lg">
              {/* Regular P550 */}
              {user?.subscription}
            </p>
          </div>

        </div>
      </div>
      </Modal>
    </div>
    );
}

export default DashboardUserList;
