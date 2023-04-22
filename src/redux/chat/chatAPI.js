import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-setting";
import { formatTimestamp } from "../../utils/time";

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
