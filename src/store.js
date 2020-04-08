import {createStore} from "redux";
import reducer from "./todoListReducer";

const store = createStore(reducer);
export default store;