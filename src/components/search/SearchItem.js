import React from "react";
import styled from "styled-components";

const SearchItemBox = styled.div`
    /* display : flex;
    & img {
        flex : 1;
    } */
`;

const SearchItem = ({ img }) => {
  return (
    <SearchItemBox>
      <a href={img.link} target="_blank">
        <img width = "100%" src={img.image} title={img.title}></img>
      </a>
    </SearchItemBox>
  );
};

export default SearchItem;
