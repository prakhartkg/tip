import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
  try {
    const response = await axios.get('http://localhost:5000/list_pdfs');
    const files = response.data.map(item => ({
      id: item,
      name:item
  }));
    return files;
  } catch (error) {
    throw new Error('Failed to fetch files');
  }
});

export const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [], // Default to dummy files
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
        state.files = []; // Set to dummy files on error
      });
  },
});

export const { selectFile, deleteFile } = fileSlice.actions;

export default fileSlice.reducer;
