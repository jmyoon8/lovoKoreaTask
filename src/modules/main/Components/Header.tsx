import React from "react";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { CFFF } from "../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarVisible } from "../../utils/RTK/slice";
import { useLocation } from "react-router";
import { headerFunction } from "../utils/HeaderTitleFunc";

function Header() {
   const dispatcher = useDispatch();
   const isVisible = useSelector((state: any) => state.slice.sideBarVisible);
   const location = useLocation();

   const sideBarVisible = () => {
      dispatcher(setSideBarVisible(!isVisible));
   };

   return (
      <header className="flex flex-row justify-between items-center fixed px-[10px] w-[100%] h-[4.5vw] bg-[#b39cd0]">
         <div className="left-[4px] z-[-10] lg:top-[10px] top-[2px]">
            {isVisible ? (
               <AiOutlineMenuFold
                  className=" lg:w-11 lg:h-10 w-7 h-5"
                  onClick={sideBarVisible}
                  color={CFFF}
               />
            ) : (
               <AiOutlineMenuUnfold
                  onClick={sideBarVisible}
                  className=" lg:w-11 lg:h-10 w-7 h-5"
                  color={CFFF}
               />
            )}
         </div>
         <div className=" top-0 right-[10px] pr-3 lg:text-[18px] text-[12px] font-bold headerTextColor">
            lovo:{headerFunction(location.pathname)}
         </div>
      </header>
   );
}

export default Header;
