import React, { ChangeEvent, useCallback, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticlesAsync, setfavoriteArticles } from "../../utils/RTK/slice";
import ItemList from "../components/ArticleistComponent";
import { ArticleListScreenProps, ArticleType } from "../ItemListType";
import LoadingIndicator from "react-loading";
import _ from "lodash";

function ArticleListScreen({ whatList }: ArticleListScreenProps) {
   const [page, setPage] = useState(0);
   const [keyword, setKeyword] = useState("");
   const dispathcer = useDispatch();

   const searchArticles: ArticleType[] = useSelector(
      (state: any) => state.slice.result.response.docs
   );
   const favoriteArticles: ArticleType[] = useSelector(
      (state: any) => state.slice.favoriteArticles
   );

   const [articleList, setArticleList] = useState<ArticleType[]>([]);
   const loading: string = useSelector((state: any) => state.slice.apiState);

   // 약 0.5초뒤 자동 검색
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const debounceHandler = useCallback(
      _.debounce(async (t: string, page: number, isConcat: boolean) => {
         if (t.length > 1) {
            dispathcer(
               getArticlesAsync({
                  t,
                  page: page,
                  isConcat,
               })
            );
         }
      }, 500),
      []
   );
   const keywordHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
   };
   const setPageHandler = () => {
      if (whatList === "Articlelist") {
         if (keyword !== "") {
            setPage(page + 1);
         }
      } else {
         setPage(page + 1);
      }
   };
   useLayoutEffect(() => {
      dispathcer(setfavoriteArticles(JSON.parse(localStorage.favoriteArticles)));
   }, []);
   useLayoutEffect(() => {
      if (whatList === "Articlelist") {
         setArticleList(searchArticles);
      } else {
         setArticleList(favoriteArticles.slice(0, 10));
      }
   }, [searchArticles, favoriteArticles, whatList]);

   useLayoutEffect(() => {
      if (keyword !== "") {
         debounceHandler(keyword, 0, false);
         if (page > 0) {
            setPage(0);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [keyword]);

   useLayoutEffect(() => {
      if (whatList === "Articlelist") {
         if (keyword !== "") {
            debounceHandler(keyword, page, true);
         }
      } else {
         setArticleList(articleList.concat(favoriteArticles.slice(10 * page, 10 * page + 10)));
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page]);

   return (
      <div className="flex flex-col w-[100%] min-h-screen justify-start mt-[100px] ">
         {whatList === "Articlelist" && (
            <div className="flex flex-row justify-center mb-[20px] mt-[20px]">
               <input
                  type="text"
                  placeholder="검색어를 입력해주세요!"
                  className="border px-[10px] h-[50px] w-[400px]"
                  onChange={keywordHandler}
               />
            </div>
         )}

         {articleList?.length > 0 ? (
            <ItemList pageItemList={articleList} whatList={whatList} />
         ) : (
            <div className="flex flex-row justify-center mb-[20px]">데이터가 없습니다.</div>
         )}

         {loading === "pending" && (
            <div className="flex flex-1 justify-center items-center">
               <LoadingIndicator color="skyblue" width={50} height={50} type="bubbles" />
            </div>
         )}
         <div
            className="self-center flex flex-row justify-center
                       border-[2px] mb-[15px] w-[400px] rounded-[10px] p-[10px]
                       active:opacity-25 cursor-pointer"
            onClick={setPageHandler}
         >
            불러오기
         </div>
      </div>
   );
}

export default ArticleListScreen;
