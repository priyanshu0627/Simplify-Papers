/* eslint-disable no-console */
// import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type QuestionDataState = {
  id: number;
  rangeId: number;
  upVotes: number;
  downVotes: number;
  liked: number;
  accepted: boolean;
  flag: number;
  views: number;
  question: string;
  comment: string;
  answer: string;
  channel: string;
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
    updateQuestion: (state, action) => {
      const rangeID = action.payload.rangeStatus.rangeId;
      const updatedQuestion = state.map((question) => {
        if (question.highlight.rangeId === rangeID) {
          return {
            ...question,
            question: action.payload.questionTitle,
            comment: action.payload.questionComment,
            channel: action.payload.channelName,
            // labels: action.payload.questionLabels,
            askedBy: 'USER',
          };
        }
        return question;
      });
      return updatedQuestion;
    },
    test: () => {},
  },
});

export const { addNewQuestion, reset, deleteQuestion, test, updateQuestion } =
  questionData.actions;

export default questionData.reducer;
