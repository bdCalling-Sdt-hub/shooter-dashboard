import React from 'react';
import { Link } from 'react-router-dom';


function convertTo12HourFormat(time24) {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = time24.split(":").map(Number);
  
    // Determine whether it's AM or PM
    const period = hours < 12 ? "AM" : "PM";
  
    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;
  
    // Format the time in 12-hour format
    const time12 = `${hours12}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
  
    return time12;
  }

const EventListCard = ({event,index}) => {
    const {_id,eventDate,eventName,eventTime,location,closeDate} = event
    return (
        <div className='text-white border-2 p-5 ml-5 border-[#FA1131] rounded-md'>
            <h1 className='text-2xl'> {`Event-${index+1}`}</h1>
            <h1 className='text-xl'>Event Name: {eventName}</h1>
            <h1>Event Date: {eventDate.split("T")[0]}</h1>
            <h1>Event Time: {convertTo12HourFormat(eventTime)}</h1>
            <h1>Location: {location}</h1>
            <h1>Registration Close Date: {closeDate.split("T")[0]}</h1>
            
            <Link className='py-2 px-3 mt-3 bg-[#FA1131] text-white rounded-md w-full block text-center' to={`/events-register-list/${_id}`}>User Register List </Link>
        </div>
    );
}

export default EventListCard;
