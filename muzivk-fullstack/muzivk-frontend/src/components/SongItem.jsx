import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const SongItem = ({ name, image, desc, id }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div 
      onClick={() => playWithId(id)} 
      className='w-full h-[250px] p-2 rounded-lg cursor-pointer hover:bg-[#ffffff26] flex flex-col items-center'
    >
      <img 
        className='w-full h-[150px] object-cover rounded-lg' 
        src={image} 
        alt="" 
      />
      <div className='w-full flex flex-col items-center mt-2'>
        <p className='font-bold text-lg text-center truncate'>{name}</p>
        <p className='text-slate-200 text-sm text-center truncate'>{desc}</p>
      </div>
    </div>
  );
};

export default SongItem;
