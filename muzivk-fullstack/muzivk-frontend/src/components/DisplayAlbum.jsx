import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
    const { id } = useParams();
    const [albumData, setAlbumData] = useState(null);
    const { playWithId, albumsData, songsData } = useContext(PlayerContext);

    useEffect(() => {
        const album = albumsData.find(item => item._id === id);
        if (album) {
            setAlbumData(album);
        }
    }, [id, albumsData]);

    if (!albumData) return <div>Yükleniyor...</div>;

    return (
        <>
            <Navbar />
            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-64 h-64 object-cover rounded-lg' src={albumData.image} alt="" />
                <div className='flex flex-col'>
                    <p>Oynatma Listesi</p>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <p className='mt-1'>
                        <img className='inline-block w-5' src={assets.spotify_logo} alt="" />
                        <b>Muzivk</b>
                        • 2,555,123 beğeni
                        • <b>50 şarkı,</b>
                        2 saat 30 dakika
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Başlık</p>
                <p>Albüm</p>
                <p className='hidden sm:block'>Eklenme Tarihi</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt="" />
            </div>
            <hr />
            {
                songsData
                    .filter((item) => item.album && item.album._id === id) // album'ın mevcut olduğundan emin ol
                    .map((item, index) => (
                        <div 
                            onClick={() => playWithId(item._id)} 
                            key={index} 
                            className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'
                        >
                            <p className='text-white'>
                                <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                                <img className='inline w-10 mr-5' src={item.image} alt="" />
                                {item.name}
                            </p>
                            <p className='text-[15px]'>{albumData.name}</p>
                            <p className='text-[15px] hidden sm:block'>5 gün önce</p>
                            <p className='text-[15px] text-center'>{item.duration}</p>
                        </div>
                    ))
            }
        </>
    );
}

export default DisplayAlbum;
