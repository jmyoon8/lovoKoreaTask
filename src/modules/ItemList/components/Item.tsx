/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { ArticleType, ArticleListScreenProps } from "../ItemListType";
import { useDispatch } from "react-redux";
import { setfavoriteArticlesAdd, setfavoriteArticlesDelete } from "../../utils/RTK/slice";
import IsInfavoriteArticle from "./IsfavoriteArticle";
import DeleteFavoriteModal from "./DeleteFavoriteModal";

function ItemComponent({
   _id,
   headline,
   whatList,
   multimedia,
   snippet,
}: ArticleType & ArticleListScreenProps) {
   const [modalVisible, setModalVisible] = useState(false);
   const cutMultimedias = () => {
      if (multimedia) {
         let copy = [...multimedia];
         if (copy.length > 0) {
            copy.length = 1;

            return copy;
         } else {
            return undefined;
         }
      } else {
         return undefined;
      }
   };
   const dispatcher = useDispatch();
   const multimediaUrls = cutMultimedias();
   const AddFavoriteItem = () => {
      dispatcher(setfavoriteArticlesAdd({ _id, headline, multimedia: cutMultimedias(), snippet }));
   };
   const RemoveFavoritetItem = () => {
      if (whatList === "favoriteArticles") {
         setModalVisible(!modalVisible);
      } else {
         dispatcher(setfavoriteArticlesDelete({ _id }));
      }
   };

   let copySnippet = [...snippet];
   copySnippet.length = 30;

   return (
      <>
         <div
            key={_id}
            className="flex flex-col items-center justify-start 
                    lg:w-[35%] w-[95%] mb-[5px] min-h-[100px]
                    border rounded-[10px] px-[15px] mx-[5px] py-[8px]"
         >
            <div className="flex flex-row w-[100%] justify-end">
               <IsInfavoriteArticle
                  AddFavoriteItem={AddFavoriteItem}
                  RemoveFavoriteItem={RemoveFavoritetItem}
                  _id={_id}
               />
            </div>
            <div className="max-w-[100%]">
               <div className="mt-[10px] h-[50px] lg:text-[20px] text-[16px] textOverFlow font-bold">
                  {headline.print_headline || headline.main}
               </div>
               <div className="lg:text-[17px] text-[14px] ">
                  본문 : {copySnippet.join("") + "...more"}
               </div>
            </div>
            {multimediaUrls?.map((item) => {
               if (item.type === "image") {
                  return (
                     <img
                        className={"mt-[10px]"}
                        width={item.width}
                        height={item.height}
                        key={item.url}
                        src={"https://www.nytimes.com/" + item.url}
                        alt=""
                     />
                  );
               }
            })}
            <div className="mt-[10px] lg:text-[17px] text-[14px]"></div>
         </div>
         {modalVisible && (
            <DeleteFavoriteModal
               _id={_id}
               modalVisible={modalVisible}
               setModalVisible={setModalVisible}
            />
         )}
      </>
   );
}

export default ItemComponent;
