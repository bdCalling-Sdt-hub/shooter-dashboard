import { Button, Form, Input } from "antd";
import { GoArrowLeft } from "react-icons/go";
import { HiOutlineMailOpen } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png"
import updatePassImg from "../../assets/update-pass.png";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { IconLock } from "@tabler/icons-react";
import baseURL from "../../config";
import Swal from "sweetalert2";
const UpdatePassword = () => {
  const navigate = useNavigate();
    const [form] = Form.useForm();
    const {email} = useParams();
    console.log(email);
    const onFinish = async (values) => {
        console.log("Received values of form: ", values?.re_enter_password);
        try {
          const response = await baseURL.post(
            "/user/set-password",{
              email : email,
              password : values?.re_enter_password
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
            navigate("/auth");
          }  
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Try Again...",
            text: error?.response?.data?.message,
            footer: '<a href="#">Why do I have this issue?</a>',
          })
        }
      };
    return (
        <div className="mx-[310px]  bg-[#FFE7EA21] px-[115px] py-[120px] rounded-xl border-2 border-red-500">
      <div className="flex gap-[120px]">
        <div className="flex items-center">
          <img src={updatePassImg} alt="" />
        </div>
        <div>

        <div className="w-[500px]">
        <img src={logo} alt="" />
        <div className="flex text-white items-center gap-2">
            <Link to="/auth/forgot-password">
              {" "}
              <GoArrowLeft className="text-[32px]"  />
            </Link>

            <h1 className="text-[32px] font-medium my-[24px]">
              Change Password
            </h1>
          </div>
        <Form
          form={form}

          name="dependencies"
          autoComplete="off"
          style={{
            maxWidth: 600,
          }}
          layout="vertical"
          className="space-y-4 fit-content object-contain"
          onFinish={onFinish}
        >
        

          <Form.Item
            name="enter_password"
            label={
                <span className="text-[white] text-[16px] font-medium">
                  New Password
                </span>
              }
            rules={[
              {
                required: true,
                message: "Please Input Your Password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              // onChange={handleChange}
              placeholder="Set your password"
              name="set_password"
              prefix={
                <IconLock
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
              bordered={false}
            />
          </Form.Item>

          {/* Field */}
          <Form.Item
            name="re_enter_password"
            label={
                <span className="text-[white] text-[16px] font-medium">
                 Confirm Password
                </span>
              }
           
            dependencies={["password"]}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("enter_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Re-enter password"
              name="re_enter_password"
              prefix={
                <IconLock
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
              bordered={false}
            />
          </Form.Item>
          <Form.Item>
            <Button
              
              htmlType="submit"
              className="block w-[500px] h-[56px] px-2 py-4 mt-2 text-white bg-gradient-to-r from-red-500 to-red-800 rounded-lg hover:bg-red-600"
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
       </div>
     


        </div>
      </div>
      
        </div>
    );
}

export default UpdatePassword;
