import React from "react";
import { useSelector } from "react-redux";
import numberWithCommas from "../utils/ThousansSep";

const Balance = () => {
  const { transctions } = useSelector((state) => state.transctionReducer);
  const calculateIncome = (transctions) => {
    let income = 0;
    transctions.forEach((transction) => {
      const { type, amount } = transction;
      // console.log(transction);
      if (type === "income") {
        income += amount;
      } else {
        income -= amount;
      }
    });
    return income;
  };
  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>{" "}
        {transctions?.length > 0 ? (
          <span>{numberWithCommas(calculateIncome(transctions))}</span>
        ) : (
          <span>{"0"}</span>
        )}{" "}
      </h3>
    </div>
  );
};

export default Balance;
