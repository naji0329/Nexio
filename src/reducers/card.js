import { CREATE_CARD, GET_CARDS, DELETE_CARD } from '../actions/types';

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
    case GET_CARDS:
      return {
        ...state,
        cards: payload,
        loading: false
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card.uuid !== payload),
        loading: false
      };
    default:
      return state;
  }
}

export default cardReducer;
