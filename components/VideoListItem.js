import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { YOUTUBE_SELECT_VIDEO } from '../reducers/youtube';

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
            <div>
                <div>
                    <img src={video.thumbnails.default.url}/>
                </div>
                <div>
                    <div>{video.title}</div>
                </div>
            </div>
            
        </li>
    );
};

export default VideoListItem;