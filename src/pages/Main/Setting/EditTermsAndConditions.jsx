import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";


const EditTermsAndConditions = () => {
    const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values.aboutUsContent);
    // Perform your update logic here
  };
    return (
        <div className="relative ml-[24px]">
      <div className=" mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
        <MdOutlineKeyboardArrowLeft
          className="text-white"
          onClick={() => navigate("/settings/terms-conditions")}
          size={34}
        />
        <h1 className="text-[24px] text-white text-primary font-semibold">
          Edit Terms & Conditions
        </h1>
      </div>
      <div className="text-justify text-white mt-[24px] relative ">
        <Form
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
        </Form>
      </div>
    </div>
    );
}

export default EditTermsAndConditions;

