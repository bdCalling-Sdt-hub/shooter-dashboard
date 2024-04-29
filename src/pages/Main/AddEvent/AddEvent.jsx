import {
  DatePicker,
  Form,
  Input,
  ConfigProvider,
  Space,
  Typography,
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
import moment from "moment";
import { usePostEventMutation } from "../../../redux/Features/PostEventApi";
import Swal from "sweetalert2";
import baseURL from "../../../config";
dayjs.extend(buddhistEra);
const { Title } = Typography;

// const buddhistLocale = {
//   ...en,
//   lang: {
//     ...en.lang,
//     fieldDateFormat: "BBBB-MM-DD",
//     fieldDateTimeFormat: "BBBB-MM-DD HH:mm:ss",
//     yearFormat: "BBBB",
//     cellYearFormat: "BBBB",
//   },
// };

// ConfigProvider level locale
// const defaultValue = dayjs("2024-01-01");

const AddEvent = () => {
  const [startDate, setStartDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [setEvent, response] = usePostEventMutation();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const editor = useRef(null);


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
  const onChangeClosingDate = (_, dateStr) => {
    console.log("onChange:", dateStr);
    setCloseDate(dateStr);
  };
  const onChangeStartingDate = (_, dateStr) => {
    console.log("onChange:", dateStr);
    setStartDate(dateStr);
  };

  const handleAddEvent = async (values) => {
    try {
      const event = {
        ...values,
        description,
        date: closeDate,
        startedIn: startDate,
      };
      console.log(event);
      const formData = new FormData();

      formData.append("name", event?.name);
      formData.append("location", event?.location);
      formData.append("closingDate", event?.date);
      formData.append("startedDate", event?.startedIn);
      formData.append("description", event?.description);
      if (event?.image) {
        formData.append("image", event?.image?.fileList[0].originFileObj);
      }

      // await setEvent(formData);

      const response = await baseURL.post(`/events/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });



      console.log(response?.data);
      if (response.data?.statusCode == 201) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: response.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1600);
        navigate("/events");
      }
    } catch (error) {
      console.log("Registration Fail", error);
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: error?.response?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="ml-[24px] overflow-auto">
      <div className="mt-[44px] cursor-pointer text-white flex items-center pb-3 gap-2">
        <MdOutlineKeyboardArrowLeft
          onClick={() => navigate("/events")}
          size={34}
        />
        <h1 className="text-[24px] text-primary font-semibold">Add Events</h1>
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
          onFinish={handleAddEvent}
          //   onFinishFailed={handleCompanyInformationFailed}
          autoComplete="off"
        >
          <div className="flex-1">
            <Form.Item
              name="name"
              label={
                <span className="text-white text-[18px] ">Events Name</span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your Events Name!",
                },
              ]}
            >
              <Input
                // name="publisherName"
                // onChange={(e) => setPublisherName(e.target.value)}
                placeholder="Events Name"
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
          </div>

          <div className="flex gap-5">
            <Form.Item
              name="location"
              label={<span className="text-white text-[18px] ">Location</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!",
                },
              ]}
            >
              <Input
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
              />
            </Form.Item>

            <Form.Item
              name="date"
              label={
                <span className="text-white text-[18px] ">
                  Event Closing Date
                </span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!",
                },
              ]}
            >
              {/* <ConfigProvider locale={globalBuddhistLocale}> */}
              <DatePicker
                // defaultValue={defaultValue}
                className="p-4 bg-[#FFE7EA4F]
            rounded w-full 
            justify-start 
            border-none
            mt-[12px]
            text-white
            items-center 
            gap-4 inline-flex outline-none focus:border-none"
                onChange={onChangeClosingDate}
              />
              {/* </ConfigProvider> */}
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <Form.Item
              name="startedIn"
              label={
                <span className="text-white text-[18px] ">Started In</span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your  Started In!",
                },
              ]}
            >
              {/* <ConfigProvider locale={globalBuddhistLocale}> */}
              <DatePicker
                // defaultValue={defaultValue}
                className="p-4 bg-[#FFE7EA4F]
            rounded w-full 
            justify-start 
            border-none
            mt-[12px]
            text-white
            items-center 
            gap-4 inline-flex outline-none focus:border-none"
                onChange={onChangeStartingDate}
              />
              {/* </ConfigProvider> */}
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

          <div className="flex-1 mt-[16px]">
            <label htmlFor="" className="text-white text-[18px] font-medium">
              Description
            </label>
            <div className="mt-[16px]">
              <JoditEditor
                ref={editor}
                value={description}
                onChange={(newContent) => {
                  setDescription(newContent);
                }}
                style={{ backgroundColor: "#FFE7EA4F" }}
              />
            </div>
          </div>
          <Button
            htmlType="submit"
            // onClick={handleAddEvent}
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

export default AddEvent;
