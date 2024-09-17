import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a set of dummy files
const dummyFiles = Array.from({ length: 5 }, (_, index) => ({
  id: `dummy-${index}`,
  name: `Dummy File ${index + 1}.txt`,
}));

export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
  try {
    const response = await axios.get('/api/getFiles');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch files');
  }
});

export const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: dummyFiles, // Default to dummy files
    selectedFile: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    selectFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.status = 'failed';
        //state.error = action.error.message;
        state.files = dummyFiles; // Set to dummy files on error
      });
  },
});

export const { selectFile, deleteFile } = fileSlice.actions;

export default fileSlice.reducer;
