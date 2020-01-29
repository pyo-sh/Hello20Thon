import React from "react";
import { useSelector } from "react-redux";
import VideoDetail from "./VideoDetail";
import VideoList from "./VideoList";
import YoutubeSearchForm from "./YoutubeSearchForm";
import styled from "styled-components";

// 유튜브 검색 해서 나오게 하는것.
const YoutubeBox = styled.div`
  display: flex;
  justify-content : center;
  align-items: center;
`;
const Youtube = () => {
  const { selectVideo, videos } = useSelector(state => state.youtube);

  return (
    <div>
      <YoutubeSearchForm />
      <YoutubeBox>
        {/* 검색해서 나오는거 추가해야함. */}
        {selectVideo ? <VideoDetail video={selectVideo} /> : null}
        {videos ? <VideoList /> : null}
      </YoutubeBox>
    </div>
  );
};

export default Youtube;
