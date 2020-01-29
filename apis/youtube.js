// 유튜브 검색하는 api
export const opts = (pageToken='') => ({
    maxResults : 5,
    key : "AIzaSyCarUznQ1Jz-CfPZPfNpH4A9B55AIxgYwo",
    part : 'snippet',
    type : 'video',
    pageToken,
});