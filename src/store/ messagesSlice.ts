import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface MessagesState {
  messages: User[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  page_size: number;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
  hasMore: true,
  page: 1,
  page_size: 20,
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (page_size: number) => {
    const response = await axios.get(
      `https://gorest.co.in/public/v1/users?page=1&per_page=${page_size}`
    );

    // Return only the data array, ensuring it adheres to the limit
    return response.data.data as User[];
  }
);
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = [...action.payload.reverse(), ...state.messages];
        state.loading = false;

        // If fetched data is less than PAGE_SIZE, no more pages are available
        state.hasMore = action.payload.length === state.page_size;

        // Increment the page count only if there is more data
        if (state.hasMore) {
          state.page_size += 20;
        }
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
