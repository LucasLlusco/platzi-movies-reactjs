import React, { lazy, useState, useTransition } from 'react'
import { VideoContainer } from './styles';
const YoutubeVideo = lazy(() => import("./YoutubeVideo"));

const VideoPlayer = ({videoUrl}) => {
  const [play, setPlay] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [, startTransition] = useTransition();

  return (
    <VideoContainer>
    {(!play || !hasLoaded) && (
      <button 
        className='thumbnail-button'
        onClick={() => {
          startTransition(() => {
            setPlay(true)
          });
        }}
      >
        <img 
          alt="Thumbnail"
          src={`https://img.youtube.com/vi/${videoUrl}/hqdefault.jpg`}
          loading='lazy'
          className='thumbnail-img'
        />            
        <img
          alt="Play Video"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg"
          loading="lazy"
          className="play-icon"
        />
      </button>
    )}
    {play && ( 
       <YoutubeVideo videoId={videoUrl} setHasLoaded={setHasLoaded} />        
    )}
    </VideoContainer>
  )
}



export default VideoPlayer