import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticleListScreen from "./modules/ItemList/Screen/ArticleListScreen";
import Header from "./modules/main/Components/Header";
import SideBar from "./modules/main/Components/SideBar";
import Main from "./modules/main/Screens/Main";
import configureStroe from "./modules/utils/RTK/store";

function App() {
   useEffect(() => {
      if (!localStorage.favoriteArticles) {
         localStorage.setItem("favoriteArticles", JSON.stringify([]));
      }
      // sameCookie none 적용
      document.cookie = "safeCookie1=foo; SameSite=Lax";
      document.cookie = "safeCookie2=foo";
      document.cookie = "crossCookie=bar; SameSite=None; Secure";
   }, []);

   return (
      <Provider store={configureStroe}>
         <BrowserRouter>
            <div className="flex flex-row relative min-h-[calc(100vh-100px)]">
               <Header />
               <SideBar />
               <main className="flex flex-[1] min-h-[100%]">
                  <Routes>
                     <Route path="/" element={<Main />} />
                     <Route
                        path="Articlelist"
                        element={<ArticleListScreen whatList="Articlelist" />}
                     />
                     <Route
                        path="favoriteArticles"
                        element={<ArticleListScreen whatList="favoriteArticles" />}
                     />
                  </Routes>
               </main>
            </div>
         </BrowserRouter>
      </Provider>
   );
}

export default App;
