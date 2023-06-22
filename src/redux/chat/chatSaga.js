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
import { eventChannel } from "redux-saga";
import { setChatMessages, setChats } from "../slices/chatSlice";
import { createNewChat, sendNewMessage } from "./chatAPI";
import { onValue, ref, update } from "firebase/database";

function initListener({ chatQuery, onlineRef }) {
  return eventChannel((emit) => {
    const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
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
        emit({ type: "chats", data: allChats });
      });
    });

    const listener = onValue(onlineRef, (snap) => {
      emit({ type: "online", data: snap.val() });
    });

    return () => {
      unsubscribe();
      listener.off();
    };
  });
}

export function* initListenerSaga() {
  const state = yield select();

  const chatQuery = query(
    collection(db, "chats"),
    where("members", "array-contains", state.user.currentUser.id)
  );
  const onlineRef = ref(realTimeDb, "status");

  const chan = yield call(initListener, { chatQuery, onlineRef });
  try {
    while (true) {
      const data = yield take(chan);
      const newState = yield select();

      switch (data.type) {
        case "chats":
          const chatsUserData = yield all(
            data.data.map((chat) => {
              return call(getUserDB, { chat, state });
            })
          );

          if (newState.chat.chats.length != 0) {
            const updateChats = data.data;
            console.log(updateChats);

            const newChats = updateChats.map((chat) => {
              const oldChat = newState.chat.chats.find((c) => c.id === chat.id);
              console.log(oldChat);
              return { currentChatUser: oldChat.currentChatUser, ...chat };
            });
            yield put(setChats(newChats));
          } else {
            console.log(chatsUserData);
            yield put(setChats(chatsUserData));
          }

          break;
        case "online":
          const allOnline = data.data;
          if (newState.chat.chats.length != 0) {
            const newChats = newState.chat.chats.map((chat) => {
              return {
                ...chat,
                currentChatUser: {
                  ...chat.currentChatUser,
                  online: {
                    lastChange: new Timestamp(
                      allOnline[chat.currentChatUser.id].last_changed.seconds,
                      allOnline[
                        chat.currentChatUser.id
                      ].last_changed.nanoseconds
                    ).toMillis(),
                    state: allOnline[chat.currentChatUser.id].state,
                  },
                },
              };
            });
            yield put(setChats(newChats));
          }
          break;

        default:
          break;
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("final");
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
