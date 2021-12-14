import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setfavoriteArticlesDelete } from "../../utils/RTK/slice";
import { FavoriteModalProps } from "../ItemListType";

function DeleteFavoriteModal({ modalVisible, setModalVisible, _id }: FavoriteModalProps) {
   const [isScaleUP, setIsScaleUp] = useState(false);
   const dispatcher = useDispatch();
   useEffect(() => {
      setTimeout(() => {
         setIsScaleUp(true);
      }, 100);
   }, []);
   const removeFavoriteHandler = (isDelete: boolean) => {
      if (isDelete) {
         setIsScaleUp(false);
         setTimeout(() => {
            dispatcher(setfavoriteArticlesDelete({ _id }));
         }, 300);
      } else {
         setIsScaleUp(false);
         setTimeout(() => {
            setModalVisible(!modalVisible);
         }, 300);
      }
   };

   return (
      <div
         className="flex flex-col justify-center items-center 
                    fixed bottom-[0] top-[0] left-[0] right-[0]"
      >
         <div
            onClick={() => removeFavoriteHandler(false)}
            className="absolute bottom-[0] top-[0]
                       left-[0] right-[0] z-0
                       opacity-40 bg-black"
         />
         <div
            className={
               (isScaleUP ? "lx:w-[20%] md:w-[25%] w-[60%] h-[15%]" : "scale-0") +
               ` flex flex-col justify-start rounded-[10px] bg-[#fff]
                 px-[20px] py-[10px] couponModal z-10`
            }
         >
            <div className="flex flex-row  justify-end items-center">
               <AiOutlineClose
                  className="hoverClose hover:scale-125 cursor-pointer w-[20px] h-[20px]"
                  onClick={() => removeFavoriteHandler(false)}
               />
            </div>
            <div>해당 기사를 지우시겠습니까?</div>
            <div className="flex flex-1  flex-row justify-end items-end">
               <button
                  onClick={() => removeFavoriteHandler(true)}
                  className="border-4 rounded-[10px] px-[5px] py-[3px] active:opacity-40 mx-[5px]"
               >
                  예
               </button>
               <button
                  onClick={() => removeFavoriteHandler(false)}
                  className="border-4 rounded-[10px] px-[5px] py-[3px] active:opacity-40 mx-[5px]"
               >
                  취소
               </button>
            </div>
         </div>
      </div>
   );
}

export default DeleteFavoriteModal;
