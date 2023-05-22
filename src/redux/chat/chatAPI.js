import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-setting";
import { formatTimestamp } from "../../utils/time";

// Отправка сообщения
export const sendNewMessage = async (message) => {
  try {
    const newMessage = {
      text: message.text,
      senderId: message.owner,
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

    await updateDoc(currentChatRef, {
      lastMessage: {
        text: message.text,
        senderId: message.owner,
        createDate: newMessage.createDate,
      },
    });
    return {
      ...newMessage,
      createDate: newMessage.createDate.toMillis(),
    };
  } catch (e) {
    console.log(e);
    return e;
  }
};

// Создание чата
export const createNewChat = async ({ newChatUser, currentUser }) => {
  try {
    const q = query(
      collection(db, "chats"),
      where("members", "==", [newChatUser.id, currentUser.id])
    );
    const chatQuery = await getDocs(q);
    console.log(chatQuery);
    chatQuery.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    if (chatQuery.empty) {
      const systemMessage = {
        createDate: Timestamp.now(),
        text: "Создан новый чат",
        files: [],
        senderId: "system",
      };
      const newChatPayload = {
        members: [newChatUser.id, currentUser.id],
        chatCreateDate: Timestamp.now(),
        lastMessage: systemMessage,
      };
      const newChat = await addDoc(collection(db, `chats`), newChatPayload);
      const messages = await addDoc(
        collection(db, `chats/${newChat.id}/messages`),
        systemMessage
      );
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};
