import { ApiState } from "../utils/RTK/reduxType";

export interface ArticleListScreenProps {
   whatList: "Articlelist" | "favoriteArticles";
}

export interface ArticleistComponentProps extends ArticleListScreenProps {
   pageItemList: ArticleType[];
}
export interface IsinFavoriteProps {
   _id: string;
   RemoveFavoriteItem: () => void;
   AddFavoriteItem: () => void;
}
export interface FavoriteModalProps {
   modalVisible: boolean;
   setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
   _id: string;
}
///기사타입
// state type
export type multimediaType = {
   height: number;
   width: number;
   url: string;
   type: "image";
};
export type ArticleType = {
   _id: string;
   headline: {
      content_kicker: any;
      kicker: string;
      main: string;
      name: string;
      print_headline: string;
      sub: any;
   };
   snippet: string;
   multimedia: multimediaType[];
};
export type MostViewArticleType = {
   title: string;
   abstract: string;
   published_date: string;
   url: string;
};
export type GetArticleData = {
   apiState: ApiState;
   result: {
      response: {
         docs: ArticleType[];
      };
      status: string;
      copyright: string;
   };
};
// component type

export interface ArticleListProps {
   news: ArticleType[];
   setPage: React.Dispatch<React.SetStateAction<number>>;
   keyWord?: string;
   clipsLength?: number;
}
export interface RecentlyKeyWordComponentProps {
   keyword: string;
   setKeyWord: React.Dispatch<React.SetStateAction<string>>;
   setIsRecentlyItemVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface KeyWordComponentProps {
   item: string;
   setKeyWord: (item: string) => void;
   deleteKeyword: (item: string) => void;
}
