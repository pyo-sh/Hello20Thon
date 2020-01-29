import React from 'react';
import Iframe from 'react-iframe';
import styled from 'styled-components';

const DetailBox = styled.div`
    width : 80%;
    height : 40vh;
`;


const VideoDetail = ({video}) => {
    if(video === {}) {
        return <div>Loading</div>
    }
    const videoId = video.id;
    const url = `https:www.youtube.com/embed/${videoId}`;
    return (
        <DetailBox>
            <div>
                <Iframe url={url} width="100vw" height="100vh"
                display="initial" allow="fullscreen"></Iframe>
            </div>
            <div>
                <div>{video.title}</div>
                <div>{video.description}</div>
            </div>
        </DetailBox>
    );
};

export default VideoDetail;