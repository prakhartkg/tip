import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import fileReducer from './fileSlice';

export default configureStore({
  reducer: {
    chat: chatReducer,
    files: fileReducer,
  },
});
