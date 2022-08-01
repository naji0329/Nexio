import { CREATE_CARD } from '../actions/types';

const initialState = {
  cards: [],
  card: null,
  loading: true,
  error: {}
};

function cardReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CARD:
      return {
        ...state,
        cards: [payload, ...state.cards],
        loading: false
      };
    default:
      return state;
  }
}

export default cardReducer;
