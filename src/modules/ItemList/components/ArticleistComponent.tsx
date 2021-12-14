import React from "react";
import { ArticleistComponentProps } from "../ItemListType";
import Item from "./Item";

function ArticleistComponent({ pageItemList, whatList }: ArticleistComponentProps) {
   return (
      <div className="flex justify-around pb-[20px] ">
         <div className="flex lg:flex-row lg:flex-wrap lg:justify-center lg:items-start flex-col  items-center w-[100%] ">
            {pageItemList.map((item) => {
               return <Item key={item._id} {...item} whatList={whatList} />;
            })}
         </div>
      </div>
   );
}

export default React.memo(ArticleistComponent);
