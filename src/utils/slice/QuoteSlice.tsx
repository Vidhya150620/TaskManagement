import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface QuoteState {
  quote: string;
  author: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: QuoteState = {
  quote: "",
  author: "",
  status: "idle",
};

//  const fetchQuote = createAsyncThunk(
//   "quote/fetchQuote",
//   async () => {
//     // 7pUQVGlv+noCKIp/sCa7sA==JTrwZhWZm7Eytss4

//     const response = await axios.get("https://api.api-ninjas.com/v1/quotes");
//     return response.data;
//   }
// );
 const fetchQuote = createAsyncThunk(
  "quote/fetchQuote",
  async () => {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        'X-Api-Key': '7pUQVGlv+noCKIp/sCa7sA==JTrwZhWZm7Eytss4'
      }
    });
    // api-ninjas returns an array of quotes
    return response.data[0]; 
  }
);

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quote = action.payload.quote;
        state.author = action.payload.author;
      })
      .addCase(fetchQuote.rejected, (state) => {
        state.status = "failed";
        state.quote = "Could not load quote.";
        state.author = "";
      });
  },
});

export const quoteReducer = quoteSlice.reducer;
export { fetchQuote };
