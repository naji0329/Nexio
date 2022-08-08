import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_TRANSACTIONS,
  TRANSACTION_ERROR,
  VOID_TRANSACTION,
  REFUND_TRANSACTION,
  CREATE_TRANSACTION
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Create Transaction
export const createTransaction = (UUID, formData) => async (dispatch) => {
  try {
    const res = await api.post('/v1/nexio/transaction/runTransact?cardUUID=' + UUID, formData);

    dispatch({
      type: CREATE_TRANSACTION,
      payload: res.data
    });

    alert(`successfully created.`);
    dispatch(setAlert('Successfully created.', 'success'));
  } catch (err) {
    console.log(err);
    alert(err.response.data.body);
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Cards
export const getTransactions = () => async (dispatch) => {
  try {
    const res = await api.get('/v1/nexio/card/getTransactions');

    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data
    });

    return res.data;
  } catch (err) {
    console.log(err);
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Void Transaction
export const voidTransaction = (transactionId) => async (dispatch) => {
  try {
    await api.post('/v1/nexio/transaction/voidTransact?transactionId=' + transactionId);

    dispatch({
      type: VOID_TRANSACTION,
      payload: transactionId
    });

    alert('VOID TRANSACTION SUCCESS!');
  } catch (err) {
    console.log(err);
    alert(err.response.data.body);
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Void Transaction
export const refundTransaction = (transactionId) => async (dispatch) => {
  try {
    await api.post('/v1/nexio/transaction/refundTransact?transactionId=' + transactionId);

    dispatch({
      type: REFUND_TRANSACTION,
      payload: transactionId
    });

    alert('REFUND TRANSACTION SUCCESS!');
  } catch (err) {
    console.log(err);
    alert(err.response.data.body);
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
