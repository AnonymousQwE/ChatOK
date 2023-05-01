import { userActions } from "./user/userActions";

import { takeEvery, takeLatest } from "redux-saga/effects";
import {
  checkUserSaga,
  googleLoginUserSaga,
  logoutUserSaga,
  registerUserEmailSaga,
} from "./user/userSaga";
import { chatActions } from "./chat/chatAction";
import {
  chatsListenerSaga,
  getCurrentChat,
  messageListenerSaga,
  sendMessageSaga,
} from "./chat/chatSaga";

export function* rootSaga() {
  yield takeEvery(userActions.CHECK_USER_SAGA, checkUserSaga);
  yield takeEvery(userActions.REGISTER_USER_SAGA, registerUserEmailSaga);
  yield takeEvery(userActions.LOGOUT_USER_SAGA, logoutUserSaga);
  yield takeEvery(userActions.LOGIN_USER_SAGA, googleLoginUserSaga);
  yield takeEvery(chatActions.GET_USER_CHATS_SAGA, chatsListenerSaga);
  yield takeEvery(chatActions.GET_MESSAGES_SAGA, messageListenerSaga);
  yield takeEvery(chatActions.SEND_MESSAGE_SAGA, sendMessageSaga);
  yield takeEvery(chatActions.GET_CURRENT_CHAT_SAGA, getCurrentChat);
}
