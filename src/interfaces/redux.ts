import { QuizActionTypes } from "../constants/actionTypes";

export interface Answer {
  id: number;
  is_true: boolean;
  text: string;
}

export interface Question {
  answer_id: number | null;
  answers: Answer[];
  feedback_false: string;
  feedback_true: string;
  id: number;
  text: string;
}

export interface Quiz {
  created: string;
  description: string;
  id: number;
  modified: string;
  score: number | null;
  title: string;
  url: string;
  questions_answers: Question[];
}

export interface QuizState {
  data: Quiz[];
  selectedQuiz: Quiz;
  selectedQuestion: Question;
}
let s = [
  {
    created: "2020-09-09 09:26:39",
    description: "Description",
    id: 29,
    modified: "2020-09-09 09:26:39",
    questions_answers: [
      {
        answer_id: null,
        answers: [
          {
            id: 122,
            is_true: false,
            text: "question 1 answer 1 false"
          },
          {
            id: 123,
            is_true: false,
            text: "question 1 answer 2 false"
          },
          {
            id: 124,
            is_true: true,
            text: "question 1 answer 3 true"
          },
          {
            id: 125,
            is_true: false,
            text: "question 1 answer 4 false"
          }
        ],
        feedback_false: "question 1 false feedback",
        feedback_true: "question 1 true feedback",
        id: 53,
        text: "question 1 text"
      },
      {
        answer_id: null,
        answers: [
          {
            id: 126,
            is_true: true,
            text: "question 2 answer 1 true"
          },
          {
            id: 127,
            is_true: false,
            text: "question 2 answer 2 false"
          }
        ],
        feedback_false: "question 2 false feedback",
        feedback_true: "question 2 true feedback",
        id: 54,
        text: "question 2 text"
      },
      {
        answer_id: null,
        answers: [
          {
            id: 128,
            is_true: false,
            text: "question 3 answer 1 false"
          },
          {
            id: 129,
            is_true: true,
            text: "question 3 answer 2 true"
          },
          {
            id: 130,
            is_true: false,
            text: "question 3 answer 3 false"
          }
        ],
        feedback_false: "question 3 false feedback",
        feedback_true: "question 3 true feedback",
        id: 55,
        text: "question 3 text"
      }
    ],
    score: null,
    title: "quiz title",
    url: "https://www.youtube.com/watch?v=e6EGQFJLl04"
  }
];

// actions
export type Action<T, P> = {
  type: T;
  payload: P;
};

export type RootQuizAction =
  | Action<QuizActionTypes.ADD_QUIZ_DATA, Quiz>
  | Action<QuizActionTypes.UPDATE_QUIZ_DATA, { quizId: number; newData: Quiz }>
  | Action<QuizActionTypes.REMOVE_QUIZ_DATA, { quizId: number }>
  | Action<QuizActionTypes.SET_SELECTED_QUIZ, { quizId: number }>
  | Action<QuizActionTypes.ADD_QUIZ_QUESTION, { quizId: number; newData: Question }>
  | Action<
      QuizActionTypes.UPDATE_QUIZ_QUESTION,
      { quizId: number; questionId: number; newData: Question }
    >
  | Action<QuizActionTypes.REMOVE_QUIZ_QUESTION, { quizId: number; questionId: number }>
  | Action<QuizActionTypes.SET_SELECTED_QUIZ_QUESTION, { quizId: number; questionId: number }>
  | Action<
      QuizActionTypes.ADD_QUIZ_QUESTION_ANSWER,
      { quizId: number; questionId: number; answerId: number; newData: Answer }
    >
  | Action<
      QuizActionTypes.UPDATE_QUIZ_QUESTION_ANSWER,
      { quizId: number; questionId: number; answerId: number; newData: Answer }
    >
  | Action<
      QuizActionTypes.REMOVE_QUIZ_QUESTION_ANSWER,
      { quizId: number; questionId: number; answerId: number }
    >;
