import React, {useCallback} from 'react';
import { opts } from '../apis/youtube';
import ysearch from 'youtube-search';
import { ADD_YOUTUBE_VIDEO_REQUEST } from '../reducers/youtube';
import {useDispatch, useSelector } from 'react-redux';
import VideoListItem from './VideoListItem';
import styled from 'styled-components';

const Vlist = styled.ul`
    list-style : none;
    overflow-y : auto;
    width : 40vw;
    height : 40vh;
    border : 1px solid black;
`;
const VideoList = () => {
    const { videos, nextPageToken, lastSearch } = useSelector(state => state.youtube);
    const dispatch = useDispatch();
    const onScroll = useCallback((e)=> {
        if( e.currentTarget.scrollHeight - e.currentTarget.clientHeight < e.currentTarget.scrollTop + 200){
            ysearch(lastSearch, opts(nextPageToken), function(err, results, pageInfo) {
                if (err) return console.log(err);
                dispatch({
                  type: ADD_YOUTUBE_VIDEO_REQUEST,
                  data: {
                      results,
                      pageInfo,
                  }
                });
              });}
    }, [lastSearch, nextPageToken, videos.length]);
    return (
        <Vlist onScroll={onScroll}>
            {videos ? videos.map(video => <VideoListItem key={video.id} video={video} />) : null}
        </Vlist>
    );
};

export default VideoList;