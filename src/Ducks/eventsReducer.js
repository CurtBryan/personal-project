const initialState = {
  events: [],
  event: []
};

const SET_EVENTS = "SET_EVENTS";

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return { ...state, events: action.payload };
    default:
      return state;
  }
}

export function setEvents(events) {
  return {
    type: SET_EVENTS,
    payload: events
  };
}
