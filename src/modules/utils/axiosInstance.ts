import axios from "axios";

export const myKey = "wTwRh7Blb0nUPWPWvHQCWVupJSoQBqeu ";
export const searchUrl = "search/v2/articlesearch.json";

export const axiosInstance = axios.create({
   baseURL: "https://api.nytimes.com/svc/",
});
