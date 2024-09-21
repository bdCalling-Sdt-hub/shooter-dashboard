import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../../config';
import Swal from 'sweetalert2';
import { usePostAddDocumentMutation } from '../../../redux/post/postAddDocumentApi';

const AddDocument = () => {
    const navigate = useNavigate();
    const [updateImage, setUpdateImage] = useState(null);
 const [setData, { isLoading: loading }] = usePostAddDocumentMutation();
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
            formData.append("document", updateImage);
          }
          // const response = await baseURL.post(`/library/documents`, formData, {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //     authorization: `Bearer ${localStorage.getItem("token")}`,
          //   },
          // });
          const response = await setData({ formData });
          console.log(response);
          console.log(response.data?.statusCode);
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
            navigate("/library/documents");
          }
      }
      console.log(previewImage);
    return (
        <div className="ml-[24px] overflow-auto">
        <div className="mt-[44px] cursor-pointer text-white flex items-center pb-3 gap-2">
          <MdOutlineKeyboardArrowLeft
            onClick={() => navigate("/library/documents")}
           
            size={34}
          />
          <h1 className="text-[24px] text-primary font-semibold">
            Add Documents
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
                  Documents
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
              Add Documents
            </Button>
          </Form>
        </div>
        </div>
    );
}

export default AddDocument;
