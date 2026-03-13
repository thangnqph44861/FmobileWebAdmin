import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import myProfileReducer from "./MyProfileReducer";
// tạm thời bỏ các reducer khác nếu chưa có file tương ứng

const rootReducer = combineReducers({
  authReducer,
  myProfileReducer,
});

export default rootReducer;