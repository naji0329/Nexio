import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCards } from '../../actions/card';

function Create() {
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getCardsData();
  }, []);

  async function getCardsData() {
    setLoading(true);
    const res = await dispatch(getCards());
    setCards(res);
    setLoading(false);
  }

  async function deleteCardData(_UUID) {
    try {
      console.log('delete card', _UUID);
      await dispatch(deleteCardData(_UUID));
      await getCardsData();
    } catch (error) {
      alert('Something Wrong.');
    }
  }

  return (
    <div>
      <div className="n-container">
        <div className="flex justify-center mt-20">
          <Link to={'/'}>
            <img src="/img/logo-white.png" className="cursor-pointer" alt="" />
          </Link>
        </div>
        <h1 className="text-4xl font-bold underline text-center">Get Cards</h1>

        <div className="mt-20 m-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>UUID</th>
                <th>Holder Name</th>
                <th>Expiration Month</th>
                <th>Expiration Year</th>
                <th>Security Code</th>
                <th>Card Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && cards.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    Nothing Cards
                  </td>
                </tr>
              ) : null}

              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : null}

              {!isLoading &&
                cards.map((row, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{row.cardUUID}</td>
                      <td>{row.cardHolderName}</td>
                      <td>{row.expirationMonth}</td>
                      <td>{row.expirationYear}</td>
                      <td>{row.cardType}</td>
                      <td>{row.securityCode}</td>
                      <td>
                        <p
                          className="text-red-700 cursor-pointer"
                          onClick={() => deleteCardData(row.cardUUID)}>
                          Delete
                        </p>
                      </td>
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
