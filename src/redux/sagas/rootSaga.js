import { all, call } from "redux-saga/effects";

import watchFetchCustomer from "./customerSaga";

// Tạm thời chưa import AuthSaga, MyProfileSaga... nếu bạn chưa copy sang
 function* rootSaga() {
  yield all([
      watchFetchCustomer()
  ]);
}
export default rootSaga;