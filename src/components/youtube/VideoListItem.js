import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { YOUTUBE_SELECT_VIDEO } from '../../reducers/youtube';
import styled from 'styled-components';
import { Icon } from 'antd'; 
import { ConvertSystemSourcetoHtml } from '../replacehtml';

const VideoItemLi = styled.li`
    display : flex;
    & span {
        display : inline-flex;
        width : 20px;
        align-items : center;
    }
    
`;
const VideoItemBox = styled.div`
    display: flex;
    border : 1px solid #EDEDED;
    align-items : center;
    width : 100%;
    & div img {
        cursor : pointer;
    }
    & .videoContent {
        display : flex;
        flex-direction : column;
    }
`;
const VideoListItem = ({video, check}) => {
    const dispatch = useDispatch();
    const selectVideo = useCallback(() => {
        dispatch({
            type: YOUTUBE_SELECT_VIDEO,
            data : video
        })
    }, []);
    return (
        <VideoItemLi onClick={selectVideo}>
            <span>{check ? <Icon className="videoIcon" type="caret-right" /> : null}</span>
            <VideoItemBox>
                <div>
                    <img src={video.thumbnails.default.url} alt={video.title}/>
                </div>
                <div className="videoContent">
                    <div><b>{ConvertSystemSourcetoHtml(video.title)}</b></div>
                    <div>{ConvertSystemSourcetoHtml(video.channelTitle)}</div>
                </div>
            </VideoItemBox>
        </VideoItemLi>
    );
};

export default VideoListItem;