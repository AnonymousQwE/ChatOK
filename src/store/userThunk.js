import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db, provider, realTimeDb } from "../firebase-setting";
import { formatTimestamp } from "../utils/time";
import { syncUserChats } from "./chatsThunk";

export const signInGoogle = createAsyncThunk(
  "user/signInGoogle",
  async (_, { dispatch, rejectWithValue }) => {
    let currentUser;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      await signInWithRedirect(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const serverUser = result.user;
          const userData = await getDoc(doc(db, "users", serverUser.id));
          if (userData.exists()) {
            dispatch(syncUserChats(serverUser.id));
            const user = {
              id: serverUser.id,
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
            await setDoc(doc(db, "users", serverUser.id), {
              createDate: Timestamp.fromDate(new Date()),
              role: "user",
              displayName: serverUser.displayName,
            });
            currentUser = {
              id: serverUser.id,
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
          const userData = await getDoc(doc(db, "users", serverUser.id));
          if (userData.exists()) {
            console.log("SEND AUTH");
            dispatch(syncUserChats(serverUser.id));
            const user = {
              id: serverUser.id,
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
            await setDoc(doc(db, "users", serverUser.id), {
              createDate: Timestamp.fromDate(new Date()),
              role: "user",
              displayName: serverUser.displayName,
            });
            currentUser = {
              id: serverUser.id,
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
      console.log(currentUser);
      return currentUser;
    }
  }
);

export const checkUser = createAsyncThunk(
  "user/checkUser",
  async (_, { dispatch, rejectWithValue }) => {
    let currentUser;
    const setOnline = (id) => {
      if (id) {
        const userStatusDatabaseRef = ref(realTimeDb, "status/" + id);

        const isOfflineForDatabase = {
          state: "offline",
          last_changed: Timestamp.fromDate(new Date()),
        };

        const isOnlineForDatabase = {
          state: "online",
          last_changed: Timestamp.fromDate(new Date()),
        };

        onValue(ref(realTimeDb, ".info/connected"), function (snapshot) {
          if (snapshot.val() == false) {
            return;
          }

          onDisconnect(userStatusDatabaseRef)
            .set(isOfflineForDatabase)
            .then(function () {
              set(userStatusDatabaseRef, isOnlineForDatabase);
            });
        });
      }
    };

    await getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log(result);
          const { displayName, email, photoURL, uid, phoneNumber } =
            result?.user;
          currentUser = { displayName, email, photoURL, id: uid, phoneNumber };
          setOnline(uid);
        } else {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              const { displayName, email, photoURL, uid, phoneNumber } = user;
              currentUser = {
                displayName,
                email,
                photoURL,
                id: uid,
                phoneNumber,
              };
              setOnline(uid);
            } else {
              currentUser = null;
            }
          });
        }
      })
      .catch((error) => {
        //   let errorData;
        console.log(error);
        //   switch (error.code) {
        //     case "auth/email-already-in-use":
        //       errorData = "Этот email уже используется в системе!";
        //       break;
        //     case "auth/weak-password":
        //       errorData = "Пароль слишком лёгкий. Не менее 6 символов";
        //       break;
        //     default:
        //       errorData = "Неизвестная ошибка. Обратитесь к администратору!";
        //       break;
        //   }
        return rejectWithValue(error);
      });
    const chats = dispatch(syncUserChats({ user: currentUser }));

    return currentUser;
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
