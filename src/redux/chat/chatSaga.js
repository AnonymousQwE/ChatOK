import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, realTimeDb } from "../../firebase-setting";
import { all, call, fork, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { setChatMessages, setChats } from "../slices/chatSlice";
import { createNewChat, sendNewMessage } from "./chatAPI";
import { onValue, ref } from "firebase/database";

//Слушатель чатов
export function* chatsListenerSaga() {
  const state = yield select();

  const chatsChannel = new eventChannel((emit) => {
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
    const allChats = yield take(chatsChannel);

    const newChats = yield all(
      allChats.map((chat) => {
        return call(getUserDB, { chat, state });
      })
    );
    yield put(setChats(newChats));
  }
}

// Слушатель сообщений текущего чата
export function* messageListenerSaga({ payload }) {
  const channel = new eventChannel((emit) => {
    const messagesQuery = collection(db, "chats", payload, "messages");
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      let allMessages = [];
      querySnapshot.forEach((message) => {
        let newMessage = {
          ...message.data(),
          createDate: message.data().createDate.toMillis(),
          id: message.id,
        };
        allMessages.push(newMessage);
      });

      emit(allMessages);
    });
    return unsubscribe;
  });

  while (true) {
    const currentMessages = yield take(channel);
    yield put(setChatMessages(currentMessages));
  }
}

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

//Получение данных пользователей
export function* getUserDB({ chat, state }) {
  const currentChatUser = chat.members.filter((e) => {
    return e != state.user.currentUser.id;
  })[0];
  const userRef = doc(db, "users", currentChatUser);

  const userSnap = yield getDoc(userRef);
  if (userSnap.exists()) {
    return {
      ...chat,
      currentChatUser: { id: userSnap.id, ...userSnap.data() },
    };
  }
}
