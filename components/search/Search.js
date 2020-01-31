import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apikeys } from "../../apis/apiKey";

const Search = () => {
    const cx = apikeys.googleCX;
    const api = apikeys.googleKey;
    const search = "푸쉬업";
    const [ imgs, setImgs ] = useState([]);
    useEffect(() => {
       axios.get(`https://www.googleapis.com/customsearch/v1?cx=${cx}&key=${api}&q=${encodeURIComponent(search)}&searchType=image&num=5`).then(image=>{
           image.data.items.forEach(item => {
               setImgs(prev => [...prev, item.link]);
           });
       }).catch(err => console.error(err));
    },[]);
    return (
        <div>
            구글서치 중
            { imgs.map(img => (
                <img src={img}></img>
            ))}
        </div>
    );
};

export default Search;