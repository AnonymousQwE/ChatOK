import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db, realTimeDb } from "../firebase-setting";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { setChats } from "../store/userSlice";
import { useDispatch } from "react-redux";

export function formatTimestamp(timestamp) {
  // generateTextToTime(timestamp);
  return timestamp.toDate().toLocaleString();
}

export const generateTextToTime = (timestamp) => {
  const timeDiff = Math.round(
    Math.abs(
      timestamp.toDate().getTime() -
        Timestamp.fromDate(new Date()).toDate().getTime()
    ) /
      1000 /
      60
  );
  let answ;
  switch (timeDiff) {
    case 0:
      answ = " Менее 1 минуты назад";
      break;
    case 1:
      answ = " 1 минуту назад";
      break;
    case 2:
      answ = " 2 минуты назад";
      break;
    case 3:
      answ = " 3 минуты назад";
      break;
    case 4:
      answ = " 4 минуты назад";
      break;
    case 5:
      answ = " 5 минут назад";
      break;
    case 6:
      answ = " 6 минут назад";
      break;
    case 7:
      answ = " 7 минут назад";
      break;
    case 8:
      answ = " 8 минут назад";
      break;
    case 9:
      answ = " 9 минут назад";
      break;
    case 10:
      answ = " 10 минут назад";
      break;
    default:
      answ = timestamp.toDate().toLocaleString();
      break;
  }

  console.log(answ);
  return answ;
};

export const setOnline = (uid) => {
  if (uid) {
    const userStatusDatabaseRef = ref(realTimeDb, "status/" + uid);

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

export function generateQuery(userId) {
  if (userId) {
    return query(
      collection(db, "chats"),
      where("members", "array-contains", userId)
      // where("members", "array-contains", userId)
    );
  }
}

export function getChats(dispatch, user) {
  if (user) {
    const unsub = onSnapshot(generateQuery(user.uid), (querySnapshot) => {
      let chats = [];
      querySnapshot.forEach((doc) => {
        const chat = doc.data();
        chats.push({
          ...chat,
          id: doc.id,
          createDate: formatTimestamp(chat.createDate),
          lastMessageTime: formatTimestamp(chat.lastMessageTime),
        });
      });
      console.log(chats);
      dispatch(setChats(chats));
    });
    return unsub;
  } else {
    dispatch(setChats([]));
  }
}
export function getMessages(dispatch, id) {
  if (user) {
    const unsub = onSnapshot(generateQuery(user.uid), (querySnapshot) => {
      let chats = [];
      querySnapshot.forEach((doc) => {
        const chat = doc.data();
        chats.push({
          ...chat,
          id: doc.id,
          createDate: formatTimestamp(chat.createDate),
          lastMessageTime: formatTimestamp(chat.lastMessageTime),
        });
      });
      console.log(chats);
      dispatch(setChats(chats));
    });
    return unsub;
  } else {
    dispatch(setChats([]));
  }
}
