/* eslint-disable no-param-reassign */
// import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type StatusHighlight = {
  rangeSelected: boolean;
  rangeId: number | null;
};

const initialState = {
  rangeSelected: false,
  rangeId: null,
} as StatusHighlight;

export const statusHighlight = createSlice({
  name: 'statusHighlight',
  initialState,
  reducers: {
    reset: () => initialState,
    updateHighlightStatus: (state, action) => {
      state.rangeSelected = true;
      state.rangeId = action.payload.rangeId;
    },
  },
});

export const { reset, updateHighlightStatus } = statusHighlight.actions;
export default statusHighlight.reducer;
