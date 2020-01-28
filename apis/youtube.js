// 유튜브 검색하는 api
export const opts = (pageToken='') => ({
    maxResults : 5,
    key : "AIzaSyDR6mw3Nl4SdvYbPF6xqcrqIds1_VCvnuE",
    part : 'snippet',
    type : 'video',
    pageToken,
});