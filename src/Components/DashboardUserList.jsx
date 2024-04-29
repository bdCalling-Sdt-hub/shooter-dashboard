import { Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";

import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";


const DashboardUserList = () => {
    const columns = [
        {
            title: '#SI',
            dataIndex: 'si',
            key: 'si',
            render: (text) => <a>{text}</a>,
          },
        {
          title: 'Full Name',
          dataIndex: 'name',
          key: 'name',
          render: (_, record) => (
            <div className='flex gap-2 items-center'>
              <img className='w-[34px] h-[34px] rounded-full' src={record.img} alt="" />
              <p className='font-medium'>{record.name}</p>
            </div>
          ),
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Type of Test',
            dataIndex: 'test',
            key: 'test',
          },
        {
            title: 'Date',
            key: 'date',
            dataIndex: 'date',
            
          },
          {
            title: 'Amount',
            key: 'amount',
            dataIndex: 'amount',
            
          },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <Link to={`/`} ><BsInfoCircle size={18} className='text-[#FA1131] ' /></Link>
              
            </Space>
          ),
        },
      ];
      const data = [
        {
          key: '1',
          si:1,
          name: 'John Brown',
          img:"https://i.ibb.co/T48mrYj/197381012-2915728158682381-6698162649397856913-n.jpg",
          phone: 3254546454,
          date:"02-24-2024",
          email:"ahad.aiman@gmail.com",
          test:"Alcohol",
          amount:500
        },
        {
            key: '2',
            si:2,
            name: 'John Brown',
            img:"https://i.ibb.co/T48mrYj/197381012-2915728158682381-6698162649397856913-n.jpg",
            phone: 3254546454,
            date:"02-24-2024",
            email:"ahad.aiman@gmail.com",
            test:"Alcohol",
            amount:500
          },
          {
            key: '3',
            si:3,
            name: 'John Brown',
            img:"https://i.ibb.co/T48mrYj/197381012-2915728158682381-6698162649397856913-n.jpg",
            phone: 3254546454,
            date:"02-24-2024",
            email:"ahad.aiman@gmail.com",
            test:"Alcohol",
            amount:500
          },
          {
            key: '4',
            si:4,
            name: 'John Brown',
            img:"https://i.ibb.co/T48mrYj/197381012-2915728158682381-6698162649397856913-n.jpg",
            phone: 3254546454,
            date:"02-24-2024",
            email:"ahad.aiman@gmail.com",
            test:"Alcohol",
            amount:500
          },
          {
            key: '5',
            si:5,
            name: 'John Brown',
            img:"https://i.ibb.co/T48mrYj/197381012-2915728158682381-6698162649397856913-n.jpg",
            phone: 3254546454,
            date:"02-24-2024",
            email:"ahad.aiman@gmail.com",
            test:"Alcohol",
            amount:500
          }
        
      ];
    return (
        <div className="bg-[#281F1F] border-2 border-[#FA1131] rounded-t-lg mt-[24px]">
            <div className="flex py-[22px] mx-[20px] justify-between items-center">
                <p className="text-white test-[24px]">User List</p>
                <Link className="text-white" to='/'>See all</Link>
            </div>
            <Table  
        //   pagination={
        //     {
        //       position:["bottomCenter"]
        //     }
        //   } 
        pagination={false}
          columns={columns} 
          dataSource={data} 
          className="custom-table"
        />
        </div>
    );
}

export default DashboardUserList;
