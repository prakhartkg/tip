import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to send a message and receive a bot response
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, fileId }, { rejectWithValue }) => {
    try {
      // Replace this with your actual chat API endpoint
      const response = await axios.post('/api/chat', {
        message,
        fileId,
      });

      return response.data.botReply;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Reducer to add a user message to the state
    addUserMessage: (state, action) => {
      state.messages.push({
        sender: 'user',
        text: action.payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // Add the bot's response to the messages array
        state.messages.push({
          sender: 'bot',
          text: action.payload,
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;

        // Optionally, you can add an error message to the chat
        state.messages.push({
          sender: 'bot',
          text: 'Error: Unable to get a response from the server.',
        });
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
