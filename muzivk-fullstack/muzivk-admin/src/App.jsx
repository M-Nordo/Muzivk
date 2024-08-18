import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddSongs from './pages/AddSongs';
import AddAlbum from './pages/AddAlbum';
import ListSong from './pages/ListSong';
import ListAlbum from './pages/ListAlbum';
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const url = 'http://localhost:4000';

const App = () => {
  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer />
      <SideBar />
      <div className='flex-1 h-screen overflow-y-scroll bg-[#f3fff7]'>
        <Navbar />
        <div className='pt-8 pl-5 sm:pt-12 sm:pl-12'>
          <Routes>
            <Route path='/add-song' element={<AddSongs />} />
            <Route path='/add-album' element={<AddAlbum />} />
            <Route path='/list-song' element={<ListSong />} />
            <Route path='/list-album' element={<ListAlbum />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
