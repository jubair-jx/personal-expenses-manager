import React from "react";
import edit from "../../assets/images/edit.svg";
import deletes from "../../assets/images/delete.svg";
import { useDispatch } from "react-redux";
import { editActive } from "../../features/transctionSlice";

const SingleTransaction = ({ transction }) => {
  const { name, amount, type, id } = transction || {};
  const dispatch = useDispatch();
  // console.log(data);
  const handleEditing = () => {
    dispatch(editActive(transction));
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button onClick={handleEditing} className="link">
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
