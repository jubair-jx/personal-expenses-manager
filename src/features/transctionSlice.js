import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransctions,
  deletedTransctions,
  editTransctions,
  getTransctions,
} from "./transctionAPI";

const initialState = {
  transctions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

//fetch data from api
export const fetchTransactions = createAsyncThunk(
  "tranaction/fetchTransactions",
  async () => {
    const transctions = await getTransctions();
    return transctions;
  }
);
//create a new transaction
export const createTransactions = createAsyncThunk(
  "tranaction/createTransactions",
  async (data) => {
    const transctions = await addTransctions(data);
    return transctions;
  }
);
//update transaction
export const updateTransactions = createAsyncThunk(
  "tranaction/updateTransactions",
  async ({ id, data }) => {
    const transctions = await editTransctions(id, data); //check if or not
    return transctions;
  }
);
// delete transaction
export const deleteTransactions = createAsyncThunk(
  "tranaction/deleteTransactions",
  async (id) => {
    const transctions = await deletedTransctions(id);
    return transctions;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (state, action) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder //get the transaction data slice
      .addCase(fetchTransactions.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transctions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
        state.transctions = [];
      }) // create a new transaction slice
      .addCase(createTransactions.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transctions.push(action.payload);
      })
      .addCase(createTransactions.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
        // state.transctions = [];
      })
      // update the transction slice
      .addCase(updateTransactions.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        const findToIndex = state.transctions.findIndex(
          (i) => i.id === action.payload.id
        );
        state.transctions[findToIndex] = action.payload;
      })
      .addCase(updateTransactions.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
        // state.transctions = [];
      })
      // delete my transaction slice
      .addCase(deleteTransactions.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(deleteTransactions.fulfilled, (state, action) => {
        console.log(action);
        state.isError = false;
        state.isLoading = false;
        const filterDeleted = state.transctions.filter(
          (tr) => tr.id !== action.meta.arg
        );
        state.transctions = filterDeleted;
      })
      .addCase(deleteTransactions.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message;
        state.isLoading = false;
        // state.transctions = [];
      });
  },
});
export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;
