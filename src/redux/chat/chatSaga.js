import {
  Timestamp,
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
import { channel, eventChannel } from "redux-saga";
import {
  setChatMessages,
  setChats,
  setLoadingChats,
} from "../slices/chatSlice";
import { createNewChat, sendNewMessage } from "./chatAPI";
import { onValue, ref, update } from "firebase/database";
import { chatActions } from "./chatAction";

//Получение всех чатов
function initChatChannel(chatQuery) {
  return eventChannel((emit) => {
    const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
      const allChats = [];
      const checkHandler = querySnapshot.forEach((chat) => {
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
}
export function* initListenerSaga() {
  yield put(setLoadingChats(true));
  const state = yield select();

  const chatQuery = query(
    collection(db, "chats"),
    where("members", "array-contains", state.user.currentUser.id)
  );

  const channel = yield call(initChatChannel, chatQuery);

  while (true) {
    try {
      const allChat = yield take(channel);

      const chatsUserData = yield all(
        allChat.map((chat) => {
          return call(getUserDB, { chat, state });
        })
      );

      yield put(setChats(chatsUserData));
      yield put(setLoadingChats(false));
    } catch (e) {
      console.error(e);
    }
  }
}

//Получение всех пользователей онлайн
function initOnlineListener(onlineRef) {
  return eventChannel((emit) => {
    const listener = onValue(onlineRef, (snap) => {
      const data = snap.val();
      emit(data);
    });

    return () => listener.off();
  });
}
export function* initOnlineListenerSaga() {
  const state = yield select();

  const onlineRef = ref(realTimeDb, `status`);

  const onlineChannel = yield call(initOnlineListener, onlineRef);

  while (true) {
    try {
      const allOnlineUsers = yield take(onlineChannel);

      const chatsOnlineUserData = state.chat.chats.map((c) => {
        return {
          ...c,
          currentChatUser: {
            ...c.currentChatUser,
            online: {
              state: allOnlineUsers[c.currentChatUser.id].state,
              lastChange: new Timestamp(
                allOnlineUsers[c.currentChatUser.id].last_changed.seconds,
                allOnlineUsers[c.currentChatUser.id].last_changed.nanoseconds
              ).toMillis(),
            },
          },
        };
      });
      yield put(setChats(chatsOnlineUserData));
    } catch (e) {
      console.error(e);
    }
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

// Saga создания чата
export function* createChatSaga(action) {
  const state = yield select();
  const newChatUser = { ...action.payload.res };

  let result = yield call(() =>
    createNewChat({
      newChatUser,
      currentUser: state.user.currentUser,
      navigate: action.payload.navigate,
    })
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
    const currentChat = {
      ...chat,
      currentChatUser: { id: userSnap.id, ...userSnap.data() },
    };
    if (chat?.currentChatUser?.online) {
      currentChat.currentChatUser.online = chat.currentChatUser.online;
    }
    return currentChat;
  }
}
