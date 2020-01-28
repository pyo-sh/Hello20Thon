import React, { useState, useCallback, useEffect } from "react";
import { opts } from "../apis/youtube";
import * as ysearch from 'youtube-search';
import { useDispatch, useSelector } from 'react-redux';
import { YOUTUBE_VIDEO_REQUEST } from '../reducers/youtube';
import { Input, Form, Button } from "antd";
import styled from 'styled-components';

const YoutubeForm = styled(Form)`
    display : flex;
    & .searchInput {
      width : 40%;
      margin-right: 5px;
    }
`; 

const YoutubeSearchForm = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { nextPageToken, lastSearch } = useSelector(state => state.youtube);

  useEffect(() => { // 제일 처음 불러오는 것.
    ysearch(lastSearch, opts(nextPageToken), function(err, results, pageInfo) {
        if (err) return console.log(err);
        dispatch({
          type: YOUTUBE_VIDEO_REQUEST,
          data: {
              results,
              pageInfo,
          }
        });
      });
  },[]);
  const onChangeSearch = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  const onSubmitSearch = useCallback(
    e => {
      e.preventDefault();
      ysearch(search, opts(nextPageToken), function(err, results, pageInfo) {
        if (err) return console.log(err);
        dispatch({
          type: YOUTUBE_VIDEO_REQUEST,
          data: {
              results,
              pageInfo,
              search,
          }
        });
      });
    }, [search, nextPageToken]);

  return (
    <YoutubeForm onSubmit={onSubmitSearch}>
      <Input className="searchInput" value={search} onChange={onChangeSearch} />
      <Button htmlType="submit" type="primary">
        검색
      </Button>
    </YoutubeForm>
  );
};

export default YoutubeSearchForm;
