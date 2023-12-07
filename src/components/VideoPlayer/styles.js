import styled from "@emotion/styled"

export const VideoContainer = styled("div")`
  position: relative;
  height: 300px;
  width: 529px;

  & .thumbnail-button {
    padding: 0;
    margin: 0;
    border: 0;
    cursor: pointer;
  }

  & .thumbnail-img {
    height: 300px;
    width: 529px;
  }

  & .play-icon {
    height: 42px;
    left: calc(50% - 30px);
    position: absolute;
    top: calc(50% - 21px);
    transition: all 0.3s ease-in-out;
    width: 60px;
  }

  & .youtube-iframe {
    width: 529px;
    height: 300px;
  }
`