import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { setAlert } from '../../../actions/alert';
import { createTransaction } from '../../actions/transaction';

function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardUUID: '',
    amount: '',
    currency: ''
  });

  const { cardUUID, amount, currency } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await dispatch(
      createTransaction(cardUUID, {
        amount,
        currency
      })
    );

    setLoading(false);
    navigate('/transaction/get');
  };

  return (
    <div>
      <div className="n-container">
        <div className="flex justify-center mt-20">
          <Link to={'/'}>
            <img src="/img/logo-white.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline text-center">Create Transaction</h1>

        <div className="mt-20 m-auto">
          <form className="form" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 max-w-[400px] m-auto gap-5">
              <div className="mt-0">
                <p className="font-medium">Card UUID</p>
                <input
                  type={'text'}
                  name="cardUUID"
                  value={cardUUID}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-0">
                <p className="font-medium">Amount</p>
                <input
                  type={'text'}
                  name="amount"
                  value={amount}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-0">
                <p className="font-medium">Currency</p>
                <input
                  type={'text'}
                  name="currency"
                  value={currency}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
            </div>
            <div className="mt-10 flex justify-center gap-5">
              <input
                type="submit"
                value={isLoading ? 'Loading...' : 'Create'}
                disabled={isLoading}
                className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg"
              />
              <Link to={'/'}>
                <button className="w-32 px-6 py-3 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium rounded shadow-lg">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
