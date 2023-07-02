/* eslint-disable no-console */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AnswerDataState {
  questionId: number;
  allAnswer: string[];
}

const initialState: AnswerDataState[] = [];

export const answerData = createSlice({
  name: 'answerData',
  initialState,
  reducers: {
    reset: () => initialState,
    addNewAnswer: (state, action) => {
      const { questionId, newAnswer } = action.payload;
      const updatedAnswers = state.map((answer) => {
        if (answer.questionId === questionId) {
          return {
            ...answer,
            allAnswer: [...answer.allAnswer, newAnswer],
          };
        }
        return answer;
      });
      const foundAnswer = updatedAnswers.find(
        (answer) => answer.questionId === questionId
      );
      if (foundAnswer) {
        return updatedAnswers;
      }
      const newAnswerState = { questionId, allAnswer: [newAnswer] };
      return [...state, newAnswerState];
    },
    deleteAnswer: (state, action: PayloadAction<number>) => {
      const questionIdToDelete = action.payload;
      const updatedAnswers = state.filter(
        (answer) => answer.questionId !== questionIdToDelete
      );
      return updatedAnswers;
    },
    updateAnswer: (state, action: PayloadAction<AnswerDataState>) => {
      const { questionId, allAnswer } = action.payload;
      const updatedAnswers = state.map((answer) => {
        if (answer.questionId === questionId) {
          return {
            ...answer,
            allAnswer,
          };
        }
        return answer;
      });
      return updatedAnswers;
    },
    test: () => {},
  },
});

// Export actions
export const { addNewAnswer, reset, deleteAnswer, updateAnswer } =
  answerData.actions;

export default answerData.reducer;
