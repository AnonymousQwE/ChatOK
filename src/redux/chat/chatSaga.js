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
import { setChatMessages, setChats } from "../slices/chatSlice";
import { createNewChat, sendNewMessage } from "./chatAPI";
import { onValue, ref, update } from "firebase/database";
import { chatActions } from "./chatAction";

function initChatChannel(chatQuery) {
  return eventChannel((emit) => {
    const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
      const allChats = [];

      const checkHandler = querySnapshot.forEach((chat) => {
        const currentChat = chat.data();
        console.log(currentChat);

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

function initOnlineListener(onlineRef) {
  return eventChannel((emit) => {
    const listener = onValue(onlineRef, (snap) => {
      const data = snap.val();
      emit(data);
    });

    return () => listener.off();
  });
}

export function* initListenerSaga() {
  const state = yield select();

  const chatQuery = query(
    collection(db, "chats"),
    where("members", "array-contains", state.user.currentUser.id)
  );

  const onlineRef = ref(realTimeDb, `status/${"JxYjpxTqlPbtGFRSwPwV7pbi0Jq2"}`);

  console.log("INTIAL LISTENER SAGA");
  const channel = yield call(initChatChannel, chatQuery);
  const onlineChannel = yield call(initOnlineListener, onlineRef);

  while (true) {
    try {
      const payload = yield take(channel);
      const onlinePayload = yield take(onlineChannel);
      console.log(payload);
      console.log(onlinePayload);
      yield put(setChats(payload));
    } catch {}
  }

  // const onlineRef = ref(realTimeDb, "status");
  // console.log(state.user.currentUser.id);
  // // const channelChat = yield call(initChatListener, { chatQuery });
  // const channelChat = eventChannel((emit) => {
  //   const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
  //     const allChats = [];
  //     querySnapshot.forEach((chat) => {
  //       const currentChat = chat.data();
  //       currentChat.lastMessage.createDate =
  //         currentChat.lastMessage.createDate.toMillis();
  //       allChats.push({
  //         ...currentChat,
  //         id: chat.id,
  //         chatCreateDate: currentChat.chatCreateDate.toMillis(),
  //       });
  //       emit(allChats);
  //     });
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // });
  // const channelOnline = yield call(initOnlineListener, { onlineRef });
  // try {
  //   while (true) {
  //     const chatData = yield take(channelChat);
  //     const onlineData = yield take(channelOnline);
  //     const newState = yield select();
  //     console.log(chatData);
  //     // if (chatData) {
  //     //   console.log("chats");
  //     //   const chatsUserData = yield all(
  //     //     chatData.map((chat) => {
  //     //       return call(getUserDB, { chat, state });
  //     //     })
  //     //   );
  //     //   const newChats = chatsUserData.map((chat) => {
  //     //     const oldChat = newState.chat.chats.find((c) => c.id === chat.id);
  //     //     return { currentChatUser: oldChat?.currentChatUser, ...chat };
  //     //   });
  //     //   yield put(setChats(newChats));
  //     // }
  //     // switch (data.type) {
  //     //   case "chats":
  //     //     console.log("chats");
  //     //     const chatsUserData = yield all(
  //     //       data.data.map((chat) => {
  //     //         return call(getUserDB, { chat, state });
  //     //       })
  //     //     );
  //     //     if (newState.chat.chats.length != 0) {
  //     //       const updateChats = data.data;
  //     //       // const newChats = updateChats.map((chat) => {
  //     //       //   const oldChat = newState.chat.chats.find((c) => c.id === chat.id);
  //     //       //   oldChat;
  //     //       //   return { currentChatUser: oldChat?.currentChatUser, ...chat };
  //     //       // });
  //     //       // yield put(setChats(newChats));
  //     //       yield put(setChats(chatsUserData));
  //     //     } else {
  //     //       yield put(setChats(chatsUserData));
  //     //     }
  //     //     break;
  //     //   case "online":
  //     //     console.log("online");
  //     //     const allOnline = data.data;
  //     //     if (newState.chat.chats.length != 0) {
  //     //       const newChats = newState.chat.chats.map((chat) => {
  //     //         return {
  //     //           ...chat,
  //     //           currentChatUser: {
  //     //             ...chat.currentChatUser,
  //     //             online: {
  //     //               lastChange: new Timestamp(
  //     //                 allOnline[chat.currentChatUser.id].last_changed.seconds,
  //     //                 allOnline[
  //     //                   chat.currentChatUser.id
  //     //                 ].last_changed.nanoseconds
  //     //               ).toMillis(),
  //     //               state: allOnline[chat.currentChatUser.id].state,
  //     //             },
  //     //           },
  //     //         };
  //     //       });
  //     //       yield put(setChats(newChats));
  //     //     }
  //     //     break;
  //     //   default:
  //     //     break;
  //     // }
  //   }
  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   console.log("final");
  // }
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
