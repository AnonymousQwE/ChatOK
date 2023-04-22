import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-setting";
import { all, call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  setChats,
  setCurrentChat,
  setCurrentChatMessages,
} from "../slices/chatSlice";
import { sendNewMessage } from "./chatAPI";

// export function* getUserChatsSaga({ data }) {
//   try {
//     let result = yield call(() => getUserChats());
//     yield put(setUser({}));
//   } catch (e) {
//     console.log(e);
//     yield put({ type: "REGISTER_USER_FALED" });
//   }
// }

export function* chatsListenerSaga() {
  const state = yield select();

  const channel = new eventChannel((emit) => {
    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", state.user.currentUser.id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allChats = [];
      querySnapshot.forEach((doc) => {
        const currentChat = doc.data();

        allChats.push({
          id: doc.id,
          ...currentChat,
          createDate: currentChat.createDate.toMillis(),
          lastMessageTime: currentChat.lastMessageTime.toMillis(),
        });
      });
      emit(allChats);
    });
    return unsubscribe;
  });

  while (true) {
    const allChats = yield take(channel);
    yield put(setChats(allChats));
  }
}
export function* messageListenerSaga({ payload }) {
  const channel = new eventChannel((emit) => {
    let allMessages = [];
    const messagesQuery = query(collection(db, "chats", payload, "messages"));
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const currentMessages = [...allMessages];
      querySnapshot.forEach((doc) => {
        const currentMessage = {
          ...doc.data(),
          id: doc.id,
          createDate: doc.data().createDate.toMillis(),
        };
        currentMessages.push(currentMessage);
      });
      emit(currentMessages);
    });
    return unsubscribe;
  });

  while (true) {
    const allMessages = yield take(channel);
    yield put(setCurrentChatMessages(allMessages));
  }
}

export function* sendMessageSaga(action) {
  const state = yield select();
  const message = { ...action.payload, owner: state.user.currentUser.id };
  let result = yield call(() => sendNewMessage(message));
}

export function* getCurrentChat(action) {
  const state = yield select();
  const chatQuery = query(doc(db, "chats", action.payload));
  const chatData = yield call(() => getDoc(chatQuery));
  const currentChat = chatData.data();
  yield put(
    setCurrentChat({
      ...currentChat,
      createDate: currentChat.createDate.toMillis(),
      lastMessageTime: currentChat.lastMessageTime.toMillis(),
    })
  );
}
