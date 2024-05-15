import React, { useState } from 'react';
import { useGetAllEventQuery } from '../../../redux/Features/getAllEventApi';
import EventCart from '../../../Components/EventCart';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import EventListCard from '../../../Components/EventListCard';

const EventREgisterList = () => {
   
    const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const {data:AllEvent,isSuccess,isLoading} = useGetAllEventQuery(currentPage);

  const onChange = (values) => {
    console.log(values);
    setCurrentPage(values);
  };
    return (
        <div>
            <p className='text-white ml-5 text-[30px]'>
                Events
            </p>
            <div className="grid lg:grid-cols-4 gap-3 my-7">
        {
          AllEvent?.data?.attributes?.map((event,index)=>(
            <EventListCard key={event._id} event={event} index={index}/>
            
          ))
        }
            
            
         
      </div>
           

      <div className="flex justify-center my-10">
        <Pagination
          onChange={onChange}
          defaultCurrent={1}
          current={currentPage}
          pageSize={8}
            // total={totalMembershipCart}
          total={AllEvent?.pagination?.totalEvents}
        />
      </div>
        </div>
    );
}

export default EventREgisterList;
