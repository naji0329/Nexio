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

    return true;
  } catch (err) {
    console.log(err);

    const errors = err.response.data.errors;
    if (errors.length > 0) {
      alert(errors[0]);
    }

    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    return false;
  }
};

// Get Cards
export const getTransactions = () => async (dispatch) => {
  try {
    let res = await api.get('/v1/nexio/card/getTransactions');

    for (let i = 0; i < res.data.length; i++) {
      const statusRes = await api.get(
        `v1/nexio/transaction/transactionStatus?transactionId=${res.data[i].cardTransactionCompositeKey.transactionId}`
      );
      res.data[i].transactionStatus = statusRes.data.transactionStatus;
    }

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
    const res = await api.post('/v1/nexio/transaction/voidTransact?transactionId=' + transactionId);

    dispatch({
      type: VOID_TRANSACTION,
      payload: transactionId
    });

    console.log(res);
    alert(res.data.body);
  } catch (err) {
    console.log(err);
    alert(err.response.data);
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Void Transaction
export const refundTransaction = (transactionId) => async (dispatch) => {
  try {
    const res = await api.post(
      '/v1/nexio/transaction/refundTransact?transactionId=' + transactionId
    );

    dispatch({
      type: REFUND_TRANSACTION,
      payload: transactionId
    });

    console.log(res);
    alert(res.data.body);
  } catch (err) {
    console.log(err);
    alert(err.response.data);
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
