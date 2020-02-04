import React, { useState, useEffect } from "react";
import axios from "axios";
import { apikeys } from "../../apis/apiKey";
import styled from "styled-components";
import SearchItem from "./SearchItem";
import { Row, Col } from "antd";
const ImageBox = styled.div`
  margin-top: 20px;
`;

const Search = ({ searchText, func, isSearching }) => {
  const cx = apikeys.googleCX;
  const api = apikeys.googleKey;
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    if (isSearching) {
      setImgs([]);
      axios
        .get(
          `https://www.googleapis.com/customsearch/v1?cx=${cx}&key=${api}&q=${encodeURIComponent(
            searchText
          )}&searchType=image&num=10`
        )
        .then(image => {
          const imageLink = image.data.items.map(item => ({
            image: item.link,
            link: item.image.contextLink,
            title: item.title
          }));
          setImgs(prev => imageLink);
          func.setIsSearching(false);
        })
        .catch(err => console.error(err));
    }
  }, [searchText, isSearching]);
  return (
    <ImageBox>
      <Row type="flex" justify="center" gutter={[12,12]}>
        {imgs.map((img, i) => (
          <Col xs ={24}sm ={8} lg={6}>
            <SearchItem key={i} img={img} />
          </Col>
        ))}
      </Row>
    </ImageBox>
  );
};

export default Search;
