import api from '../utils/api';
import { setAlert } from './alert';

import { CREATE_CARD, CARD_ERROR, GET_CARDS } from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get current users profile
export const createCard = (formData) => async (dispatch) => {
  try {
    console.log('asfa', formData);
    const res = await api.post('/v1/nexio/card/saveCard', formData);

    dispatch({
      type: CREATE_CARD,
      payload: res.data
    });

    alert(`successfully created.`);
    dispatch(setAlert('Successfully created.', 'success'));
  } catch (err) {
    console.log(err);
    alert(err.response.data.body);
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Cards
export const getCards = () => async (dispatch) => {
  try {
    const res = await api.get('/v1/nexio/card/getCards');

    dispatch({
      type: GET_CARDS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    alert(err.response.data.body);
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
