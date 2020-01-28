import React from 'react';
import Iframe from 'react-iframe';
const VideoDetail = ({video}) => {
    console.log(video);
    if(video === {}) {
        return <div>Loading</div>
    }
    const videoId = video.id;
    const url = `https:www.youtube.com/embed/${videoId}`;
    return (
        <div>
            <div>
                <Iframe url={url} width="100vw" height="100vh"
                display="initial" allow="fullscreen"></Iframe>
            </div>
            <div>
                <div>{video.title}</div>
                <div>{video.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;