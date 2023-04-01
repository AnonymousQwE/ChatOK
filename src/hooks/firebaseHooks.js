import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase-setting";
import { formatTimestamp } from "../utils/time";

export const createNewDialog = createAsyncThunk(
  "user/createNewDialog",
  async ({ chat, message }, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const newTimestamp = Timestamp.fromDate(new Date());
      const createChat = {
        createDate: newTimestamp,
        lastMessage: message.text,
        lastMessageOwner: state.user.user.id,
        lastMessageTime: newTimestamp,
        type: "dialog",
        members: [state.user.user.id, chat.user],
      };
      const newChat = await addDoc(collection(db, "chats"), createChat);
      console.log(newChat);
      const newMessage = {
        chatId: newChat.id,
        createDate: Timestamp.fromDate(new Date()),
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
      switch (error.code) {
        case "auth/email-already-in-use":
          errorData = "Этот email уже используется в системе!";
          break;
        case "auth/weak-password":
          errorData = "Пароль слишком лёгкий. Не менее 6 символов";
          break;

        default:
          errorData = "Неизвестная ошибка. Обратитесь к администратору!";
          break;
      }
      return rejectWithValue(errorData);
    }
  }
);

// Сделать пользователя онлайн через Real Time DB
