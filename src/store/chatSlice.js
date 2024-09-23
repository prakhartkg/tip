import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to send a message and receive a bot response
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, fileId }, { rejectWithValue }) => {
    try {
      if(!fileId) return rejectWithValue({error:  "Please select the file first from the sidebar for the context of your Questions.."})
      // Replace this with your actual chat API endpoint
      const response = await axios.post('http://localhost:5000/chat', {question:message,filename:fileId},{
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers if needed
        },
      });
      return response.data;
    } catch (error) {
      if(!error.response) return rejectWithValue({error: "due to some unknown reason."});
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer to add a user message to the state
    addUserMessage: (state, action) => {
      state.messages.push({
        sender: 'user',
        text: action.payload,
        refSection:[]
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        // Add the bot's response to the messages array
        state.messages.push({
          sender: 'bot',
          text: action.payload.answer,
          refSection : action.payload.relevant_sections,
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;

        // Optionally, you can add an error message to the chat
        state.messages.push({
          sender: 'bot',
          text: 'Sorry I am not able to answer this,'+action.payload.error,
          error:true
        });
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export const selectLoading = (state) => state.data.loading;
export default chatSlice.reducer;
