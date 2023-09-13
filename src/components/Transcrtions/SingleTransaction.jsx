import React from "react";
import edit from "../../assets/images/edit.svg";
import deletes from "../../assets/images/delete.svg";

const SingleTransaction = () => {
  return (
    <li className="transaction income">
      <p>Earned this month</p>
      <div className="right">
        <p>৳ 100</p>
        <button className="link">
          <img className="icon" src={edit} />
        </button>
        <button className="link">
          <img className="icon" src={deletes} />
        </button>
      </div>
    </li>
  );
};

export default SingleTransaction;
