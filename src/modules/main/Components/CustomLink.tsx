import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { setSideBarVisible } from "../../utils/RTK/slice";
import { CustomLinkProps } from "../mainType";

function CustomLinkComponent({ children, to }: CustomLinkProps) {
   const resolve = useResolvedPath(to);
   const isMatch = useMatch({ path: resolve.pathname, end: true });
   const isVisible = useSelector((state: any) => state.slice.sideBarVisible);

   const dispatcher = useDispatch();
   const modalDimVisible = () => {
      dispatcher(setSideBarVisible(!isVisible));
   };

   return (
      <Link
         onClick={modalDimVisible}
         to={to}
         className={
            (isMatch ? "bg-[#2C73D2]" : "bg-[#fbeaff]") +
            "  flex flex-col items-center h-[50px] text-xl font-semibold lg:text-[26px] sm:text-[18px] text-[14px] justify-center cursor-pointer"
         }
      >
         {children}
      </Link>
   );
}

export default CustomLinkComponent;
