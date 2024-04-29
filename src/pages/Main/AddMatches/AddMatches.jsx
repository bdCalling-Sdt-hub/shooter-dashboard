import {
  DatePicker,
  Form,
  Input,
  ConfigProvider,
  Space,
  Typography,
  TimePicker,
  Radio,
  Select,
  Checkbox,
} from "antd";
import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import JoditEditor from "jodit-react";
import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { useGetAllEventQuery } from "../../../redux/Features/getAllEventApi";
dayjs.extend(buddhistEra);
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2";
import baseURL from "../../../config";

const AddMatches = () => {
  const { data, isLoading, isSuccess } = useGetAllEventQuery();
  const navigate = useNavigate();
  const [matchDate, setMatchDate] = useState("");
  const  [matchTime,setMatchTime] = useState("");

 
  // const editor = useRef(null);

  console.log(data?.data);
  if (isLoading) {
    return <Loading />;
  }

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.success(`${info.file.name} file uploaded successfully`);
      }
    },
  };
  const onChangeDate = (_, dateStr) => {
    console.log("onChange:", dateStr);
    setMatchDate(dateStr);
  };
  const onChangeTime = (_, dateStr) => {
    console.log("onChange:", dateStr);
    setMatchTime(dateStr);
  };



  const handleAddMatch = async(values) => {
    try{
      const match = {
        ...values,
        matchDate: matchDate,
        time: matchTime,
      }
      console.log("---------------",match);
      const formData = new FormData();

      formData.append("matchName", match?.matchName);
      formData.append("gender", match?.gender);
      formData.append("matchDate", match?.matchDate);
      formData.append("time", match?.time);
      formData.append("prone", match?.prone);
      formData.append("fee", match?.fee);
      formData.append("event", match?.event);
      if (match?.image) {
        formData.append("image", match?.image?.fileList[0].originFileObj);
      }



      const response = await baseURL.post(
        "/match/add",formData,{
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      console.log(response?.data);
      if(response?.data?.statusCode == 200){
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: response?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1600);
        // navigate("/matches");
      }
    }catch(error){
      Swal.fire({
        icon: "error",
        title: "Try Again...",
        text: error?.response?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      })
    }
   
  };
  return (
    <div className="ml-[24px] overflow-auto">
      <div className="mt-[44px] cursor-pointer text-white flex items-center pb-3 gap-2">
        <MdOutlineKeyboardArrowLeft
          onClick={() => navigate("/events")}
          size={34}
        />
        <h1 className="text-[24px] text-primary font-semibold">Add Matches</h1>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={handleAddMatch}
          //   onFinishFailed={handleCompanyInformationFailed}
          autoComplete="off"
        >
          <div className="flex gap-5">
            <Form.Item
              name="matchName"
              label={
                <span className="text-white text-[18px] ">Match Name</span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your Match Name!",
                },
              ]}
            >
              <Input
                // name="publisherName"
                // onChange={(e) => setPublisherName(e.target.value)}
                placeholder="Match Name"
                className="p-4 bg-[#FFE7EA4F]
              rounded w-full 
              justify-start 
              border-none
              mt-[12px]
              text-white
              items-center 
              gap-4 inline-flex outline-none focus:border-none"
              />
            </Form.Item>

            <Form.Item
              name="event"
              label={
                <span className="text-white text-[18px] ">Event Name</span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input Event Name!",
                },
              ]}
            >
              <Select
                className=" bg-[#706768]
            rounded
            mt-[12px]
            text-white
            "
              >
                {data?.data?.attributes?.map((item) => (
                  <>
                    <Select.Option value={item?.name}>
                      {item?.name}
                    </Select.Option>
                  </>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <Form.Item
              name="gender"
              label={<span className="text-white text-[18px] ">Gender</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your Gender!",
                },
              ]}
            >
              {/* <Input
                // onChange={(e) => setBlogName(e.target.value)}
                placeholder="Location"
                className="p-4 bg-[#FFE7EA4F]
            rounded w-full 
            justify-start 
            border-none
            mt-[12px]
            text-white
            items-center 
            gap-4 inline-flex outline-none focus:border-none"
                type="text"
              /> */}
              <Radio.Group
                className="p-4 bg-[#FFE7EA4F]
            rounded w-full 
            justify-start 
            border-none
            mt-[12px]
            text-white
            items-center 
            gap-4 inline-flex outline-none focus:border-none"
                // options={options}
                // defaultValue={["Apple"]}
                // style={{ color: "white" }}
                // onChange={onChangeCheckBox}
              >
                <Radio className="text-white" value="Male">
                  {" "}
                  Male{" "}
                </Radio>
                <Radio className="text-white" value="Female">
                  {" "}
                  Female{" "}
                </Radio>
                <Radio className="text-white" value="Both">
                  {" "}
                  Both{" "}
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="matchDate"
              label={
                <span className="text-white text-[18px] ">Match Date</span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your Match Date!",
                },
              ]}
            >
              <DatePicker
                className="p-4 bg-[#FFE7EA4F]
            rounded w-full 
            justify-start 
            border-none
            mt-[12px]
            text-white
            items-center 
            gap-4 inline-flex outline-none focus:border-none"
                onChange={onChangeDate}
              />
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <Form.Item
              name="time"
              label={
                <span className="text-white text-[18px] ">Start Time</span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your  Started In!",
                },
              ]}
            >
              <TimePicker
                className="p-4 bg-[#FFE7EA4F]
            rounded w-full 
            justify-start 
            border-none
            mt-[12px]
            text-white
            items-center 
            gap-4 inline-flex outline-none focus:border-none"
                // showTime
                onChange={onChangeTime}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-[white]  text-[18px] ">
                  {" "}
                  Upload Image
                </span>
              }
              name="image"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!",
                },
              ]}
            >
              <Upload
                className="p-3 bg-[#FFE7EA4F]
              rounded w-full 
              mt-[12px]
              gap-5
              inline-flex"
                {...props}
              >
                <Button
                  className="text-white hover:text-red-600"
                  icon={<UploadOutlined />}
                >
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <Form.Item
              name="prone"
              label={<span className="text-white text-[18px] ">Prone</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input Prone!",
                },
              ]}
            >
              <Input
                // onChange={(e) => setBlogName(e.target.value)}
                placeholder="1x600"
                className="p-4 bg-[#FFE7EA4F]
            rounded w-full 
            justify-start 
            border-none
            mt-[12px]
            text-white
            items-center 
            gap-4 inline-flex outline-none focus:border-none"
                type="text"
              />
            </Form.Item>
            <Form.Item
              name="fee"
              label={
                <span className="text-white text-[18px] ">Match Entry Fee</span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your Match Date!",
                },
              ]}
            >
              <Input
                // onChange={(e) => setBlogName(e.target.value)}
                placeholder="Rand 600"
                className="p-4 bg-[#FFE7EA4F]
            rounded w-full 
            justify-start 
            border-none
            mt-[12px]
            text-white
            items-center 
            gap-4 inline-flex outline-none focus:border-none"
                type="text"
              />
            </Form.Item>
          </div>

          <Button
            htmlType="submit"
            // onClick={handleAddToBlog}
            block
            className="block w-[500px] h-[56px] mt-[30px] px-2 py-4  text-white bg-gradient-to-r from-red-500 to-red-800 rounded-lg hover:bg-red-600"
            style={{
              marginTop: "30px",
              backgroundColor: "red",
              color: "#fff",
              size: "18px",
              height: "56px",
            }}
          >
            Add Event
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddMatches;
