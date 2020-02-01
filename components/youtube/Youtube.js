import React from "react";
import { useSelector } from "react-redux";
import VideoDetail from "./VideoDetail";
import VideoList from "./VideoList";
import YoutubeSearchForm from "./YoutubeSearchForm";
import styled from "styled-components";

// 유튜브 검색 해서 나오게 하는것.
const YoutubeWrapper = styled.div`
  flex: 1;
  min-width: 450px;
  max-width: 1100px;
  margin: auto;
  padding: 30px;
  padding-top: 20px;
`;
const YoutubeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  flex-direction : column;
`;
const Youtube = () => {
  const { selectVideo, videos } = useSelector(state => state.youtube);

  return (
    <YoutubeWrapper>
      <YoutubeSearchForm />
      <YoutubeBox>
        {/* 검색해서 나오는거 추가해야함. */}
        {selectVideo ? <VideoDetail video={selectVideo} /> : null}
        {videos ? <VideoList /> : null}
      </YoutubeBox>
    </YoutubeWrapper>
  );
};

export default Youtube;
