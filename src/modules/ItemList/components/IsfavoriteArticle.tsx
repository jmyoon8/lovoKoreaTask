import React from "react";

import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useSelector } from "react-redux";
import { ArticleType, IsinFavoriteProps } from "../ItemListType";

function IsfavoriteArticle({ _id, AddFavoriteItem, RemoveFavoriteItem }: IsinFavoriteProps) {
   const useSelectFavoriteArticle: ArticleType[] = useSelector(
      (state: any) => state.slice.favoriteArticles
   );

   return (
      <>
         {useSelectFavoriteArticle?.find((item) => item._id === _id) ? (
            <MdFavorite
               color={"red"}
               onClick={RemoveFavoriteItem}
               className="cursor-pointer hoverFavorite hover:scale-[1.3]"
               size={20}
            />
         ) : (
            <MdOutlineFavoriteBorder
               color={"orange"}
               onClick={AddFavoriteItem}
               className="cursor-pointer hoverFavorite hover:scale-[1.3]"
               size={20}
            />
         )}
      </>
   );
}

export default IsfavoriteArticle;
