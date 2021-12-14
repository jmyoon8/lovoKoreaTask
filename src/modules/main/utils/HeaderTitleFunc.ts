export const headerFunction = (path: string) => {
   if (path === "/") {
      return "홈";
   } else if (path.includes("/Articlelist")) {
      return "기사";
   } else if (path.includes("/favoriteArticles")) {
      return "저장한 기사";
   }
};
