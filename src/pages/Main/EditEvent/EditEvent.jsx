import {
  DatePicker,
  Form,
  Input,
  ConfigProvider,
  Space,
  Typography,
  TimePicker,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import JoditEditor from "jodit-react";
import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { useGetSingleEventQuery } from "../../../redux/Features/getSingleEventApi";
dayjs.extend(buddhistEra);
const { Title } = Typography;
import moment from "moment";
import Loading from "../../../Components/Loading";
import baseURL from "../../../config";
import Swal from "sweetalert2";
import { usePostEditEventMutation } from "../../../redux/post/postEditEventApi";

const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [setData,{isLoading:loading}] = usePostEditEventMutation()
  console.log(id);
  const { data, isSuccess, isError, isLoading } = useGetSingleEventQuery(id);
  const [closeDate, setCloseDate] = useState(data?.data?.attributes?.closeDate);
  const [eventDate, setEventDate] = useState("");
  const [img, setImg] = useState(
    `${import.meta.env.VITE_BASE_URL}${
      data?.data?.attributes?.image?.publicFileURL
    }`
  );
  const [description, setDescription] = useState(
    data?.data?.attributes?.description
  );
  const [eventTime, setEventTime] = useState("");
  useEffect(() => {
    setImg(
      `${import.meta.env.VITE_BASE_URL}${
        data?.data?.attributes?.image?.publicFileURL
      }`
    );
  }, [data?.data?.attributes?.image?.publicFileURL]);

  useEffect(() => {
    setDescription(data?.data?.attributes?.description);
    setEventDate(data?.data?.attributes?.eventDate);
    setCloseDate(data?.data?.attributes?.closeDate);
    setEventTime(data?.data?.attributes?.eventTime);
  }, [data]);

  const [updateImage, setUpdateImage] = useState(null);
  // const [fileList, setFileList] = useState([]);
  const editor = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // You may want to add validation here to ensure it's an image file
    setUpdateImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const onChangeEventDate = (_, dateStr) => {
    console.log("onChange:", dateStr);
    setEventDate(dateStr);
  };
  const onChangeTime = (_, dateStr) => {
    console.log("onChange:", dateStr);
    setEventTime(dateStr);
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleEditEvents = async (values) => {
    try {
      const event = {
        ...values,
        description,
        closeDate,
        eventDate,
        eventTime,
      };
      console.log(event);
      const formData = new FormData();

      formData.append("eventName", event?.eventName);
      formData.append("location", event?.location);
      formData.append("closeDate", event?.closeDate);
      formData.append("eventDate", event?.eventDate);
      formData.append("description", event?.description);
      formData.append("matches", JSON.stringify(event?.matches));
      formData.append("fee", event?.fee);
      formData.append("eventTime", event?.eventTime);
      if (updateImage) {
        formData.append("image", updateImage);
      }

      // const response = await baseURL.put(`/events/update/${id}`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // });
      const response = await setData({formData,id})
      console.log("ahad===========",response);
      if (response.data?.status == "success") {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1600);
        navigate("/events");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: error?.response?.data?.message,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }

    // console.log(formData);
  };

  const onChangeClosingDate = (_, dateStr) => {
    console.log("onChange:", dateStr);
    setCloseDate(dateStr);
  };

  const Event = data?.data?.attributes;
  console.log(data);
  return (
    <div className="ml-[24px] overflow-auto">
      <div className="mt-[44px] cursor-pointer text-white flex items-center pb-3 gap-2">
        <MdOutlineKeyboardArrowLeft
          onClick={() => navigate("/events")}
          size={34}
        />
        <h1 className="text-[24px] text-primary font-semibold">Edit Events</h1>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          initialValues={{
            eventName: Event?.eventName,
            location: Event?.location,
            description: Event?.description,
            fee: Event?.fee,
            matches: Event?.matches,
          }}
          onFinish={handleEditEvents}
          autoComplete="off"
        >
          <div className="flex gap-5">
            <Form.Item
              name="eventName"
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
            <Form.Item
              name="location"
              label={<span className="text-white text-[18px] ">Location</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input Location!",
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
          </div>

          <div className="flex gap-5">
            <Form.Item
              label={
                <span className="text-white text-[18px] ">
                  Time: {eventTime}{" "}
                </span>
              }
              className="flex-1"
              rules={[
                {
                  required: false,
                  message: "Please input Start Time!",
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
              name="fee"
              label={<span className="text-white text-[18px] ">Entry Fee</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input Match Entry Fee!",
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

          <div className="flex-1">
            {/* <img className="w-[10%] h-[10%] rounded-xl border-2 border-red-500" src={img} alt="" /> */}

            <Form.Item
              label={
                <span className="text-[white] text-[18px] "> Upload Image</span>
              }
              name="image"
              className="flex-1"
              rules={[
                {
                  // required: true,
                  message: "Please input Image!",
                },
              ]}
            >
              {/* <Upload
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
              </Upload> */}
              <div className="bg-[#FFE7EA4F] p-3 rounded">
                {previewImage ? (
                  <img
                    className="w-20 h-20 rounded-full"
                    src={previewImage}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-[10%] h-[10%] rounded-xl border-2 border-red-500"
                    src={img}
                    alt=""
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  // Only allows image files
                  onChange={handleImageChange}
                />
              </div>
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <Form.Item
              label={
                <span className="text-white text-[18px] ">
                  Registration Closing Date: {closeDate?.split("T")[0]}
                </span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input Start Time!",
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
                // showTime
                onChange={onChangeClosingDate}
              />
            </Form.Item>

            <Form.Item
              name="eventDate"
              label={
                <span className="text-white text-[18px] ">
                  Date of Event: {eventDate?.split("T")[0]}
                </span>
              }
              className="flex-1"
              rules={[
                {
                  required: false,
                  message: "Please input Match Date!",
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
                onChange={onChangeEventDate}
              />
            </Form.Item>
          </div>

          <div className="mt-2">
            <span className="text-white text-[18px]">Matches</span>
            <Form.List
              // label={<span className="text-white text-[18px] ">Matches</span>}
              name="matches"
              className="w-full"
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} className="flex gap-5" align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, "matchName"]}
                        className=""
                        rules={[
                          {
                            required: true,
                            message: "Missing Match Name",
                          },
                        ]}
                      >
                        <Input
                          className="p-4 bg-[#FFE7EA4F]
            rounded lg:w-[730px] 
            justify-start 
            border-none
            mt-[12px]
            text-white
            items-center 
            gap-4 inline-flex outline-none focus:border-none"
                          placeholder="Match Name"
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "description"]}
                        className="flex-1"
                        rules={[
                          {
                            required: true,
                            message: "Missing Match Description",
                          },
                        ]}
                      >
                        <Input
                          className="p-4 bg-[#FFE7EA4F]
            rounded lg:w-[730px]  
            justify-start 
            border-none
            mt-[12px]
            text-white
            items-center 
            gap-4 inline-flex outline-none focus:border-none"
                          placeholder="Match Description"
                        />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      className="block w-[500px] h-[56px] mt-[30px] px-2 py-4  text-white bg-gradient-to-r from-red-500 to-red-800 rounded-lg hover:bg-red-600"
                    >
                      Edit Match
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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
                style={{ backgroundColor: "#FFE7EA4F", width: "100%" }}
              />
            </div>
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
            Edit Event
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditEvent;
