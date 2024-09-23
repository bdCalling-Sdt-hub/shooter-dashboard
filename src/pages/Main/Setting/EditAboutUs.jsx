import { Form, Input, Button } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useGetAboutUsQuery } from "../../../redux/Features/getAboutUsApi";
import baseURL from "../../../config";
import Swal from "sweetalert2";
import { usePostAboutUsMutation } from "../../../redux/post/postAboutUsApi";

const EditAboutUs = () => {
    const navigate = useNavigate();
    const editor = useRef(null);
    const {data,isSuccess,isLoading} = useGetAboutUsQuery();
    const [setData,{isLoading:loading}] = usePostAboutUsMutation()
    const [content, setContent] = useState(data?.data?.attributes?.content);
    useEffect(()=>{
    setContent(data?.data?.attributes?.content);  
    },[data])
    console.log("data",data);
  console.log(content);
  
    const handleUpdate = async ()=>{
      console.log(content);
      try {
        // const response = await baseURL.put(`/setting/about-us`, {
        //   content: content
        // },
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     authentication: `Bearer ${localStorage.getItem("token")}`,
        //   }
        // }
        // )
        const response = await setData({content:content})
        if(response?.data?.statusCode === 201){
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: response?.data?.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setInterval(()=>window.location.reload(),1600)
          navigate("/settings/about-us")
        }
       
       
        console.log(response);
      }catch(error){
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Try Again...",
          text: error?.response?.data?.message,
          footer: '<a href="#">Why do I have this issue?</a>',
        })
      }
    } 
    return (
        <div className="relative ml-[24px]">
        <div className=" mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
          <MdOutlineKeyboardArrowLeft
            className="text-white"
            onClick={() => navigate("/settings/about-us")}
            size={34}
          />
          <h1 className="text-[24px] text-white text-primary font-semibold">
            Edit Privacy Policy
          </h1>
        </div>
        <div className="text-justify  mt-[24px] relative ">
          {/* <Form
            form={form}
            onFinish={onFinish}
            initialValues={{ aboutUsContent: "" }}
          >
            <Form.Item
              name="privacyPolicy"
              
              rules={[
                {
                  required: true,
                  message: "Please enter the Privacy Policy content!",
                },
              ]}
            >
              <Input.TextArea
                rows={20}
                className="text-white bg-[#5B5455] "
                autoFocus
              />
            </Form.Item>
  
            <Form.Item>
              <div className="mt-10">
                <Button
                  htmlType="submit"
                  className="absolute bottom-[-60px] text-center mt-[40px] h-[66px] bg-gradient-to-r from-red-500 via-red-600 to-red-800 text-white py-3 rounded-lg w-full text-[18px] font-medium duration-200 hover:from-red-800 hover:via-red-900 hover:to-red-900"
                >
                  Update
                </Button>
              </div>
            </Form.Item>
          </Form> */}
          <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => {
          setContent(newContent);
        }}
        className="text-wrap"
        style={{ width: '100%' }} 
      />
      <Button
        onClick={handleUpdate}
        block
        className="mt-[30px] h-[60px] hover:text-white bg-gradient-to-r from-red-500 via-red-600 to-red-800 
        text-white py-3 rounded-lg w-full text-[18px] font-medium  duration-200"
      >
        Update
        </Button>
        </div>
      </div>
    );
}

export default EditAboutUs;
