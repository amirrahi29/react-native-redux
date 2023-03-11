import { combineReducers } from "redux";
import { cartReducer } from "./reducers";

const rootRed = combineReducers({
    cartReducer
});

export default rootRed;