const initialState = {
  events: [],
  future_events: [],
  events_attended: []
};

const SET_EVENTS = "SET_EVENTS";
const SET_FUTURE_EVENTS = "SET_FUTURE_EVENTS";
const SET_EVENTS_ATTENDED = "SET_EVENTS_ATTENDED";

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
