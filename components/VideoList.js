import React, {useCallback, useRef} from 'react';
import { opts } from '../apis/youtube';
import ysearch from 'youtube-search';
import { ADD_YOUTUBE_VIDEO_REQUEST } from '../reducers/youtube';
import {useDispatch, useSelector } from 'react-redux';
import VideoListItem from './VideoListItem';
import styled from 'styled-components';

const Vlist = styled.ul`
    list-style : none;
    overflow-y : auto;
    width : 100%;
    height : 40vh;
    border : 1px solid #E8E8E8;
    border-radius : 5px;
`;
const VideoList = () => {
    const searchNext = useRef(true);
    const { videos, nextPageToken, lastSearch } = useSelector(state => state.youtube);
    const dispatch = useDispatch();
    const onScroll = useCallback((e)=> {
        if(searchNext.current && e.currentTarget.scrollHeight - e.currentTarget.clientHeight < e.currentTarget.scrollTop + 200){
            searchNext.current = false;
            ysearch(lastSearch, opts(nextPageToken), function(err, results, pageInfo) {
                if (err) return console.log(err);
                dispatch({
                  type: ADD_YOUTUBE_VIDEO_REQUEST,
                  data: {
                      results,
                      pageInfo,
                  }
                });
                searchNext.current = true;
              });}
    }, [lastSearch, nextPageToken, videos.length, searchNext.current]);
    return (
        <Vlist onScroll={onScroll}>
            {videos ? videos.map(video => <VideoListItem key={video.id} video={video} />) : null}
        </Vlist>
    );
};

export default VideoList;