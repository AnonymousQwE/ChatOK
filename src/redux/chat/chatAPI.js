import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-setting";
import { formatTimestamp } from "../../utils/time";

// Отправка сообщения
export const sendNewMessage = async (message) => {
  try {
    const newMessage = {
      ...message,
      createDate: Timestamp.now(),
      file: null,
      status: {
        send: true,
        read: false,
        error: false,
      },
    };
    const newServerMessage = await addDoc(
      collection(db, `chats/${message.chatId}/messages`),
      newMessage
    );
    const currentChatRef = doc(db, `chats`, message.chatId);
    console.log(newMessage);

    await updateDoc(currentChatRef, {
      lastMessage: newMessage.text,
      lastMessageOwner: newMessage.owner,
      lastMessageTime: newMessage.createDate,
    });
    return {
      ...newMessage,
      createDate: newMessage.createDate.toMillis(),
      id: newServerMessage.id,
    };
  } catch (e) {
    console.log(e);
    return e;
  }
};

// Создание чата
export const createNewChat = async ({ newChatUser, currentUser }) => {
  try {
    const systemMessage = {
      createDate: Timestamp.now(),
      text: "Создан новый чат",
      files: [],
      senderId: "system",
    };
    const newChatPayload = {
      members: [newChatUser.id, currentUser.id],
      messages: [systemMessage],
      chatCreateDate: Timestamp.now(),
      lastMessage: systemMessage,
    };
    const newChat = await addDoc(collection(db, `chats`), newChatPayload);
    // const currentChatRef = doc(db, `chats`, message.chatId);
    // console.log(newMessage);

    // await updateDoc(currentChatRef, {
    //   lastMessage: newMessage.text,
    //   lastMessageOwner: newMessage.owner,
    //   lastMessageTime: newMessage.createDate,
    // });
    // return {
    //   ...newMessage,
    //   createDate: newMessage.createDate.toMillis(),
    //   id: newServerMessage.id,
    // };
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const addUsers = async ({ allChats, state }) => {
  allChats.map(async (chat, i) => {
    const currentChatUser = chat.members.filter((e) => {
      return e != state.user.currentUser.id;
    })[0];
    const userRef = doc(db, "users", currentChatUser);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      // console.log(allChats)
      return { ...allChats[i], currentChatUser: userSnap.data() };
    }
  });
};
// allChats.map(async (chat, i) => {
//   const currentChatUser = chat.members.filter((e) => {
//     return e != state.user.currentUser.id;
//   })[0];
//   const userRef = doc(db, "users", currentChatUser);
//   const userSnap = await getDoc(userRef);
//   if (userSnap.exists()) {
//     return await { ...allChats[i], currentChatUser: userSnap.data() };
//   }
// });
// console.log(allChats);
