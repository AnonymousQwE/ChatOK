import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../firebase-setting";

export function generateQuery(userId) {
  if (userId) {
    return query(
      collection(db, "chats"),
      where("members", "array-contains", userId)
      // where("members", "array-contains", userId)
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

export const getChatUser = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (e) {
    console.log(e);
  }
};
