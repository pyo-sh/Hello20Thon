import React, { useState, useCallback } from "react";
import Search from "../components/search/Search";
import { Input, Button } from "antd";
import styled from "styled-components";

const SearchBox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  & .loading {
    position: absolute;
    top: 50%;
    left : 50%;
    transform: translate(-50%,-50%);
    height: 40px;
    display: flex;
    align-items : center;
  }
  & .loading .obj {
    width: 6px;
    height: 40px;
    background: #40A9FF;
    margin: 0 3px;
    border-radius: 10px;
    animation: loading 0.8s infinite;
  }

  & .loading .obj:nth-child(2) {
    animation-delay: 0.1s;
  }
  & .loading .obj:nth-child(3) {
    animation-delay: 0.2s;
  }
  & .loading .obj:nth-child(4) {
    animation-delay: 0.3s;
  }
  & .loading .obj:nth-child(5) {
    animation-delay: 0.4s;
  }
  & .loading .obj:nth-child(6) {
    animation-delay: 0.5s;
  }
  & .loading .obj:nth-child(7) {
    animation-delay: 0.6s;
  }
  & .loading .obj:nth-child(8) {
    animation-delay: 0.7s;
  }

  @keyframes loading {
    0% {
      height: 0;
    }
    50% {
      height: 40px;
    }
    100% {
      height: 0;
    }
  }
  & .SearchInputBox {
    display: flex;
    width: 80%;
    justify-content: center;
  }
  & .SearchInputBox input {
    width: 50%;
    margin-right: 5px;
  }
`;

const Searchimage = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTextOnChange = useCallback(e => {
    setSearchText(e.target.value);
  }, []);
  const searchOnClick = useCallback(() => {
    setIsSearching(true);
    setIsSearched(false);
  }, []);
  return (
    <SearchBox>
      <div className="SearchInputBox">
        <Input
          placeholder="운동을 검색해주세요!"
          value={searchText}
          onChange={searchTextOnChange}
          onPressEnter={searchOnClick}
        />
        <Button onClick={searchOnClick} type="primary">
          검색
        </Button>
      </div>
      {isSearching && (
        <div className="loading">
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
          <div className="obj"></div>
        </div>
      )}
      <Search
        searchText={searchText}
        isSearching={isSearching}
        func={ {setIsSearching }}
      />
    </SearchBox>
  );
};

export default Searchimage;
