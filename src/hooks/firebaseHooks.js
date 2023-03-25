import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db, provider } from "../firebase-setting";
import { setUser } from "../store/userSlice";
import { formatTimestamp, setOnline } from "./chatsHooks";

export async function checkUser(dispatch) {
  await getRedirectResult(auth).then((result) => {
    if (result) {
      console.log(result);
      const { displayName, email, photoURL, uid, phoneNumber } = result?.user;
      dispatch(setUser({ displayName, email, photoURL, uid, phoneNumber }));
      setOnline(uid);
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { displayName, email, photoURL, uid, phoneNumber } = user;
          dispatch(setUser({ displayName, email, photoURL, uid, phoneNumber }));
          setOnline(uid);
        } else {
          dispatch(setUser(null));
        }
      });
    }
  });
}

export const getUserChats = createAsyncThunk(
  "user/getUserChats",
  async ({ userId }, { rejectWithValue }) => {
    try {
    } catch (error) {
      let errorData;
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

export const createNewDialog = createAsyncThunk(
  "user/createNewDialog",
  async ({ chat, message }, { rejectWithValue, getState }) => {
    const state = getState();

    try {
      const newTimestamp = Timestamp.fromDate(new Date());
      const createChat = {
        createDate: newTimestamp,
        lastMessage: message.text,
        lastMessageOwner: state.user.user.uid,
        lastMessageTime: newTimestamp,
        type: "dialog",
        members: [state.user.user.uid, chat.user],
      };
      const newChat = await addDoc(collection(db, "chats"), createChat);
      console.log(newChat);
      const newMessages = await addDoc(
        collection(db, `chats/${newChat.id}`, "messages"),
        {}
      );
      return { id: newChat.id };
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

export const signInGoogle = createAsyncThunk(
  "user/signInGoogle",
  async (_, { dispatch, rejectWithValue }) => {
    let currentUser;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      signInWithRedirect(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const serverUser = result.user;
          const userData = await getDoc(doc(db, "users", serverUser.uid));
          if (userData.exists()) {
            dispatch(getUserChats(serverUser.uid));
            const user = {
              uid: serverUser.uid,
              email: serverUser.email,
              displayName: serverUser.displayName,
              photoURL: serverUser.photoURL,
            };
            currentUser = {
              ...user,
              ...userData.data(),
              createDate: formatTimestamp(userData.data().createDate),
            };
          } else {
            await setDoc(doc(db, "users", serverUser.uid), {
              createDate: Timestamp.fromDate(new Date()),
              role: "user",
              displayName: serverUser.displayName,
            });
            currentUser = {
              uid: serverUser.uid,
              email: serverUser.email,
              displayName: serverUser.displayName,
              photoURL: serverUser.photoURL,
            };
          }
        })
        .catch((error) => {
          let errorData;
          console.log(error);
          alert(error);
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
        });
      return currentUser;
    } else {
      await signInWithPopup(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const serverUser = result.user;
          const userData = await getDoc(doc(db, "users", serverUser.uid));
          if (userData.exists()) {
            console.log("SEND AUTH");
            dispatch(getUserChats(serverUser.uid));
            const user = {
              uid: serverUser.uid,
              email: serverUser.email,
              displayName: serverUser.displayName,
              photoURL: serverUser.photoURL,
            };
            currentUser = {
              ...user,
              ...userData.data(),
              createDate: formatTimestamp(userData.data().createDate),
            };
          } else {
            await setDoc(doc(db, "users", serverUser.uid), {
              createDate: Timestamp.fromDate(new Date()),
              role: "user",
              displayName: serverUser.displayName,
            });
            currentUser = {
              uid: serverUser.uid,
              email: serverUser.email,
              displayName: serverUser.displayName,
              photoURL: serverUser.photoURL,
            };
          }
        })
        .catch((error) => {
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
        });
      return currentUser;
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/serverLogoutUser",
  async () => {
    let result;
    await signOut(auth)
      .then(() => {
        result = true;
      })
      .catch((error) => {
        result = false;
      });
    return result;
  }
);

// Сделать пользователя онлайн через Real Time DB
