import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransactions,
  updateTransactions,
} from "../features/transctionSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const distpatch = useDispatch();

  const { isLoading, isError } = useSelector(
    (state) => state.transctionReducer
  );
  const editing = useSelector((state) => state.transctionReducer.editing);
  // console.log(editing);
  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };
  const createHandleForm = (e) => {
    e.preventDefault();
    const data = { name, type, amount: Number(amount) };
    distpatch(createTransactions(data));
    setName("");
    setType("");
    setAmount("");
  };
  const handleCancel = () => {
    reset();
    setEditMode(false);
  };
  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      setName("");
      setType("");
      setAmount("");
    }
  }, [editing]);
  const updateTransactionHandle = (e) => {
    e.preventDefault();
    distpatch(
      updateTransactions({
        id: editing?.id,
        data: {
          name: name,
          amount: Number(amount),
          type: type,
        },
      })
    );
    setName("");
    setType("");
    setAmount("");
    setEditMode(false);
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? updateTransactionHandle : createHandleForm}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            value={name}
            type="text"
            name="name"
            placeholder="Enter my Salary"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="transaction_type"
              checked={type === "income"}
              onChange={(e) => setType("income")}
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="transaction_type"
              placeholder="Expense"
              checked={type === "expense"}
              onChange={(e) => setType("expense")}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="Enter your amount"
            value={amount}
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} type="submit" className="btn">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
        {!isLoading && isError && (
          <p className="error">Not Data Post on server Here</p>
        )}
      </form>
      {editMode && (
        <button onClick={handleCancel} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}{" "}
    </div>
  );
};

export default Form;
