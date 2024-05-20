import React from 'react';
import { TbPhotoPentagon } from "react-icons/tb";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Library = () => {
    const navigate = useNavigate();
    return (
        <div className='text-white flex gap-10 justify-center items-center min-h-[80%]'>
            <div onClick={()=>navigate('/library/photos')} className='border-2 border-[#FA1131] rounded-md px-10 py-5 cursor-pointer'>
                <TbPhotoPentagon className='flex justify-center' size={200} />
                <h1 className='text-center text-[24px]'>Upload Photos</h1>
            </div>
            <div onClick={()=>navigate('/library/documents')} className='border-2 border-[#FA1131] rounded-md px-10 py-5 cursor-pointer'>
            <MdOutlineDocumentScanner className='flex justify-center' size={200}/>
                <h1 className='text-center text-[24px]'>Upload Docs</h1>
            </div>
        </div>
    );
}

export default Library;
