import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import {  useNavigate, useParams } from 'react-router-dom';
import { useGetAllSubscriptionQuery } from '../../../redux/Features/getAllSubscription';
import Loading from '../../../Components/Loading';
import { useGetSingleSubscriptionQuery } from '../../../redux/Features/getSingleSubscription';
import baseURL from '../../../config';
import Swal from 'sweetalert2';

const EditSubscription = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const {data,isLoading,isSuccess} = useGetSingleSubscriptionQuery(id);
    const subscriptionType = [
        {
          type: "standard",
        },
        {
          type: "premium",
        },
      ];
      if(isLoading){
        return <Loading/>
      }
      console.log(data?.data?.attributes);
    const handleEditSubscription = async (values) => {
        console.log(values);
        try {
            const response = await baseURL.patch(
                `/subscription/update-subscription/${id}`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            console.log(response);
            if(response?.data?.statusCode == 200){
                Swal.fire({ 
                    position: "top-center",
                    icon: "success",
                    title: response?.data?.message,
                    showConfirmButton: false,
                    timer: 1500,
                })
                setTimeout(() => {
                    window.location.reload();
                })
                navigate("/subscription")
            }
        } catch (error) {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }
    return (
            <div className="ml-[24px] overflow-auto">
              <div className="mt-[44px] cursor-pointer text-white flex items-center pb-3 gap-2">
                <MdOutlineKeyboardArrowLeft
                  onClick={() => navigate("/subscription")}
                  size={34}
                />
                <h1 className="text-[24px] text-primary font-semibold">
                  Edit Subscription
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
                      name: data?.data?.attributes?.name,
                      duration: data?.data?.attributes?.duration,
                      type:data?.data?.attributes?.type,
                      price:data?.data?.attributes?.price,
                      description:data?.data?.attributes?.description
                    }}
                  onFinish={handleEditSubscription}
                  //   onFinishFailed={handleCompanyInformationFailed}
                  autoComplete="off"
                >
                  <div className="flex gap-5">
                    <Form.Item
                      name="name"
                      label={
                        <span className="text-white text-[18px] ">
                          Subscription Name
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
                      <Input
                        // name="publisherName"
                        // onChange={(e) => setPublisherName(e.target.value)}
                        placeholder="Subscription Name"
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
                      name="price"
                      label={<span className="text-white text-[18px] ">Price(R)</span>}
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input price!",
                        },
                      ]}
                    >
                      <Input
                        // name="publisherName"
                        // onChange={(e) => setPublisherName(e.target.value)}
                        placeholder="Price"
                        className="p-4 bg-[#FFE7EA4F]
                        rounded w-full 
                        justify-start 
                        border-none
                        mt-[12px]
                        text-white
                        items-center 
                        gap-4 inline-flex outline-none focus:border-none"
                        type="number"
                      />
                    </Form.Item>
                  </div>
        
                  <div className="flex gap-5">
                    <Form.Item
                      name="duration"
                      label={
                        <span className="text-white text-[18px] ">
                          Subscription Duration(Month)
                        </span>
                      }
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input Duration(Month)!",
                        },
                      ]}
                    >
                      <Input
                        // name="publisherName"
                        // onChange={(e) => setPublisherName(e.target.value)}
                        placeholder="Subscription Duration(Month)"
                        className="p-4 bg-[#FFE7EA4F]
                        rounded w-full 
                        justify-start 
                        border-none
                        mt-[12px]
                        text-white
                        items-center 
                        gap-4 inline-flex outline-none focus:border-none"
                        type="number"
                      />
                    </Form.Item>
        
                    <Form.Item
                      name="type"
                      label={
                        <span className="text-white text-[18px] ">
                          Subscription Type
                        </span>
                      }
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input Subscription Type!",
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
                        {subscriptionType.map((item) => (
                          <>
                            <Select.Option value={item?.type}>
                              {item?.type}
                            </Select.Option>
                          </>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
        
                  <div className="flex-1">
                    <Form.Item
                      name="description"
                      label={
                        <span className="text-white text-[18px] ">
                          Description
                        </span>
                      }
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input Subscription Description!",
                        },
                      ]}
                    >
                      <Input.TextArea 
                      rows={4}
                        // name="publisherName"
                        // onChange={(e) => setPublisherName(e.target.value)}
                        placeholder="Subscription Description"
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
                    Edit Subscription
                  </Button>
                </Form>
              </div>
            </div>
    );
}

export default EditSubscription;
