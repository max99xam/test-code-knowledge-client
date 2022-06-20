import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../store/store'
import { fetchQuestions } from './Test.api';


export interface IQuestion {
    question: string;
    exampleCode: string;
    answersList: string[];
    correctAnswers: string[];
}
export interface AnswersState {
    answersAmount: number,
    questionsAmount: number,
    currentQuestion: number,
    userAnswers: boolean[],
    checkedAnswers: boolean[][],
    questions: IQuestion[],
}


const questionsAmount = 3;
const answersAmount = 4;

const initialState: AnswersState = {
    questionsAmount,
    answersAmount,
    currentQuestion: 0,
    userAnswers: new Array(questionsAmount).fill(true),
    checkedAnswers: new Array(questionsAmount).fill(new Array(answersAmount).fill(false)),
    questions: [],
}

interface ISetCheckedState {
    questionNumber: number;
    answerNumber: number;
}

interface IChangeUserAnswers {
    questionNumber: number;
    isCorrect: boolean;
}

export const getQuestionsAsync = createAsyncThunk(
    'answers/fetchQuestions',
    async () => {
        const response = await fetchQuestions();
        // The value we return becomes the `fulfilled` action payload
        return response.questions;
    }
)


export const answersSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
        incrementCurrentQuestion: (state) => {
            state.currentQuestion += 1

        },
        decrementCurrentQuestion: (state) => {
            state.currentQuestion -= 1
        },
        setCurrentQuestion: (state, action: PayloadAction<number>) => {
            state.currentQuestion = action.payload
        },
        changeCheckedState: (state, action: PayloadAction<ISetCheckedState>) => {
            state.checkedAnswers[action.payload.questionNumber][action.payload.answerNumber] = !state.checkedAnswers[action.payload.questionNumber][action.payload.answerNumber]
        },
        changeUserCorrectAnswers: (state, action: PayloadAction<IChangeUserAnswers>) => {
            state.userAnswers[action.payload.questionNumber] = action.payload.isCorrect;
        },
        resetState: () => initialState,
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
                state.questions = action.payload;
            })
    },
})

export const { decrementCurrentQuestion, incrementCurrentQuestion, setCurrentQuestion, changeCheckedState, changeUserCorrectAnswers, resetState } = answersSlice.actions


export const selectCurrentQuestion = (state: AppState) => state.answers.currentQuestion;

export const selectCheckedAnswers = (state: AppState) => state.answers.checkedAnswers;
export const selectQuestions = (state: AppState) => state.answers.questions;
export const selectUserAnswersStatus = (state: AppState) => state.answers.userAnswers;

export default answersSlice.reducer