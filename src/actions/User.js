import fetchJsonp from "fetch-jsonp";
import { ACTION_TYPES } from "../constants";
import { replace } from "react-router-redux";

const API_URL = "https://api.github.com/users";

export const startRequest = user => ({
  type: ACTION_TYPES.START_REQUEST,
  payload: { user }
});

const receiveData = (user, error, response) => ({
  type: ACTION_TYPES.RECEIVE_DATA,
  payload: { user, error, response }
});

const finishRequest = user => ({
  type: ACTION_TYPES.FINISH_REQUEST,
  payload: { user }
});

export const fetchUser = user => {
  return async (dispatch, getState) => {
    const categories = getState().users.categories;
    const category = categories.find(category => category.id === user);
    if (typeof category === "undefined") {
      dispatch(replace(""));
      return;
    }

    dispatch(startRequest(category));

    try {
      const response = await fetchJsonp(`${API_URL}/${user}/repos`);
      const data = await response.json();
      dispatch(receiveData(category, null, data));
    } catch (error) {
      dispatch(receiveData(category, error));
    }
    dispatch(finishRequest(category));
  };
};
