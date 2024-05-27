import { useParams } from "react-router-dom";
import { useGetEventREgisterListDetailsQuery } from "../../../redux/Features/getEventRegisterListDetails";
import { useState } from "react";
import { Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import EventRegistrationCsv from "../../../Components/EventRegistrationCsv";


const EventRegisterListDetails = () => {
    const {id} = useParams();
    console.log(id);
    const {data,isSuccess,isLoading,isError} = useGetEventREgisterListDetailsQuery({id,currentPage:1});
    const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  


  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (text,_,index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: "Match Name",
      dataIndex: "matches",
      key: "matches",
      render: (_, record) => (
        <p>
        {
            record?.matches?.map((match,index)=><div key={index}>
                <p>{`Match-${index+1}`}</p>
                {match?.matchName}
                </div>)
        }
        </p>
        // <p>{record?.match?.event ? record?.match?.event : "N/A"}</p>
      )
    },
     {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    //   render: (_, record) => (
    //     <p>{record?.match?.matchDate ? record?.match?.matchDate?.split("T")[0] : "N/A"}</p>
    //   )
    },
    {
      title: "Shoulder",
      dataIndex: "shoulder",
      key: "shoulder",
    },
    {
      title: 'Club Name',
      dataIndex: 'clubName',
      key: 'clubName',

    },{
        title: "Class Name",
        dataIndex: "className",
        key: "className",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    // {
    //     title: "Sharing Rifle",
    //     dataIndex: "sharingRifle",
    //     key: "sharingRifle",
    //   },
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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle ">
         
    //         <BsInfoCircle  onClick={() => handleView(record)}  size={18} className="text-[red] cursor-pointer" />
          
    //       {/* <a><RxCross2 size={18} className='text-[red]'/></a> */}
    //     </Space>
    //   ),
    // },
  ];

//   const handleView = (value) => {
//     setUser(value);
//     console.log(value);
//     setIsModalOpen(true);
//   };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleChangePage = (page) => {
    setCurrentPage(page);
    console.log(page);
  };
  console.log(user);
    console.log(data);
    console.log(data?.data?.attributes);
    return (
        <div className="ml-[24px]">
            {
               data?.data?.attributes.length ? <h1 className="text-white text-[24px]">Event Name : {data?.data?.attributes[0]?.event?.eventName}</h1> : ""
            }
           
        <div className="flex justify-between items-center">
            
          <h1 className="text-white text-[24px]">User Register</h1>
          {/* <DatePicker
            className="custom-date-picker"
            onChange={onChange}
            picker="month"
            suffixIcon
          />  */}
          {
            data?.data?.attributes.length &&  <EventRegistrationCsv data={data?.data?.attributes || []} />
          }
         
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
                total:data?.pagination?.Users,
                showSizeChanger: false,
                onChange: handleChangePage,
            }}
            columns={columns}
            dataSource={data?.data?.attributes}
          />
        </div>
        {/* <Modal
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
        </Modal> */}
          </div>
    );
}

export default EventRegisterListDetails;
