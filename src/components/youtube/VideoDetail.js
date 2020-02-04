import React from 'react';
import Iframe from 'react-iframe';
import styled from 'styled-components';

const DetailBox = styled.div`
    width : 100%;
    height : 40vh;
    display: flex;
    flex-direction : column;
`;


const VideoDetail = ({video}) => {
    if(video === {}) {
        return <div>Loading</div>
    }
    const videoId = video.id;
    const url = `https://www.youtube.com/embed/${videoId}`;
    return (
        <DetailBox>
                <Iframe url={url} width="100%" height="100%"
                display="initial" allow="fullscreen"/>
            <div>
                <div><b>{video.title}</b></div>
                <div>{video.channelTitle}</div>
                <hr/>
                <div>{video.description}</div>
            </div>
        </DetailBox>
    );
};

export default VideoDetail;