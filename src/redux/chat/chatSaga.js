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
import { setChats } from "../slices/chatSlice";
import { createNewChat, sendNewMessage } from "./chatAPI";

//Слушатель чатов
export function* chatsListenerSaga() {
  const state = yield select();

  const channel = new eventChannel((emit) => {
    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", state.user.currentUser.id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allChats = [];
      querySnapshot.forEach((chat) => {
        const currentChat = chat.data();
        currentChat.lastMessage.createDate =
          currentChat.lastMessage.createDate.toMillis();
        currentChat.messages = currentChat.messages.map((message) => {
          return { ...message, createDate: message.createDate.toMillis() };
        });

        allChats.push({
          ...currentChat,
          id: chat.id,
          chatCreateDate: currentChat.chatCreateDate.toMillis(),
        });
      });
      emit(allChats);
    });
    return unsubscribe;
  });

  while (true) {
    const allChats = yield take(channel);
    const newChats = yield all(
      allChats.map((chat) => {
        return call(getUserDB, { chat, state });
      })
    );
    yield put(setChats(newChats));
  }
}

//Слушатель сообщений текущего чата
// export function* messageListenerSaga({ payload }) {
//   const channel = new eventChannel((emit) => {
//     let allMessages = [];
//     const messagesQuery = doc(db, "chats", payload);
//     const unsubscribe = onSnapshot(messagesQuery, (doc) => {
//       const currentMessages = [...allMessages];
//       doc.data().messages.forEach((doc) => {
//         const currentMessage = {
//           ...doc,
//           createDate: doc.createDate.toMillis(),
//         };
//         currentMessages.push(currentMessage);
//       });
//       emit(currentMessages);
//     });
//     return unsubscribe;
//   });

//   while (true) {
//     const allMessages = yield take(channel);
//     // yield put(setCurrentChatMessages(allMessages));
//   }
// }

// Saga отправки сообщения
export function* sendMessageSaga(action) {
  const state = yield select();
  const message = { ...action.payload, owner: state.user.currentUser.id };
  let result = yield call(() => sendNewMessage(message));
}

// // Saga получения текущего чата
// export function* getCurrentChat(action) {
//   const state = yield select();
//   const chatQuery = query(doc(db, "chats", action.payload));
//   const chatData = yield call(() => getDoc(chatQuery));
//   const currentChat = chatData.data();

//   currentChat.lastMessage.createDate =
//     currentChat.lastMessage.createDate.toMillis();
//   currentChat.chatCreateDate = currentChat.chatCreateDate.toMillis();
//   // yield put(setCurrentChat(currentChat));
// }

// Saga создания чата
export function* createChatSaga(action) {
  const state = yield select();
  const newChatUser = { ...action.payload };

  let result = yield call(() =>
    createNewChat({ newChatUser, currentUser: state.user.currentUser })
  );
}

export function* getUserDB({ chat, state }) {
  const currentChatUser = chat.members.filter((e) => {
    return e != state.user.currentUser.id;
  })[0];
  const userRef = doc(db, "users", currentChatUser);
  const userSnap = yield getDoc(userRef);
  if (userSnap.exists()) {
    return { ...chat, currentChatUser: userSnap.data() };
  }
}
