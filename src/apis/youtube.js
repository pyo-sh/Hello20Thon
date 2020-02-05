// 유튜브 검색하는 api
import { apikeys } from "./apiKey";
export const opts = (pageToken = "") => ({
  maxResults: 5,
  key: apikeys.youtubeKey,
  part: "snippet",
  type: "video",
  pageToken
});
