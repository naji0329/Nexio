import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Create() {
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getCards() {
      setLoading(true);
      const res = await dispatch(getCards());
      setCards(res);
      setLoading(false);
    }
    getCards();
  }, []);

  return (
    <div>
      <div className="n-container">
        <div className="flex justify-center mt-20">
          <Link to={'/'}>
            <img src="/img/logo-white.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline text-center">Get Cards</h1>
        {/* "cardUUID": "3fd79852-b53d-310b-ac24-dfe845b75ec7",
        "cardHolderName": "Ignacio Antonio",
        "encryptedNumber": null,
        "expirationMonth": "06",
        "expirationYear": "26",
        "cardType": "Amex",
        "securityCode": "615",
        "firstSix": null,
        "lastFour": null */}
        <div className="mt-20 m-auto">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>UUID</th>
                <th>Holder Name</th>
                <th>Encrypted Number</th>
                <th>Expiration Month</th>
                <th>Expiration Year</th>
                <th>Security Code</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && cards.length === 0 ? (
                <tr>
                  <td colSpan={7}>Nothing Cards</td>
                </tr>
              ) : null}

              {isLoading ? (
                <tr>
                  <td colSpan={7}>Loading...</td>
                </tr>
              ) : null}

              {!isLoading &&
                cards.map((row, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{row.cardUUID}</td>
                      <td>{row.cardHolderName}</td>
                      <td>{row.encryptedNumber}</td>
                      <td>{row.expirationMonth}</td>
                      <td>{row.expirationYear}</td>
                      <td>{row.cardType}</td>
                      <td>{row.securityCode}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Create;
