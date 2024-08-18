import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {
  const { track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong, audioRef } = useContext(PlayerContext);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.file;
      if (playStatus) {
        audioRef.current.play();
      }
    }
  }, [track]);

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  const handleSeekMouseUp = () => {
    setIsSeeking(false);
  };

  const handleSeekMouseMove = (e) => {
    if (isSeeking && audioRef.current) {
      const newTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  return track ? (
    <div className='fixed bottom-0 left-0 w-full bg-black text-white px-4 py-2 border-t border-[#333] z-50'>
      <div className='flex items-center justify-between'>
        {/* Şarkı Bilgileri */}
        <div className='flex items-center gap-4'>
          <img className='w-12 h-12 rounded' src={track.image} alt="" />
          <div className='flex flex-col'>
            <p className='font-semibold text-sm'>{track.name}</p>
            <p className='text-xs truncate'>{track.desc}</p>
          </div>
        </div>

        {/* Oynatma Kontrolleri ve Zamanlama */}
        <div className='flex flex-col items-center gap-2 w-full lg:w-auto'>
          <div className='flex items-center gap-4'>
            <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
            <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />
            {playStatus
              ? <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" />
              : <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" />
            }
            <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
            <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />
          </div>
          <div className='flex items-center gap-5 mt-2'>
            <p className='text-xs'>{time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')}</p>
            <div
              ref={seekBg}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
              onMouseMove={handleSeekMouseMove}
              onClick={seekSong}
              className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'
            >
              <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'/>
            </div>
            <p className='text-xs'>{time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}</p>
          </div>
        </div>

        {/* Ek İkonlar */}
        <div className='flex items-center gap-2 opacity-75 ml-4'>
          <img className='w-4' src={assets.play_icon} alt="" />
          <img className='w-4' src={assets.mic_icon} alt="" />
          <img className='w-4' src={assets.queue_icon} alt="" />
          <img className='w-4' src={assets.speaker_icon} alt="" />
          <img className='w-4' src={assets.volume_icon} alt="" />
          <div className='w-20 bg-slate-50 h-1 rounded'></div>
          <img className='w-4' src={assets.mini_player_icon} alt="" />
          <img className='w-4' src={assets.zoom_icon} alt="" />
        </div>
      </div>
    </div>
  ) : null;
}

export default Player;
