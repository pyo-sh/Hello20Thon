import React from "react";
import Iframe from "react-iframe";
import styled from "styled-components";
import { ConvertSystemSourcetoHtml } from "../replacehtml";
const DetailBox = styled.div`
  flex: 1;
  width: 100%;
  height: 60vh;
  min-height: 300px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  & .Youtube-Detail-Content{
    padding: 15px;
    & b{
      font-size:22px;
      padding-bottom: 10px;
    }
    & .Youtube-Detail-Content-Bottom{
      & .Youtube-Detail-Content-Title{
        height: 25px;
        font-size: 19px;
        margin-bottom: 10px;
      }
      & .Youtube-Detail-Content-Description{
        padding-top: 10px;
        padding: 0 10px;
        font-size: 17px;
      }
    }
  }
`;

const VideoDetail = ({ video }) => {
  if (video === {}) {
    return <div>Loading</div>;
  }
  const videoId = video.id;
  const url = `https://www.youtube.com/embed/${videoId}`;
  return (
    <DetailBox>
      <Iframe
        url={url}
        width="100%"
        height="100%"
        display="initial"
        allow="fullscreen"
      />
      <div className="Youtube-Detail-Content">
        <b>{ConvertSystemSourcetoHtml(video.title)}</b>
        <hr />
        <div className="Youtube-Detail-Content-Bottom">
          <div className="Youtube-Detail-Content-Title">{ConvertSystemSourcetoHtml(video.channelTitle)}</div>
          <div className="Youtube-Detail-Content-Description">{ConvertSystemSourcetoHtml(video.description)}</div>
        </div>
      </div>
    </DetailBox>
  );
};

export default VideoDetail;
