// import { takeLatest, all, put, fork } from "redux-saga/effects";
// import * as types from "./actionTypes";
// import firebaseDb from "../firebase";
// import {
//   getContactsSuccess,
//   getContactsFail,
//   deleteContactSuccess,
//   deleteContactFail,
//   addContactSuccess,
//   addContactFail,
//   editContactSuccess,
//   editContactFail,
// } from "./actions";

// export function* onLoadContactAsync() {
//   try {
//     const contacts = yield new Promise((resolve) =>
//       firebaseDb.child("contacts").on("value", resolve)
//     );
//     if (contacts.val() !== null) {
//       yield put(getContactsSuccess(contacts.val()));
//     } else {
//       yield put(getContactsSuccess({}));
//     }
//   } catch (error) {
//     yield put(getContactsFail());
//   }
// }

// export function* onDeleteContactAsync({ payload: id }) {
//   try {
//     yield firebaseDb.child(`contacts/${id}`).remove();
//     yield put(deleteContactSuccess());
//   } catch (error) {
//     yield put(deleteContactFail());
//   }
// }

// export function* onAddContactAsync({ payload: contact }) {
//   try {
//     yield firebaseDb.child("contacts").push(contact);
//     yield put(addContactSuccess());
//   } catch (error) {
//     yield put(addContactFail());
//   }
// }

// export function* onEditContactAsync({
//   payload: { id, initialState: contact },
// }) {
//   try {
//     yield firebaseDb.child(`contacts/${id}`).set(contact);
//     yield put(editContactSuccess());
//   } catch (error) {
//     yield put(editContactFail());
//   }
// }

// export function* onLoadContacts() {
//   yield takeLatest(types.GET_CONTACTS_START, onLoadContactAsync);
// }

// export function* onDeleteContact() {
//   yield takeLatest(types.DELETE_CONTACT_START, onDeleteContactAsync);
// }

// export function* onAddContact() {
//   yield takeLatest(types.ADD_CONTACT_START, onAddContactAsync);
// }

// export function* onEditContact() {
//   yield takeLatest(types.EDIT_CONTACT_START, onEditContactAsync);
// }

// const contactSagas = [
//   fork(onLoadContacts),
//   fork(onDeleteContact),
//   fork(onAddContact),
//   fork(onEditContact),
// ];

// export default function* rootSaga() {
//   yield all([...contactSagas]);
// }
