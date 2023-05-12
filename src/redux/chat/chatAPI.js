import {
  Timestamp,
  addDoc,
  collection,
  doc,
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
    const newChatPayload = {
      members: [newChatUser.id, currentUser.id],
      messages: [],
      createDate: Timestamp.now(),
      lastMessage: {
        createDate: Timestamp.now(),
        text: "Создан новый чат",
        files: [],
        senderId: "system",
      },
    };
    const newChat = await addDoc(collection(db, `chats`), newChatPayload);
    // const currentChatRef = doc(db, `chats`, message.chatId);
    // console.log(newMessage);

    // await updateDoc(currentChatRef, {
    //   lastMessage: newMessage.text,
    //   lastMessageOwner: newMessage.owner,
    //   lastMessageTime: newMessage.createDate,
    // });
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

// export const getUserDataFr = async (userId) => {
//   try {
//     const docRef = doc(db, "users", userId);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       return { ...docSnap.data(), id: docSnap.id };
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
