import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase-setting";
import { generateQuery } from "../utils/query";
import { formatTimestamp } from "../utils/time";
import { addChats, addMessages } from "./chatsSlice";

export const syncUserChats = createAsyncThunk(
  "chats/syncUserChats",
  async ({ user }, { dispatch, rejectWithValue }) => {
    const snap = await onSnapshot(
      generateQuery(user.id),
      async (querySnapshot) => {
        const allChats = await querySnapshot.docs.map((doc) => {
          const chat = doc.data();
          const snap = onSnapshot(
            collection(db, "chats", doc.id, "messages"),
            (query) => {
              const allMessages = query.docs.map((m) => {
                return {
                  chatId: doc.id,
                  id: m.id,
                  ...m.data(),
                  createDate: m.data().createDate.toMillis(),
                };
              });
              dispatch(addMessages(allMessages));
              return allMessages;
            }
          );
          return {
            ...doc.data(),
            id: doc.id,
            createDate: chat?.createDate.toMillis(),
            lastMessageTime: chat?.lastMessageTime.toMillis(),
          };
        });
        dispatch(addChats(allChats));
        return allChats;
      }
    );
  }
);

export const createNewMessage = createAsyncThunk(
  "chats/createNewMessage",
  async ({ chatId, newMessage }, { rejectWithValue }) => {
    if (newMessage.text.trim() !== "") {
      const newServerMessage = await addDoc(
        collection(db, `chats/${chatId}/messages`),
        newMessage
      );
      console.log(newServerMessage);
      return {
        chatId,
        ...newMessage,
        createDate: formatTimestamp(newMessage.createDate),
        id: newServerMessage.id,
      };
    }
  }
);
