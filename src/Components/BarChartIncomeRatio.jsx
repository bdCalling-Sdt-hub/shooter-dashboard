import { DatePicker } from "antd";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetChartQuery } from "../redux/Features/getChartApi";
import Loading from "./Loading";
import { useState } from "react";


const BarChartIncomeRatio = () => {
  const [year,setYear ] = useState('2024');
  const {data:chart,isError,isLoading,isSuccess} = useGetChartQuery(year);
  if(isLoading){
    return <Loading/>
  }
  const onChange = (date, dateString) => {
    console.log(dateString);
    setYear(dateString)
  };
 console.log(chart);
  return (
    <div className="bg-[#281F1F] w-full text-white  h-[318px] mt-5 rounded-xl border-2 border-[#FA1131] shadow-xl ">
      <div className="flex justify-between p-[16px]">
        <div>
          <h1 className="text-[20px] font-medium">Earning</h1>
          {/* <div className="flex gap-5 mt-[20px]">
              <div className="flex gap-2 items-center">
                <span className="bg-[#54A630] w-4 h-4 rounded-full"></span>
                <span>This month</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="bg-[#B0D6A0] w-4 h-4 rounded-full"></span>
                <span>Last month</span>
              </div>
            </div> */}
        </div>
        <div className="bg-[#281F1F]">
          <DatePicker
            className="custom-date-picker"
            onChange={onChange}
            picker="year"
            suffixIcon
          />
        </div>
      </div>
      <div>
        <BarChart
          width={1500}
          height={250}
          data={chart?.data?.attributes}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ stroke: "white", strokeWidth: 0.5 }} />
          <YAxis tick={{ stroke: "white", strokeWidth: 0.5 }} />
          <Bar
            dataKey="price"
            fill="#FA1131"
            barSize={36}
            // activeBar={<Rectangle fill="pink" stroke="green" />}
          />
          {/* <Bar
              dataKey="ThisMonth"
              fill="#54A630"
              barSize={6}
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            /> */}
        </BarChart>
      </div>
    </div>
  );
};

export default BarChartIncomeRatio;
