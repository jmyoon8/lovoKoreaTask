import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { ArticleType, MostViewArticleType } from "../../ItemList/ItemListType";
import { axiosInstance, myKey, searchUrl } from "../axiosInstance";
import { ApiState, GetArtibleType, GetArticlesAsyncType, GetArticleType } from "./reduxType";

type SliceValue = {
   sideBarVisible: boolean;
   favoriteArticles: ArticleType[];
   checkItemNoArray: number[];
   apiState: ApiState;
   webViewUrl: string;
   result: GetArticleType;
   mostViews: MostViewArticleType[];
};

export const getArticlesAsync = createAsyncThunk(
   "article/getArticlesAsync",
   async ({ t, page, isConcat }: GetArtibleType): GetArticlesAsyncType => {
      const { data } = await axiosInstance.get(searchUrl, {
         params: {
            q: t,
            "api-key": myKey,
            page,
         },
      });

      return { data, isConcat };
   }
);

const getArticleSlice = createSlice<SliceValue, any, any>({
   name: "article",
   initialState: {
      sideBarVisible: false,
      favoriteArticles: [],
      checkItemNoArray: [],
      apiState: "",
      mostViews: [],
      result: {
         status: "",
         copyright: "",
         response: {
            docs: [],
         },
      },

      webViewUrl: "",
   },
   extraReducers: (builder) => {
      builder.addCase(getArticlesAsync.pending, (state) => {
         state.apiState = "pending";
      });
      builder.addCase(getArticlesAsync.fulfilled, (state, action) => {
         state.apiState = "fulfilled";
         const {
            payload: { data, isConcat },
         } = action;

         if (isConcat) {
            state.result.response.docs = state.result.response.docs.concat(data.response.docs);
         } else {
            state.result = data;
         }
      });
      builder.addCase(getArticlesAsync.rejected, (state) => {
         state.apiState = "rejected";
      });
   },
   reducers: {
      setSideBarVisible: (state: SliceValue, action: any) => {
         return { ...state, sideBarVisible: action.payload };
      },
      setfavoriteArticles: (state: SliceValue, action: any) => {
         return { ...state, favoriteArticles: action.payload };
      },
      setfavoriteArticlesAdd: (state: SliceValue, action: { payload: ArticleType }) => {
         state.favoriteArticles.push(action.payload);
         localStorage.setItem("favoriteArticles", JSON.stringify(current(state.favoriteArticles)));
      },
      setfavoriteArticlesDelete: (state: SliceValue, action: any) => {
         const getItemNo = action.payload._id;
         state.favoriteArticles = state.favoriteArticles.filter((item) => item._id !== getItemNo);
         localStorage.setItem("favoriteArticles", JSON.stringify(state.favoriteArticles));
      },
   },
});
export const {
   setSideBarVisible,
   setfavoriteArticles,
   setfavoriteArticlesAdd,
   setfavoriteArticlesDelete,
   setCheckItem,
} = getArticleSlice.actions as any;
export default getArticleSlice.reducer;
