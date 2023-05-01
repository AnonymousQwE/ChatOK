import { call, put } from "redux-saga/effects";
import {
  checkUser,
  getUserDataFormDB,
  googleLoginUser,
  logoutUser,
  registerUserEmail,
  setOnline,
} from "./userAPI";
import { setUser } from "../slices/userSlice";

export function* checkUserSaga() {
  try {
    const currentUser = yield call(() => checkUser());
    if (currentUser !== null) {
      const userDatafromDB = yield call(() => getUserDataFormDB(currentUser));
      yield call(() => setOnline(currentUser.id));
      yield put(
        setUser({
          ...userDatafromDB,
          createDate: userDatafromDB?.createDate?.toMillis(),
        })
      );
    }
  } catch (e) {
    console.log(e);
    yield put({ type: "CHECK_USER_FAILED" });
  }
}

export function* googleLoginUserSaga() {
  try {
    const currentUser = yield call(() => googleLoginUser());
    if (currentUser !== null) {
      const userDatafromDB = yield call(() => getUserDataFormDB(currentUser));
      yield call(() => setOnline(currentUser.id));

      yield put(
        setUser({
          ...userDatafromDB,
          createDate: userDatafromDB?.createDate?.toMillis(),
        })
      );
    }
  } catch (e) {
    console.log(e);
    yield put({ type: "REGISTER_USER_FALED" });
  }
}

export function* registerUserEmailSaga({ payload }) {
  try {
    let user = yield call(() => registerUserEmail(payload));
    let userDatafromDB = yield call(() => getUserDataFormDB(user));

    yield call(() => setOnline(user.id));
    yield put(
      setUser({
        ...userDatafromDB,
        createDate: userDatafromDB?.createDate?.toMillis(),
      })
    );
  } catch (e) {
    console.log(e);
    yield put({ type: "REGISTER_USER_FALED" });
  }
}

export function* logoutUserSaga() {
  try {
    let result = yield call(() => logoutUser());
    yield put(setUser({}));
  } catch (e) {
    console.log(e);
    yield put({ type: "REGISTER_USER_FALED" });
  }
}
