const initialState = {
  friendsList: []
};

const SET_FRIENDS_LIST = "SET_FRIENDS_LIST";

export default function friendsListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FRIENDS_LIST:
      return { ...state, friendsList: action.payload };
    default:
      return state;
  }
}

export function setFriendsList(friendsList) {
  return {
    type: SET_FRIENDS_LIST,
    payload: friendsList
  };
}
