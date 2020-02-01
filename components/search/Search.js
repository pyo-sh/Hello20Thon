import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apikeys } from "../../apis/apiKey";
import styled from 'styled-components';
const ImageBox = styled.div`
    margin-top : 20px;
    display : flex;
    flex-wrap : wrap;
    & div {
        flex : 1;
    }
    & div img {
        width : 200px;
        min-width : 150px;
        max-width : 300px;
    }
`;

const Search = ({searchText, func, isSearching}) => {
    const cx = apikeys.googleCX;
    const api = apikeys.googleKey;
    const [ imgs, setImgs ] = useState([]);
    useEffect(() => {
        if(isSearching){
            setImgs([])
            axios.get(`https://www.googleapis.com/customsearch/v1?cx=${cx}&key=${api}&q=${encodeURIComponent(searchText)}&searchType=image&num=10`).then(image=>{
            const imageLink = image.data.items.map(item => ({image:item.link, link: item.image.contextLink}));
           setImgs(prev => imageLink);
           func.setIsSearching(false);
           func.setIsSearched(true);
       }).catch(err => console.error(err));
        }
    },[searchText, isSearching]);
    return (
        <ImageBox>
            {imgs.map(img => (
                <div>
                    <a href={img.link} target="_blank">
                        <img src={img.image}></img>
                    </a>
                </div>
            ))}
        </ImageBox>
    );
};

export default Search;