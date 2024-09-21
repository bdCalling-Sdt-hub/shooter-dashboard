import { Button, Form, Input, Select } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../config";
import Swal from "sweetalert2";
import { usePostAddSubscriptionMutation } from "../../../redux/post/postAddSubscriptionApi";

const subscriptionType = [
  {
    type: "standard",
  },
  {
    type: "premium",
  },
];

const AddSubscription = () => {
  const navigate = useNavigate();
  const [setData,{isLoading:loading}] = usePostAddSubscriptionMutation()

  const handleAddSubscription = async (values) => {
    console.log(values);
    try {
      // const response = await baseURL.post(
      //   "/subscription/add-subscription",
      //   values,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      // );
      
      const response = await setData({values})
      
      
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
        navigate("/subscription");
      }
    } catch (error) {
      console.log(error);
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
          onClick={() => navigate("/subscription")}
          size={34}
        />
        <h1 className="text-[24px] text-primary font-semibold">
          Add Subscription
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
          onFinish={handleAddSubscription}
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
            Add Subscription
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddSubscription;
