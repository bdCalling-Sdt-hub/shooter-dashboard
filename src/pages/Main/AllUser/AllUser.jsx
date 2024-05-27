import { DatePicker, Modal, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useGetAllUserQuery } from "../../../redux/Features/getAllUserApi";
import Loading from "../../../Components/Loading";

const AllUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const { data: usersAll , isLoading, isSuccess } = useGetAllUserQuery();

if(isLoading){
  <Loading/>
}
console.log(usersAll);
  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (text,_,index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img
            className="w-[34px] h-[34px] rounded-full"
            src={`${import.meta.env.VITE_BASE_URL}${record?.image?.publicFileURL}`}
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
        </div>
        <Table
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
              pageSize:10,
              total:usersAll?.pagination?.Users,
              showSizeChanger: false,
              onChange: handleChangePage,
          }}
          columns={columns}
          dataSource={usersAll?.data?.attributes}
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
          <img className="w-[140px] h-[140px] rounded-full my-4"   src={`${import.meta.env.VITE_BASE_URL}${user?.image?.publicFileURL}`} alt="" />
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
              {user?.userClass ? user?.userClass : "N/A"}
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
};

export default AllUser;
