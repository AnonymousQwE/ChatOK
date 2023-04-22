import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth, db, provider, realTimeDb } from "../../firebase-setting";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { Timestamp, doc, getDoc } from "firebase/firestore";

export const checkUser = async () => {
  let currentUser;

  await getRedirectResult(auth)
    .then((result) => {
      if (result) {
        const { displayName, email, photoURL, uid, phoneNumber } = result?.user;
        currentUser = { displayName, email, photoURL, id: uid, phoneNumber };
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
          } else {
            currentUser = null;
          }
        });
      }
      return currentUser;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return currentUser;
};

export const setOnline = (id) => {
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

export const loginUser = async () => {
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
        const user = {
          id: serverUser.uid,
          email: serverUser.email,
          displayName: serverUser.displayName,
          photoURL: serverUser.photoURL,
        };
        currentUser = {
          ...user,
        };
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
      });
  } else {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const serverUser = result.user;
        const user = {
          id: serverUser.uid,
          email: serverUser.email,
          displayName: serverUser.displayName,
          photoURL: serverUser.photoURL,
        };
        currentUser = {
          ...user,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return currentUser;
};

export const getUserDataFormDB = async (id) => {
  const userRef = doc(db, "users", id);
  const docSnap = await getDoc(userRef);
  let currentUserData;
  if (docSnap.exists()) {
    currentUserData = docSnap.data();
  } else {
    console.log("No such document!");
  }
  return currentUserData;
};

export const logoutUser = () => {
  signOut(auth)
    .then(() => {
      return {};
      // Sign-out successful.
    })
    .catch((error) => {
      return error;
      // An error happened.
    });
};