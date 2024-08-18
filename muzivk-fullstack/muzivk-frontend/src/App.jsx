import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import { PlayerContext } from './context/PlayerContext';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black flex flex-col'>
      {songsData.length !== 0 ? (
        <div className='flex flex-1'>
          <Sidebar />
          <Display />
        </div>
      ) : null}
      
      <Player className="h-16" />
      <audio ref={audioRef} src={track ? track.file : ""} preload='auto'></audio>
    </div>
  );
};

export default App;
