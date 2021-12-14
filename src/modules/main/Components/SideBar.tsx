import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarVisible } from "../../utils/RTK/slice";

import CustomLinkComponent from "./CustomLink";

function SideBar() {
   const isVisible = useSelector((state: any) => state.slice.sideBarVisible);
   const dispatcher = useDispatch();
   const modalDimVisible = () => {
      dispatcher(setSideBarVisible(!isVisible));
   };

   return (
      <div
         className={(isVisible ? "" : "z-[-10]") + " w-[100%] fixed top-0 left-0 right-0 bottom-0"}
      >
         <div
            onClick={modalDimVisible}
            className={
               (isVisible ? " block" : "hidden") +
               " bg-black w-[100%] h-[100%] absolute opacity-[0.6] "
            }
         />
         <div
            className={
               (isVisible ? "translate-x-[0%]" : "translate-x-[-100%]") +
               "  flex h-[100%]  xl:w-[10%] w-[20%] sideBarTransition"
            }
         >
            <div className="flex flex-col w-[100%] pt-[40px] bg-[#fbeaff]">
               <div className="flex flex-col justify-start w-[100%]">
                  <CustomLinkComponent to="/">홈</CustomLinkComponent>
                  <CustomLinkComponent to="/Articlelist">기사검색</CustomLinkComponent>
                  <CustomLinkComponent to="/favoriteArticles">저장한 기사</CustomLinkComponent>
               </div>
            </div>
         </div>
      </div>
   );
}

export default SideBar;
