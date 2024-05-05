import { Button, Form, Input } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleMatchQuery } from "../../../redux/Features/getSingleMatch";
import Loading from "../../../Components/Loading";
import { useState } from "react";
import Swal from "sweetalert2";
import baseURL from "../../../config";

const UploadScore = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetSingleMatchQuery(id);
  console.log(data);
  const result = data?.data?.attributes;

  if (isLoading) {
    return <Loading />;
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  console.log(selectedFile);
  const handleUploadScore = async (values) => {
    try {
      const result = {
        ...values,
        scoreFile: selectedFile,
      };
      const formData = new FormData();

      formData.append("match", result?.match);
      formData.append("event", result?.event);

      if (selectedFile) {
        formData.append("scoreFile", result?.scoreFile);
      }

      const response = await baseURL.post(`/match/score-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response);
      if (response?.data?.statusCode == 200) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: response?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1600);
        navigate("/matches");
      }
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="ml-[24px] overflow-auto">
      <div className="mt-[44px] cursor-pointer text-white flex items-center pb-3 gap-2">
        <MdOutlineKeyboardArrowLeft
          onClick={() => navigate("/matches")}
          size={34}
        />
        <h1 className="text-[24px] text-primary font-semibold">
          Upload Match Score
        </h1>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          initialValues={{
            remember: true,
            match: result?.matchName,
            event: result?.event,
          }}
          onFinish={handleUploadScore}
          //   onFinishFailed={handleCompanyInformationFailed}
          autoComplete="off"
        >
          <div className="flex gap-5">
            <Form.Item
              name="match"
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
              <Input
                // name="publisherName"
                // onChange={(e) => setPublisherName(e.target.value)}
                placeholder="Event Name"
                className="p-4 bg-[#FFE7EA4F]
                rounded w-full 
                justify-start 
                border-none
                mt-[12px]
                text-white
                items-center 
                gap-4 inline-flex outline-none focus:border-none"
                readOnly
              />
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <input
              className="p-4 bg-[#FFE7EA4F]
              rounded w-full 
              justify-start 
              border-none
              mt-[12px]
              text-white
              items-center 
              gap-4 inline-flex outline-none focus:border-none"
              type="file"
              onChange={handleFileChange}
              accept=".csv"
              required
            />
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
            Upload Score
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UploadScore;
