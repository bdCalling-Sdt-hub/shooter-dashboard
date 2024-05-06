import React, { useEffect, useState } from 'react';
import Status from '../../../Components/status';
import BarChartIncomeRatio from '../../../Components/BarChartIncomeRatio';
import DashboardUserList from '../../../Components/DashboardUserList';
import DashboardEventsList from '../../../Components/Dashboard/DashboardEventsList';
import DashboardMatchesList from '../../../Components/Dashboard/DashboardMatchesList';


const DashboardHome = () => {
    // const [data, setData] = useState([]);
    // console.log("movie",data);
    // useEffect(()=>{
    //     const data = fetch(`https://moviesdatabase.p.rapidapi.com/titles/series/%7BseriesId%7D`,{
    //         method: "GET",
    //         headers: {
    //             'X-RapidAPI-Key': '0bc9861865msh48ab8405de2f4f2p123651jsn44a1295a876b',
    //             'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    //           }
    // })
    //     .then(response => response.json())
    //     .then(data => setData(data))

    // },[])
    
    return (
        
        <div className='ml-[24px]'>
            <h1 className='text-[44px] text-white'>Overview</h1>
            <Status/>
            <BarChartIncomeRatio/>
            <DashboardUserList/>
            <DashboardEventsList/>
            <DashboardMatchesList/>
        </div>
    );
}

export default DashboardHome;
