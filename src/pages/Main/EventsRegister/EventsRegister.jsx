import { DatePicker, Modal, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useGetAllRegisterEventQuery } from "../../../redux/Features/getAllRegisterMatchApi";
import { render } from "react-dom";



const EventsRegister = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const { data: AllEvents, isLoading, isSuccess } = useGetAllRegisterEventQuery();
  console.log("aiiiiiiiiiiiiiii",AllEvents);
  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (text,_,index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "Match Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img
            className="w-[34px] h-[34px] rounded-full"
            src={`${import.meta.env.VITE_BASE_URL}${record?.match?.image?.publicFileURL}`}
            alt=""
          />
          <p className="font-medium">{record?.match?.matchName}</p>
        </div>
      ),
    },
    // {
    //   title: 'Phone',
    //   dataIndex: 'phone',
    //   key: 'phone',
    // },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      render: (_, record) => (
        <p>{record?.match?.event ? record?.match?.event : "N/A"}</p>
      )
    },
     {
      title: 'Match Date',
      dataIndex: 'matchDate',
      key: 'matchDate',
      render: (_, record) => (
        <p>{record?.match?.matchDate ? record?.match?.matchDate?.split("T")[0] : "N/A"}</p>
      )
    },
    {
      title: "Shooter Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img
            className="w-[34px] h-[34px] rounded-full"
            src={`${import.meta.env.VITE_BASE_URL}${record?.user?.image?.publicFileURL}`}
            alt=""
          />
          <p className="font-medium">{record?.fullName}</p>
        </div>
      ),
    },
    {
      title: 'Shooter Email',
      dataIndex: 'club',
      key: 'club',
      render: (_, record) => (
        <p>{record?.email ? record?.email : "N/A"}</p>
      )
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },

     {
      title: 'Club Name',
      dataIndex: 'club',
      key: 'club',
      render: (_, record) => (
        <p>{record?.clubName ? record?.clubName : "N/A"}</p>
      )
    },
    {
      title: "Registration Date",
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
        <Space size="middle ">
         
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
  const handleChangePage = (page) => {
    setCurrentPage(page);
    console.log(page);
  };
  console.log(user);
    return (
        <div className="ml-[24px]">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-[24px]">Match Register</h1>
        {/* <DatePicker
          className="custom-date-picker"
          onChange={onChange}
          picker="month"
          suffixIcon
        />  */}
      </div>
      <div className="bg-[#281F1F] border-2 border-red-500 rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] mx-[20px] justify-between items-center">
          <p className="text-white test-[24px]">Match Register List</p>
        </div>
        <Table
           pagination={{
            position: ["bottomCenter"],
            current: currentPage,
              pageSize:10,
              total:AllEvents?.pagination?.Users,
              showSizeChanger: false,
              onChange: handleChangePage,
          }}
          columns={columns}
          dataSource={AllEvents?.data?.attributes}
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
          <img className="w-[140px] h-[140px] rounded-full"  src={`${import.meta.env.VITE_BASE_URL}${user?.user?.image?.publicFileURL}`} alt="" />
          <p className="text-white text-[16px] mb-[16px]">{user?.user?.name}</p>
        </div>
        <div style={{fontFamily:'Aldrich'}} className="p-[20px] text-white">
        <div className="flex justify-between border-b py-[16px]">
            <p>Registration Date:</p>
            <p>
              {user?.createdAt?.split("T")[0] ? user?.createdAt?.split("T")[0] : "N/A"}
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Full Name:</p>
            <p>
              {user?.user?.name ? user?.user?.name : "N/A"}
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px] ">
            <p>Email:</p>
            <p>
              {user?.user?.email ? user?.user?.email : "N/A"}
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px] ">
            <p>Date of Birth:</p>
            <p>
              {user?.user?.dateOfBirth?.split("T")[0] ? user?.user?.dateOfBirth?.split("T")[0] : "N/A"}
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Age:</p>
            <p>
              {user?.age ? user?.age : "N/A"}
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Phone Number:</p>
            <p>
            {user?.user?.phone ? user?.user?.phone : "N/A"}
             
            </p>
          </div>
          <div className="flex justify-between border-b py-[16px]">
            <p>Club Name:</p>
            <p>
            {user?.clubName ? user?.clubName : "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center pt-[16px]">
            <p>Subscription:</p>
            <p className="px-[15px] py-[10px] bg-red-600 rounded-lg">
              {user?.user?.subscription ? user?.user?.subscription.toUpperCase() : "N/A"}
            </p>
          </div>

        </div>
      </div>
      </Modal>
    </div>
    );
}

export default EventsRegister;
