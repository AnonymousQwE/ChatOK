import { call, put } from "redux-saga/effects";
import {
  checkUser,
  getUserDataFormDB,
  googleLoginUser,
  loginUserEmail,
  logoutUser,
  registerUserEmail,
  setOnline,
} from "./userAPI";
import { setUser } from "../slices/userSlice";
import { setLoadingStatus } from "../slices/systemSlice";

//Saga проверки пользователя
export function* checkUserSaga() {
  yield put(setLoadingStatus(true));
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
  yield put(setLoadingStatus(false));
}

//Saga авторизация пользователя через Google
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

//Saga регистрации пользователя через почту
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

//Saga авторизации пользователя через почту
export function* loginUserEmailSaga({ payload }) {
  yield put(setLoadingStatus(true));
  try {
    let user = yield call(() => loginUserEmail(payload));
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
  yield put(setLoadingStatus(false));
}

//Saga выхода пользователя
export function* logoutUserSaga() {
  try {
    let result = yield call(() => logoutUser());
    yield put(setUser({}));
  } catch (e) {
    console.log(e);
    yield put({ type: "REGISTER_USER_FALED" });
  }
}
