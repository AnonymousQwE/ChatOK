import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase-setting";
import { generateQuery } from "../utils/query";
import { formatTimestamp } from "../utils/time";
import { addChats, addMessages } from "./chatsSlice";

export const createNewMessage = createAsyncThunk(
  "chats/createNewMessage",
  async ({ chatId, newMessage }, { rejectWithValue }) => {
    if (newMessage.text.trim() !== "") {
      const newServerMessage = await addDoc(
        collection(db, `chats/${chatId}/messages`),
        newMessage
      );
      return {
        chatId,
        ...newMessage,
        createDate: formatTimestamp(newMessage.createDate),
        id: newServerMessage.id,
      };
    }
  }
);

export const createNewDialog = createAsyncThunk(
  "user/createNewDialog",
  async ({ userId }, { rejectWithValue, getState }) => {
    const state = getState();

    if (userId) {
      try {
        const newTimestamp = Timestamp.fromDate(new Date());
        const createChat = {
          createDate: newTimestamp,
          lastMessage: "Старт диалога",
          lastMessageOwner: "system",
          lastMessageTime: newTimestamp,
          type: "dialog",
          members: [state.user.user.id, userId],
        };
        const newChat = await addDoc(collection(db, "chats"), createChat);
        const newMessage = {
          chatId: newChat.id,
          createDate: newTimestamp,
          owner: "system",
          text: "Старт диалога",
          file: null,
          status: {
            send: true,
            read: false,
            error: false,
          },
        };
        const newMessages = await addDoc(
          collection(db, `chats/${newChat.id}`, "messages"),
          newMessage
        );
        return {
          ...createChat,
          id: newChat.id,
          createDate: formatTimestamp(newMessage.createDate),
        };
      } catch (error) {
        let errorData;
        console.log(error);
        return rejectWithValue(errorData);
      }
    }
  }
);
