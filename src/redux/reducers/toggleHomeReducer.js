import { TOGGLE_HOME } from "../actions";

const INITIAL_STATE = false;

const toggleHomeReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TOGGLE_HOME:
      return payload
    default:
      return state;
  }
}

export default toggleHomeReducer
