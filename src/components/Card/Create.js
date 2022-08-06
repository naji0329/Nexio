import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { setAlert } from '../../../actions/alert';
import { createCard } from '../../actions/card';

function Create() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    cardHolderName: '',
    cardType: '',
    cardUUID: '',
    encryptedNumber: '',
    expirationMonth: '',
    expirationYear: '',
    // firstSix: '',
    // lastFour: '',
    securityCode: ''
  });

  const {
    cardHolderName,
    cardType,
    cardUUID,
    encryptedNumber,
    expirationMonth,
    expirationYear,
    // firstSix,
    // lastFour,
    securityCode
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      createCard({
        cardHolderName,
        cardType,
        cardUUID,
        encryptedNumber,
        expirationMonth,
        expirationYear,
        // firstSix,
        // lastFour,
        securityCode
      })
    );
  };

  return (
    <div>
      <div className="n-container">
        <div className="flex justify-center mt-20">
          <Link to={'/'}>
            <img src="/img/logo-white.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline text-center">Create Card</h1>

        <div className="mt-20 m-auto">
          <form className="form" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <div className="mt-0">
                <p className="font-medium">Name on Card</p>
                <input
                  type={'text'}
                  name="cardHolderName"
                  value={cardHolderName}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-0">
                <p className="font-medium">Card Type</p>
                <input
                  type={'text'}
                  name="cardType"
                  value={cardType}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
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
                <p className="font-medium">Encrypted Number</p>
                <input
                  type={'text'}
                  name="encryptedNumber"
                  value={encryptedNumber}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-0">
                <p className="font-medium">Expiry Year</p>
                <input
                  type={'text'}
                  name="expirationYear"
                  value={expirationYear}
                  placeholder="YY"
                  maxLength={2}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-0">
                <p className="font-medium">Expiry Month</p>
                <input
                  type={'text'}
                  name="expirationMonth"
                  value={expirationMonth}
                  placeholder="MM"
                  maxLength={2}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              {/* <div className="mt-0">
                <p className="font-medium">First Six</p>
                <input
                  type={'text'}
                  name="firstSix"
                  value={firstSix}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
              <div className="mt-0">
                <p className="font-medium">Last Four</p>
                <input
                  type={'text'}
                  name="lastFour"
                  value={lastFour}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div> */}
              <div className="mt-0">
                <p className="font-medium">Security code</p>
                <input
                  type={'text'}
                  maxLength="3"
                  pattern="[0-9][0-9][0-9]"
                  placeholder="XXX"
                  name="securityCode"
                  value={securityCode}
                  onChange={onChange}
                  className="border border-[#5C6BC0] px-4 py-2 w-full rounded shadow-sm mt-2"
                />
              </div>
            </div>
            <div className="mt-10 flex justify-center gap-5">
              <input
                type="submit"
                value={'Create'}
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
