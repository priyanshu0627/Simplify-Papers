import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type CounterState = {
  value: number;
};

const initialState = {
  value: 0,
} as CounterState;

export const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.value += 1;
    },
    decrement: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.value -= action.payload;
    },
  },
});

export const {
  increment,
  incrementByAmount,
  decrement,
  decrementByAmount,
  reset,
} = counter.actions;
export default counter.reducer;
