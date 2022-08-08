import { CREATE_TRANSACTION, GET_TRANSACTIONS } from '../actions/types';

const initialState = {
  transactions: [],
  transaction: null,
  loading: true,
  error: {}
};

function transactionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
        loading: false
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default transactionReducer;
