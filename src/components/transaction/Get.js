import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTransactions, voidTransaction, refundTransaction } from '../../actions/transaction';

function Create() {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getTransactionsData();
  }, []);

  async function getTransactionsData() {
    setLoading(true);
    const res = await dispatch(getTransactions());
    setTransactions(res);
    setLoading(false);
  }

  async function voidTransactionData(transactionId) {
    try {
      console.log(transactionId);
      await dispatch(voidTransaction(transactionId));
      // await getTransactionsData();
    } catch (error) {
      alert('Something Wrong.');
    }
  }
  async function refundTransactionData(transactionId) {
    try {
      console.log(transactionId);
      await dispatch(refundTransaction(transactionId));
      // await getTransactionsData();
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
        <h1 className="text-4xl font-bold underline text-center">Transactions</h1>
        <div className="flex justify-end mt-10">
          <Link to={'/transaction/create'}>
            <div className="px-4 py-2 border border-[#5C6BC0] text-[#5C6BC0] cursor-pointer font-medium text-center rounded w-64 shadow-lg">
              Create Transaction
            </div>
          </Link>
        </div>

        <div className="mt-5 m-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Card UUID</th>
                <th>Transaction Id</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    Nothing Transactions
                  </td>
                </tr>
              ) : null}

              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : null}

              {!isLoading &&
                transactions.map((row, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{row.cardTransactionCompositeKey.cardUUID}</td>
                      <td>{row.cardTransactionCompositeKey.transactionId}</td>
                      <td>{row.amount}</td>
                      <td>{row.currency}</td>
                      <td>{row.localTransactionDateTime}</td>
                      <td>
                        <p
                          className="text-green-700 cursor-pointer"
                          onClick={() => {
                            voidTransactionData(row.cardTransactionCompositeKey.transactionId);
                          }}>
                          Void
                        </p>
                        <p
                          className="text-red-700 cursor-pointer"
                          onClick={() => {
                            refundTransactionData(row.cardTransactionCompositeKey.transactionId);
                          }}>
                          Refund
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
