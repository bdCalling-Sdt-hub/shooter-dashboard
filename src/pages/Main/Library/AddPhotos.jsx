import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router-dom';
import baseURL from '../../../config';
import Swal from 'sweetalert2';

const AddPhotos = () => {
    const navigate = useNavigate();
    const [updateImage, setUpdateImage] = useState(null);
 
  const [previewImage, setPreviewImage] = useState(null);
    const handleImageChange = (e) => {
        
        const file = e.target.files[0];
        // You may want to add validation here to ensure it's an image file
        setUpdateImage(file);
        setPreviewImage(URL.createObjectURL(file));
      };

      const handleAddPhotos = async () => {
        const formData = new FormData();
        if (updateImage) {
            formData.append("image", updateImage);
          }
          const response = await baseURL.post(`/library/photos`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          console.log(response);
          if (response.data?.statusCode === 200) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1600);
            navigate("/library/photos");
          }
      }
      console.log(previewImage);
    return (
        <div className="ml-[24px] overflow-auto">
        <div className="mt-[44px] cursor-pointer text-white flex items-center pb-3 gap-2">
          <MdOutlineKeyboardArrowLeft
            onClick={() => navigate("/library/photos")}
           
            size={34}
          />
          <h1 className="text-[24px] text-primary font-semibold">
            Add Photos
          </h1>
        </div>
        <div>
          <Form
            name="basic"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            //   initialValues={{
            //     remember: true,
            //     match: result?.matchName,
            //     event: result?.event,
            //   }}
            onFinish={handleAddPhotos}
            //   onFinishFailed={handleCompanyInformationFailed}
            autoComplete="off"
          >
           <div className="flex gap-5">
            <Form.Item
              name="name"
              label={
                <span className="text-white text-[18px] ">
                  Photo
                </span>
              }
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input Subscription Name!",
                },
              ]}
            >
              <input
                  type="file"
                  accept="image/*"
                  // Only allows image files
                  className="p-4 bg-[#FFE7EA4F]
              rounded w-full 
              justify-start 
              border-none
              mt-[12px]
              text-white
              items-center 
              gap-4 inline-flex outline-none focus:border-none"
                  onChange={handleImageChange}
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
              Add Photos
            </Button>
          </Form>
        </div>
      </div>
    );
}

export default AddPhotos;
