import { QuizActionTypes } from "../../constants/actionTypes";
import { Answer, Question, Quiz } from "../../interfaces";

export const addQuizData = (quiz: Quiz) => {
  return {
    type: QuizActionTypes.ADD_QUIZ_DATA,
    payload: quiz
  };
};

export const updateQuizData = (data: { quizId: number; newData: Quiz }) => {
  return {
    type: QuizActionTypes.UPDATE_QUIZ_DATA,
    payload: data
  };
};

export const removeQuizData = (data: { quizId: number }) => {
  return {
    type: QuizActionTypes.REMOVE_QUIZ_DATA,
    payload: data
  };
};

export const setSelectedQuizData = (data: { quizId: number }) => {
  return {
    type: QuizActionTypes.SET_SELECTED_QUIZ,
    payload: data
  };
};

export const addQuizQuestion = (data: { quizId: number; newData: Question }) => {
  return {
    type: QuizActionTypes.ADD_QUIZ_QUESTION,
    payload: data
  };
};

export const updateQuizQuestion = (data: {
  quizId: number;
  questionId: number;
  newData: Question;
}) => {
  return {
    type: QuizActionTypes.UPDATE_QUIZ_QUESTION,
    payload: data
  };
};
export const removeQuizQuestion = (data: { quizId: number; questionId: number }) => {
  return {
    type: QuizActionTypes.REMOVE_QUIZ_QUESTION,
    payload: data
  };
};

export const setSelectedQuizQuestion = (data: { quizId: number; questionId: number }) => {
  return {
    type: QuizActionTypes.SET_SELECTED_QUIZ_QUESTION,
    payload: data
  };
};

export const addQuizQuestionAnswer = (data: {
  quizId: number;
  questionId: number;
  newData: Answer;
}) => {
  return {
    type: QuizActionTypes.ADD_QUIZ_QUESTION_ANSWER,
    payload: data
  };
};

export const updateQuizQuestionAnswer = (data: {
  quizId: number;
  questionId: number;
  answerId: number;
  newData: Answer;
}) => {
  return {
    type: QuizActionTypes.UPDATE_QUIZ_QUESTION_ANSWER,
    payload: data
  };
};

export const removeQuizQuestionAnswer = (data: {
  quizId: number;
  questionId: number;
  answerId: number;
}) => {
  return {
    type: QuizActionTypes.REMOVE_QUIZ_QUESTION_ANSWER,
    payload: data
  };
};
