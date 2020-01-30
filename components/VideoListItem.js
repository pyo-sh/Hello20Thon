import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { YOUTUBE_SELECT_VIDEO } from '../reducers/youtube';
import styled from 'styled-components';

const VideoItemBox = styled.div`
    display: flex;
    border : 1px solid #EDEDED;
    align-items : center;
    & div img {
        cursor : pointer;
    }
    & div {
        text-align : center;
    }
`;
const VideoListItem = ({video}) => {
    const dispatch = useDispatch();
    const selectVideo = useCallback(() => {
        dispatch({
            type: YOUTUBE_SELECT_VIDEO,
            data : video
        })
    }, []);
    return (
        <li onClick={selectVideo}>
            <VideoItemBox>
                <div>
                    <img src={video.thumbnails.default.url}/>
                </div>
                <div><b>{video.title}</b></div>
            </VideoItemBox>
        </li>
    );
};

export default VideoListItem;