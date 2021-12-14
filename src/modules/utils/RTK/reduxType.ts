import { ArticleType, MostViewArticleType } from "../../ItemList/ItemListType";

export type GetArtibleType = {
   t: string;
   page: number;
   isConcat: boolean;
};
export type GetArticlesAsyncType = Promise<{
   data: GetArticleType;
   isConcat: boolean;
}>;
// reduxTypes
export type ApiState = "pending" | "fulfilled" | "rejected" | "";

export type GetArticleType = {
   response: {
      docs: ArticleType[];
   };
   status: string;
   copyright: string;
};
export type GetMostViewArticleType = {
   results: MostViewArticleType[];
   status: string;
   copyright: string;
};
