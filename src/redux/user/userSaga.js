import { call, put } from "redux-saga/effects";
import {
  checkUser,
  getUserDataFormDB,
  loginUser,
  logoutUser,
  setOnline,
} from "./userAPI";
import { setUser } from "../slices/userSlice";

export function* checkUserSaga() {
  try {
    const currentUser = yield call(() => checkUser());
    if (currentUser !== null) {
      const userDatafromDB = yield call(() =>
        getUserDataFormDB(currentUser.id)
      );
      yield call(() => setOnline(currentUser.id));
      yield put(
        setUser({
          ...currentUser,
          ...userDatafromDB,
          createDate: userDatafromDB.createDate.toMillis(),
        })
      );
    }
  } catch (e) {
    console.log(e);
    yield put({ type: "CHECK_USER_FAILED" });
  }
}

export function* loginUserSaga() {
  try {
    let result = yield call(() => loginUser());
    if (result !== null) {
      let userDatafromDB = yield call(() => getUserDataFormDB(result.id));
      yield call(() => setOnline(result.id));

      yield put(
        setUser({
          ...result,
          ...userDatafromDB,
          createDate: userDatafromDB.createDate.toMillis(),
        })
      );
    }
  } catch (e) {
    console.log(e);
    yield put({ type: "REGISTER_USER_FALED" });
  }
}

export function* registerUserSaga() {
  try {
    let result = yield call(() => checkUser());
    let userDatafromDB = yield call(() => getUserDataFormDB(result.id));

    yield call(() => setOnline(result.id));
    yield put(
      setUser({
        ...result,
        ...userDatafromDB,
        createDate: userDatafromDB.createDate.toMillis(),
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
