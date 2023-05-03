import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../firebase-setting";

export function generateQuery(userId) {
  if (userId) {
    return query(
      collection(db, "chats"),
      where("members", "array-contains", userId)
    );
  }
}
export function generateChatQuery(chatId) {
  if (chatId) {
    return doc(db, "chats", chatId);
  }
}
export function generateMessagesQuery(chatId) {
  if (chatId) {
    return doc(db, `chats/${chatId}`, "messages");
  }
}


