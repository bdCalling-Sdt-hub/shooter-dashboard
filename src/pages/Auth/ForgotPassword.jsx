import { IconLock } from '@tabler/icons-react';
import { Button, Form, Input } from 'antd';

import { HiOutlineMailOpen } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import resetPassword from '../../assets/forgotPassword.png';
import logo from "../../assets/logo.png"
import { GoArrowLeft } from "react-icons/go";
import baseURL from '../../config';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const navigate = useNavigate();
    const onFinish = async (values)=>{
        console.log(values);
      try {
        const response = await baseURL.post(
          `/user/forgot-password`,values, {
            headers: {
              "Content-Type": "application/json",
              authentication: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        console.log(response?.data);
        if(response?.data?.statusCode == 200){
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: response?.data?.message,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/auth/verify/${values?.email}`);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Try Again...",
          text: error?.response?.data?.message,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
      }
    return (
        <div className="mx-[310px]  bg-[#FFE7EA21] px-[115px] py-[120px] rounded-xl border-2 border-red-500">
      <div className="flex gap-[120px]">
        <div className="flex items-center">
          <img src={resetPassword} alt="" />
        </div>
        <div>

        <div className="w-[500px]">
        <img src={logo} alt="" />
        <div className="flex text-white items-center gap-2">
            <Link to="/auth">
              {" "}
              <GoArrowLeft className="text-[32px]" />
            </Link>

            <h1 className="text-[32px] font-medium my-[24px]">
              Forgot password
            </h1>
          </div>
        <p className=" text-16 text-white mt-[24px] mb-[32px]">Enter the email address associated with your account. We'll send you an OTP to your email. </p>
        <Form
          name="normal_login"
          // className="login-form"
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="email"
            label={
                <span className="text-[white] text-[16px] font-medium">
                  Email
                </span>
              }
            
            rules={[
              {
                required: true,
                message: "Please Input Your Email!",
              },
            ]}
          >
            <Input
              size="large"  
              placeholder="Enter Your Email"
              name="email"
              prefix={
                <HiOutlineMailOpen
                  className="mr-2 bg-white rounded-full p-[6px]"
                  size={28}
                  color="red"
                />
              }
              style={{
                borderBottom: "2px solid #4E4E4E",
                height: "52px",
                background: "#F6F6F6",
                outline: "none",
                marginBottom: "20px",
              }}
              required
              bordered={false}
            />
          </Form.Item> 
      
          <Form.Item>
            <Button
              // type="primary"
              htmlType="submit"
              className="block w-[500px] h-[56px] px-2 py-4 mt-2 text-white bg-gradient-to-r from-red-500 to-red-800 rounded-lg hover:bg-red-600"
              >
            
              Send OTP
            </Button>
            {/* <Link to="/dashboard"
              // type="primary"
              // htmlType="submit"
              className="block text-center w-[350px] h-[56px] px-2 py-4 mt-2 hover:text-white text-white bg-[#3BA6F6] rounded-lg"
            >
              Log In
            </Link> */}
          </Form.Item>
        </Form>
       </div>
     


        </div>
      </div>
      
        </div>
    );
}

export default ForgotPassword;
