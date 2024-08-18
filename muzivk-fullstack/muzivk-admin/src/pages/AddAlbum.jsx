import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { url } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddAlbum = () => {

    const [image,setImage] = useState(false);
    const [colour,setColour] = useState("#ff0cd7");
    const [name,setName] = useState("");
    const [desc,setDesc] = useState("");
    const [loading,setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name',name);
            formData.append('desc',desc); 
            formData.append('image',image); 
            formData.append('bgColour',colour)
            
            const response = await axios.post(`${url}/api/album/add`,formData);

            if (response.data.success) {
                toast.success("Albüm Eklendi");
                setDesc("");
                setImage(false);
                setName("");
            } else {
                toast.error('Bazı şeyler yanlış gibi')
            }

        } catch (error) {
            toast.error('Hata')
        }
        setLoading(false);
    }

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
        <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-pink-500 rounded-full animate-spin'></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>

        <div className='flex flex-col gap-4'>
            <p>Görsel Yükle</p>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden/>
            <label htmlFor="image">
                <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
        </div>

        <div className='flex flex-col gap-2.5'>
            <p>Albüm Adı</p>
            <input onChange={(e)=>setName(e.target.value)} value={name} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type="text" placeholder='albüm adı'/>
        </div>

        <div className='flex flex-col gap-2.5'>
            <p>Albüm Açıklaması</p>
            <input onChange={(e)=>setDesc(e.target.value)} value={desc} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type="text" placeholder='albüm açıklaması'/>
        </div>

        <div className='flex flex-col gap-3'>
            <p>Arkaplan Rengi</p>
            <input onChange={(e)=>setColour(e.target.value)} value={colour} type="color"/>
        </div>
      
        <button className='text-base bg-black text-white py-2.5 px-14 cursor-pointer' type="submit">EKLE</button>

    </form>
  )
}

export default AddAlbum
