import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionCard = ({item}) => {
    const {name,price,description,type,duration,_id} = item;
    console.log(item);
    return (
        <div className='mt-5'>
            <div style={{backgroundColor:'rgba(178, 12, 35, 0.95)'}} className='bg-[rgba(178, 12, 35, 0.95)] text-center py-8 text-white text-[30px] rounded-t-md'>
                <h1>{type.toUpperCase()}</h1>
            </div>
            <div style={{backgroundColor:'rgba(217, 217, 217, 1)'}} className='px-[60px] bg-[rgba(217, 217, 217, 1)]'>
                <div className='flex text-[20px] justify-between items-center py-10 border-b-2 border-[#8C8C8C]'>
                    <p >Subscription Name  </p>
                    <p>{name}</p>
                </div>
                <div className='flex text-[20px] justify-between items-center py-10 border-b-2 border-[#8C8C8C] '>
                    <p>Month  </p>
                    <p>{duration}</p>
                </div>
                <div className='flex text-[20px] justify-between items-center py-10'>
                    <p>Price  </p>
                    <p>R{price}</p>
                </div>
                
            </div>
           
           <Link className='text-center py-5 text-white bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-b-md block' to={`/edit-subscription/${_id}`}  >Edit</Link>
        
                    
               
        </div>
    );
}

export default SubscriptionCard;
