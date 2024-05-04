import React from 'react';
import Status from '../../../Components/status';
import BarChartIncomeRatio from '../../../Components/BarChartIncomeRatio';
import DashboardUserList from '../../../Components/DashboardUserList';
import DashboardEventsList from '../../../Components/Dashboard/DashboardEventsList';
import DashboardMatchesList from '../../../Components/Dashboard/DashboardMatchesList';


const DashboardHome = () => {
    
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
