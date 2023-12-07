import React from 'react'
import YouTube from 'react-youtube';

const YoutubeVideo = ({videoId, setHasLoaded}) => {
  const _onReady = (event) => {
    setHasLoaded(true);
    //event.target.playVideo();
  };

  return (
      <YouTube 
        videoId={videoId}
        onReady={_onReady}
        className='youtube-iframe'
        iframeClassName='youtube-iframe'
      />
  );
}

export default YoutubeVideo