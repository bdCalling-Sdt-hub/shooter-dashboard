import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";


const PrivacyPolicy = () => {
    const navigate = useNavigate()
    return (
        <div className="relative ml-[24px] ">
        <div className=" mt-[44px] cursor-pointer flex items-center pb-3 gap-2">
       <MdOutlineKeyboardArrowLeft
        className="text-white"
      onClick={() => navigate("/settings")}
      size={34}
    />
        <h1 className="text-[24px] text-primary font-semibold text-white">
          Privacy Policy
        </h1>
      </div>
      <div className=" text-justify mt-[24px] h-screen text-white">
        <p>Lorem ipsum dolor sit amet consectetur. Ante tempor porttitor dignissim cursus quam. Quis scelerisque quis tempor et tortor egestas a. Velit malesuada ultrices sed ut leo ipsum scelerisque nulla. Orci enim at auctor id sed vitae. Diam eu risus fermentum suspendisse dui massa senectus. Sollicitudin et a lectus commodo pellentesque nam. Tincidunt quis fames nunc vestibulum elit. Vulputate quis fringilla in diam netus sapien viverra scelerisque. Velit integer sollicitudin pulvinar sit. Maecenas quis felis aenean hac scelerisque ac. Accumsan sollicitudin turpis erat donec nisl rhoncus ut quam nec. Semper pulvinar ullamcorper nunc lacus. Fringilla eget felis in enim diam aliquet enim arcu. Viverra metus porttitor massa massa faucibus ac eu purus sed. Nibh sit sodales egestas pellentesque amet vitae nibh vitae.

        Lorem ipsum dolor sit amet consectetur. Ante tempor porttitor dignissim cursus quam. Quis scelerisque quis tempor et tortor egestas a. Velit malesuada ultrices sed ut leo ipsum scelerisque nulla. Orci enim at auctor id sed vitae. Diam eu risus fermentum suspendisse dui massa senectus. Sollicitudin et a lectus commodo pellentesque nam. Tincidunt quis fames nunc vestibulum elit. Vulputate quis fringilla in diam netus sapien viverra scelerisque. Velit integer sollicitudin pulvinar sit. Maecenas quis felis aenean hac scelerisque ac. Accumsan sollicitudin turpis erat donec nisl rhoncus ut quam nec. Semper pulvinar ullamcorper nunc lacus. Fringilla eget felis in enim diam aliquet enim arcu. Viverra metus porttitor massa massa faucibus ac eu purus sed. Nibh sit sodales egestas pellentesque amet vitae nibh vitae.    
        </p>
      </div>
    <Link to='/settings/edit-privacy-policy' className="absolute text-center bottom-0 bg-gradient-to-r from-red-500 via-red-600 to-red-800 
        text-white mt-5 py-3 rounded-lg w-full text-[18px] font-medium  duration-200">Edit</Link>
        </div>
    );
}

export default PrivacyPolicy;
