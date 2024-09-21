import { Button, DatePicker, Form, Input, Upload } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import "react-phone-number-input/style.css";
import { useGetSingleUserQuery } from "../../../redux/Features/getSingleUserApi";
import Loading from "../../../Components/Loading";
import baseURL from "../../../config";
import Swal from "sweetalert2";
import { useGetUploadProfileApiMutation } from "../../../redux/post/postUpdateProfileAPi";

const EditProfileInformation = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {data,isError,isLoading} = useGetSingleUserQuery(id);
    const [setData, { isLoading: loading }] = useGetUploadProfileApiMutation()
    const user = data?.data?.attributes;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [email, setEmail] = useState(user?.email);
  const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState(`${baseUrl}${user?.image?.publicFileURL}`);
    useEffect(() => {
      setImageUrl(`${baseUrl}${user?.image?.publicFileURL}`);
      setEmail(user?.email);
      setPhoneNumber(user?.phone)
    }, [data]);
    if (isLoading) {
      return <Loading />;
    }
    const props = {
        action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        listType: "picture",
        showUploadList: false, // Disable the default upload list
        beforeUpload(file) {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const img = document.createElement("img");
              img.src = reader.result;
              img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                ctx.fillStyle = "red";
                ctx.textBaseline = "middle";
                ctx.font = "33px Arial";
                ctx.fillText("", 20, 20);
                canvas.toBlob((result) => {
                  resolve(result);
                  setImageUrl(URL.createObjectURL(result));
                  // console.log(result);// Update the image URL
                });
              };
            };
          });
        },
      };
      const handleUpdateProfile = async (values) => {
        try {
        console.log(values);
        const updateProfile = {
          ...values,
          image: fileList[0]?.originFileObj,
          phoneNumber,
        };
        console.log(updateProfile);
        const formData = new FormData();
        formData.append("name", updateProfile?.name);
        formData.append("email", updateProfile?.email);
        formData.append("phone", updateProfile?.phoneNumber);
        if (fileList[0]?.originFileObj) {
          formData.append("image", fileList[0]?.originFileObj);
        }
        
          // const response = await baseURL.patch(`/user/update/${id}`, formData,{
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //     authentication: `Bearer ${localStorage.getItem("token")}`,
          //   },
          // });
          const response = await setData({formData,id});
          console.log("aiman",response);
          
          if (response?.data?.statusCode == 200) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            localStorage.removeItem("user-update");
            localStorage.setItem(
              "user-update",
              JSON.stringify(response?.data?.data?.attributes)
            );
            console.log(response.data);
            navigate('/profile-information', { replace: true });
            // setTimeout(()=>window.location.reload() , 1700);
            
          }
        } catch (error) {
          console.log("Registration Fail", error?.response?.data?.message);
          Swal.fire({
            icon: "error",
            title: "Error...",
            text: error?.response?.data?.message,
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
        console.log(updateProfile);
      };
    return (
        <div style={{fontFamily:"Aldrich"}}>
        <div
          onClick={() => navigate("/profile-information")}
          className="flex cursor-pointer text-white  items-center ml-[24px] mt-[40px] mb-[63px]"
        >
          <MdOutlineKeyboardArrowLeft size={30} />
          <h1 className="text-[20px] font-medium text-white"> Edit Profile</h1>
        </div>
        <div className="ml-[24px] bg-[#302d2d] p-[36px] rounded-xl">
          <Form
            name="basic"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={handleUpdateProfile}
            //   onFinishFailed={handleCompanyInformationFailed}
          >
            <div className="flex " style={{fontFamily:"Aldrich"}}>
              <div className="w-[33%] ml-[24px] flex flex-col justify-center items-center gap-[30px]">
                <div className="w-[242px] h-[242px] relative rounded-full flex flex-col justify-center items-center">
                  {/* <img
              className="w-[242px] h-[242px] rounded-full flex justify-center items-center backdrop-brightness-50"
              src={imageUrl}
              alt=""
            /> */}
                  <Upload
                    {...props}
                    name="avatar"
                    listType="picture-circle"
                    // className={styles.avatarUploader}
                    // fileList={fileList}
                    // className={styles.ant-upload}
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    // beforeUpload={beforeUpload}
                    onChange={({ fileList: newFileList }) => {
                      // console.log(fileList?.fileList[0].originFileObj);
                      setFileList(newFileList);
                    }}
                  >
                    <img
                      className="w-[242px] h-[242px] rounded-full flex justify-center items-center opacity-50"
                      src={imageUrl}
                      alt=""
                    />
  
                    <Button
                      className="border-none text-[16px] text-[#3BA6F6] bg-[white] absolute text-primary hover:text-primary"
                      icon={<LuImagePlus size={17} className="text-[#3BA6F6]" />}
                    >
                      Change Picture
                    </Button>
                  </Upload>
                  <div>
                    {/* <Upload
                {...props}
                onChange={(info) => {
                  if (info.file.status !== "uploading") {
                    console.log(info.file, info.fileList);
                  }
                  if (info.file.status === "done") {
                    message.success(
                      `${info.file.name} file uploaded successfully`
                    );
                  } else if (info.file.status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }}
              >
                <Button
                  className="border-none text-[16px] text-[#3BA6F6] bg-[white] absolute text-primary hover:text-primary"
                  icon={<LuImagePlus size={17} className="text-[#3BA6F6]"/>}
                >
                  Change Picture
                </Button>
            </Upload> */}
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[20px] text-[white]">
                    {user?.role?.toUpperCase()}
                  </p>
                  <h1 className="text-[white] text-[30px] font-medium">
                    {user?.name?.toUpperCase()}
                  </h1>
                </div>
              </div>
  
              <div className="flex-1 w-[66%]" >
                <div className="flex flex-col gap-[24px]">
                  <div className="flex gap-[25px]">
                    <div className="flex-1">
                      <Form.Item
                        label={
                          <span style={{fontFamily:"Aldrich"}} className="text-[white] text-[18px] font-medium">
                            Name
                          </span>
                        }
                        name="name"
                        
                        className="flex-1"
                        rules={[
                          {
                            required: true,
                            message: "Please input your First Name!",
                          },
                        ]}
                        initialValue={user?.name}
                      >
                        <Input
                          placeholder="Name"
                          className="p-4 bg-[#706768]
                          rounded w-full 
                          justify-start 
                          border-none
                          mt-[12px]
                          items-center 
                          text-white
                          gap-4 inline-flex outline-none focus:border-none focus:bg-[#706768] hover:bg-[#706768] "
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Form.Item
                      label={
                        <span style={{fontFamily:"Aldrich"}} className="text-[white] text-[18px] font-medium">
                          Email
                        </span>
                      }
                      name="email"
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Email!",
                        },
                      ]}
                      initialValue={email || user?.email}
                    >
                      <Input
                        placeholder="Email"
                        className="p-4 bg-[#706768]
                          rounded w-full 
                          justify-start 
                          border-none
                          mt-[12px]
                          items-center 
                          text-white
                          gap-4 inline-flex outline-none focus:border-none focus:bg-[#706768] hover:bg-[#706768]"
                     readOnly
                     />
                    </Form.Item>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor=""
                      className="text-[white] text-[18px] font-medium mb-[12px]"
                    >
                      Phone Number
                    </label>
  
                    <PhoneInput
                      placeholder="Enter phone number"
                      international
                      countryCallingCodeEditable={false}
                      style={{
                        marginTop: "12px",
                      }}
                      defaultCountry="US"
                      value={phoneNumber?.toString()}
                      onChange={setPhoneNumber}
                    />
                  </div>
                  {/* <div className="flex-1">
                    <Form.Item
                      label={
                        <span style={{fontFamily:"Aldrich"}} className="text-[white] text-[18px] font-medium">
                          Date Of Birth
                        </span>
                      }
                      name="dateOfBirth"
                      className="flex-1"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Date Of Birth!",
                        },
                      ]}
                      initialValue={user?.dateOfBirth
                        ? moment(user.dateOfBirth, "DD-M-YYYY")
                        : null}
                    >
                      <DatePicker
                         className="p-4 bg-[#706768]
                         rounded w-full 
                         justify-start 
                         border-none
                         mt-[12px]
                         items-center 
                         gap-4 inline-flex outline-none focus:border-none focus:bg-[#706768] hover:bg-[#706768] text-white"
                        type="date"
                        prefix={" "}
                        // defaultValue={
                        //   user?.dateOfBirth
                        //     ? moment(user.dateOfBirth, "DD-M-YYYY")
                        //     : null
                        // }
                      />
                    </Form.Item>
                  </div> */}
                </div>
              </div>
            </div>
            <Button
            style={{fontFamily:"Aldrich"}}
              htmlType="submit"
              className="text-[18px] w-full mt-[50px] mb-[20px] cursor-pointer h-[60px] bg-gradient-to-r from-red-500 via-red-600 to-red-800 text-white py-3 rounded-lg font-medium duration-200 hover:from-red-800 hover:via-red-900 hover:to-red-900"
            >
              Update profile
            </Button>
          </Form>
        </div>
      </div>
    );
}

export default EditProfileInformation;
