import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className='w-[350px] h-full p-2 flex flex-col gap-2 text-white bg-[#121212]'>
      
      <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
        <div onClick={() => navigate('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img className='w-6' src={assets.home_icon} alt="" />
          <p className='font-bold'>Ana Sayfa</p>
        </div>
        <div className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img className='w-6' src={assets.search_icon} alt="" />
          <p className='font-bold'>Ara</p>
        </div>
      </div>

      <div className='bg-[#121212] h-[85%] rounded'>
        <div className='p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img className='w-8' src={assets.stack_icon} alt="" />
            <p className='font-semibold'>Kitaplığın</p>
          </div>
          <div className='flex items-center gap-3'>
            <img className='w-5' src={assets.arrow_icon} alt="" />
            <img className='w-5' src={assets.plus_icon} alt="" />
          </div>
        </div>

        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
          <h1>İlk Oynatma Listeni Oluştur</h1>
          <p className='font-light'>Merak etme, sana yardım edeceğim.</p>
          <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Oynatma Listeni Oluştur</button>
        </div>
        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
          <h1>Dinleyecek bir şeyler bulalım</h1>
          <p className='font-light'>Yeni içerikler geldiğinde seni bilgilendireceğiz.</p>
          <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Şarkılara Bakalım</button>
        </div>

        <div className='p-4 flex items-center justify-center gap-2 mt-4'>
          <a href='https://www.linkedin.com/in/mehmet-ali-yayla-835b55273/' target='_blank' rel='noopener noreferrer' className='flex items-center gap-2'>
            <p className='font-semibold'>Mehmet Ali Yayla tarafından tasarlandı</p>
            <div className='flex flex-col items-center mt-4'>           
          </div>
          </a>
          <div className='flex flex-col items-center mt-2'>
          <img src={assets.logo} className='w-24' alt="Logo" />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
