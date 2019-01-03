import { ACTION_TYPES } from "../constants";

const getUser = response => {
  const repos = [];
  const itemLength = response.data.length;
  for (let index = 0; index < itemLength; index += 1) {
    const item = response.data[index];
    repos.push({
      name: item.name ? item.name : "",
      description: item.description ? item.description : "",
      url: item.html_url ? item.html_url : ""
    });
  }

  return repos;
};

const initialState = {
  category: undefined,
  repos: undefined,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.START_REQUEST:
      return {
        category: action.payload.category,
        repos: undefined,
        error: false
      };
    case ACTION_TYPES.RECEIVE_DATA:
      return action.payload.error
        ? { ...state, error: true }
        : {
            ...state,
            repos: getUser(action.payload.response)
          };
    default:
      return state;
  }
};
