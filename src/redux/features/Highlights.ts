/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type Highlights = {
  id: number;
  pdf: number;
  isInitialized: boolean;
  allHighlights: object[];
};

const initialState = {
  id: 1,
  pdf: 1,
  allHighlights: [],
  isInitialized: false,
} as Highlights;

export const highlights = createSlice({
  name: 'highlights',
  initialState,
  reducers: {
    addHighlight: (state, action) => {
      if (!state.isInitialized) {
        state.id = action.payload.id;
        state.pdf = action.payload.pdf;
        state.isInitialized = true;
      }
      state.allHighlights.push({
        id: action.payload.id,
        metadata: action.payload.currHighlight,
      });
      console.log(action.payload);
    },
    updateHighlight: (state, action): void => {
      if (state.allHighlights) {
        console.log(action.payload);
      }
    },
    deleteHighlight: (state, action): void => {
      if (state.allHighlights) {
        console.log(action.payload);
      }
    },
    test: (): void => {
      console.log('nothing');
    },
  },
});

export const { addHighlight, updateHighlight, deleteHighlight } =
  highlights.actions;

export default highlights.reducer;
