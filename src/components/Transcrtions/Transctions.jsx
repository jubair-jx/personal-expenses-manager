import React, { useEffect } from "react";
import SingleTransaction from "./SingleTransaction";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transctionSlice";
const Transctions = () => {
  const { transctions, isLoading, isError, error } = useSelector(
    (state) => state.transctionReducer
  );
  const distpatch = useDispatch();
  useEffect(() => {
    distpatch(fetchTransactions());
  }, [distpatch]);

  let data;
  if (isLoading) data = <p>Loading ........</p>;
  if (!isLoading && isError) data = <p>{error}</p>;
  if (!isLoading && !isError && transctions?.length === 0)
    data = <p>Not Data Found Here</p>;
  if (!isLoading && !isError && transctions?.length > 0)
    data = transctions?.map((transction) => (
      <SingleTransaction key={transction.id} transction={transction} />
    ));

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{data}</ul>
      </div>
    </>
  );
};

export default Transctions;
