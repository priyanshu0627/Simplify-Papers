import { configureStore } from '@reduxjs/toolkit';

import answerDataSlice from './features/answerDataSlice';
import counterReducer from './features/counterSlice';
import Highlights from './features/Highlights';
import questionDataSlice from './features/questionDataSlice';
import StatusHighlight from './features/StatusHighlight';

export const store = configureStore({
  reducer: {
    counterReducer,
    Highlights,
    questionDataSlice,
    answerDataSlice,
    StatusHighlight,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
