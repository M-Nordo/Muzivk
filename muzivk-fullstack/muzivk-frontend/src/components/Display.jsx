import React, { useContext, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
  const { albumsData } = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";

  const album = Array.isArray(albumsData) && albumsData.length > 0
    ? albumsData.find((x) => x._id == albumId)
    : null;

  const bgColor = isAlbum && album ? album.bgColour : "#121212";

  useEffect(() => {
    if (displayRef.current) {
      if (isAlbum) {
        displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
      } else {
        displayRef.current.style.background = `#121212`;
      }
    }
  }, [isAlbum, bgColor]);

  return (
    <div ref={displayRef} className='flex-1 m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto'>
      {Array.isArray(albumsData) && albumsData.length > 0
        ? (
          <Routes>
            <Route path='/' element={<DisplayHome />} />
            <Route path='/album/:id' element={<DisplayAlbum album={album} />} />
          </Routes>
        )
        : null
      }
    </div>
  );
};

export default Display;
