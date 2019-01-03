import { startRequest, fetchUser } from "../actions/User";
import { ACTION_TYPES } from "../constants/index";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchJsonp from "fetch-jsonp";
import userReducer from "../reducers/User";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("fetch-jsonp");

describe("Actions", () => {
  test("startRequest", () => {
    const user = {};
    const result = startRequest(user);
    const expected = {
      type: ACTION_TYPES.START_REQUEST,
      payload: {
        user
      }
    };

    expect(result).toEqual(expected);
  });

  test("fetchUser", done => {
    const response = {
      data: [
        {
          id: 64889654,
          node_id: "MDEwOlJlcG9zaXRvcnk2NDg4OTY1NA==",
          name: "ccs-caldavclientlibrary",
          owner: {
            login: "apple",
            id: 10639145
          },
          html_url: "https://github.com/apple/ccs-caldavclientlibrary",
          description: "CalDAV/CardDAV Testing Tool Used by CalendarServer"
        }
      ]
    };

    fetch.mockResponse(response);

    const category = {
      id: "apple"
    };

    const initialState = {
      users: {
        categories: [category]
      }
    };

    const store = mockStore(initialState);
    const jsonResponse = JSON.stringify(response);
    const expectedActions = [
      {
        type: ACTION_TYPES.START_REQUEST,
        payload: {
          user: category
        }
      },
      {
        type: ACTION_TYPES.RECEIVE_DATA,
        payload: {
          user: category,
          error: null,
          response: jsonResponse
        }
      },
      {
        type: ACTION_TYPES.FINISH_REQUEST,
        payload: {
          user: category
        }
      }
    ];

    fetchJsonp.mockResolvedValue({
      json: function() {
        return jsonResponse;
      }
    });

    return store.dispatch(fetchUser("apple")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  test("Reducer initial Test", () => {
    const state = undefined;
    const action = {};
    const result = userReducer(state, action);
    const expected = {
      category: undefined,
      repos: undefined,
      error: false
    };
    expect(result).toEqual(expected);
  });
});
