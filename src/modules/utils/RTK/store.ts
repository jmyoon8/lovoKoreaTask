import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import logger from "redux-logger";

const configureStroe = configureStore({
   reducer: reducers,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default configureStroe;
