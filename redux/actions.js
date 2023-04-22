import * as types from "./actionTypes";

export const getContactsStart = () => ({
  type: types.GET_CONTACTS_START,
});

export const getContactsSuccess = (contacts) => ({
  type: types.GET_CONTACTS_SUCCESS,
  payload: contacts,
});

export const getContactsFail = (error) => ({
  type: types.GET_CONTACTS_FAIL,
  payload: error,
});

export const deleteContactStart = (id) => ({
  type: types.DELETE_CONTACT_START,
  payload: id,
});

export const deleteContactSuccess = () => ({
  type: types.DELETE_CONTACT_SUCCESS,
});

export const deleteContactFail = (error) => ({
  type: types.DELETE_CONTACT_FAIL,
  payload: error,
});

export const addContactStart = (contact) => ({
  type: types.ADD_CONTACT_START,
  payload: contact,
});

export const addContactSuccess = () => ({
  type: types.ADD_CONTACT_SUCCESS,
});

export const addContactFail = (error) => ({
  type: types.ADD_CONTACT_FAIL,
  payload: error,
});

export const editContactStart = (contactDetail) => ({
  type: types.EDIT_CONTACT_START,
  payload: contactDetail,
});

export const editContactSuccess = () => ({
  type: types.EDIT_CONTACT_SUCCESS,
});

export const editContactFail = (error) => ({
  type: types.EDIT_CONTACT_FAIL,
  payload: error,
});
