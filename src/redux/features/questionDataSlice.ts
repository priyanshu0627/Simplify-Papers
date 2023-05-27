import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type QuestionDataState = {
  id: number;
  upVotes: number;
  downVotes: number;
  liked: number;
  accepted: boolean;
  flag: number;
  views: number;
  question: string;
  askedBy: string;
  lastActivityTime: string;
  lastActivityPerson: string;
  tags: string[];
  highlight: any;
};

const initialState = [] as QuestionDataState[];

export const questionData = createSlice({
  name: 'questionData',
  initialState,
  reducers: {
    reset: () => initialState,
    addNewQuestion: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      return [...state, action.payload.newQuestionData];
    },
    deleteQuestion: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      console.log(state, action);
    },
    test: () => {},
  },
});

export const { addNewQuestion, reset, deleteQuestion, test } =
  questionData.actions;

export default questionData.reducer;
