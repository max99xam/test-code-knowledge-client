import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuestions } from "helpers/api-requests";
import { Question } from "interfaces/questions.interface";

import type { AppState } from "store/store";

export interface AnswersState {
  currentQuestion: number;
  userAnswers: boolean[];
  checkedAnswers: boolean[][];
  questions: Question[];
}

const initialState: AnswersState = {
  currentQuestion: 0,
  userAnswers: [],
  checkedAnswers: [],
  questions: [],
};

interface ISetCheckedState {
  questionNumber: number;
  answerNumber: number;
}

interface IChangeUserAnswers {
  questionNumber: number;
  isCorrect: boolean;
}

export const getQuestionsAsync = createAsyncThunk(
  "answers/getQuestions",
  async () => {
    const response = await getQuestions();
    // The value we return becomes the `fulfilled` action payload
    // console.log(response);

    if(response) {
      return response;
    }else {
      return [];
    }
    
  }
);

export const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    incrementCurrentQuestion: (state) => {
      state.currentQuestion += 1;
    },
    decrementCurrentQuestion: (state) => {
      state.currentQuestion -= 1;
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestion = action.payload;
    },
    changeCheckedState: (state, action: PayloadAction<ISetCheckedState>) => {
      state.checkedAnswers[action.payload.questionNumber][
        action.payload.answerNumber
      ] =
        !state.checkedAnswers[action.payload.questionNumber][
          action.payload.answerNumber
        ];
    },
    changeUserCorrectAnswers: (
      state,
      action: PayloadAction<IChangeUserAnswers>
    ) => {
      state.userAnswers[action.payload.questionNumber] =
        action.payload.isCorrect;
    },
    resetState: (state) => {
       // Before checking all user answers are true.
       state.userAnswers = new Array(state.questions.length).fill(true);
        
       // Fil checked answers array.
       const checkedAnswers = new Array(state.questions.length);
       for(let i = 0; i < checkedAnswers.length; ++i) {
           const answersAmount = state.questions[i].answersList.length;
           checkedAnswers[i] =  new Array(answersAmount).fill(false);
       }
       state.checkedAnswers = checkedAnswers;
       state.currentQuestion = 0;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // .addCase(getQuestionsAsync.pending, (state) => {
      //     state.status = 'loading'
      // })
      .addCase(getQuestionsAsync.fulfilled, (state, action) => {
        // state.status = 'idle'
        // state.value += action.payload
        const questions = action.payload;

        state.questions = questions;

        // Before checking all user answers are true.
        state.userAnswers = new Array(questions.length).fill(true);
        
        // Fil checked answers array.
        const checkedAnswers = new Array(questions.length);
        for(let i = 0; i < checkedAnswers.length; ++i) {
            const answersAmount = questions[i].answersList.length;
            checkedAnswers[i] =  new Array(answersAmount).fill(false);
        }
        state.checkedAnswers = checkedAnswers;

      });
  },
});

export const {
  decrementCurrentQuestion,
  incrementCurrentQuestion,
  setCurrentQuestion,
  changeCheckedState,
  changeUserCorrectAnswers,
  resetState,
} = answersSlice.actions;

export const selectCurrentQuestion = (state: AppState) =>
  state.answers.currentQuestion;

export const selectCheckedAnswers = (state: AppState) =>
  state.answers.checkedAnswers;
export const selectQuestions = (state: AppState) => state.answers.questions;
export const selectUserAnswersStatus = (state: AppState) =>
  state.answers.userAnswers;

export default answersSlice.reducer;
