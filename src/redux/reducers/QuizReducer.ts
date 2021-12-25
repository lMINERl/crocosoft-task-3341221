import { RootQuizAction, QuizState, Question, Quiz, Answer } from "../../interfaces";
import { QuizActionTypes } from "../../constants/actionTypes";

// reducer
const quizState: QuizState = {
  data: [] as Quiz[],
  selectedQuestion: {} as Question,
  selectedQuiz: {} as Quiz
};

const addQuiz = (state: QuizState, quiz: Quiz): QuizState => {
  return {
    ...state,
    data: [...state.data, quiz]
  };
};
const updateQuiz = (state: QuizState, data: { quizId: number; newData: Quiz }): QuizState => {
  const oldQuiz = state.data.find((v) => v.id == data.quizId);
  if (!oldQuiz) {
    return state;
  }

  return {
    ...state,
    data: [...state.data.filter((v) => v.id != data.quizId), { ...oldQuiz, ...data.newData }]
  };
};

const removeQuiz = (state: QuizState, data: { quizId: number }): QuizState => {
  return {
    ...state,
    data: [...state.data.filter((v) => v.id != data.quizId)]
  };
};
const setSelectedQuiz = (state: QuizState, data: { quizId: number }): QuizState => {
  const oldQuiz = state.data.find((v) => v.id == data.quizId);
  if (!oldQuiz) {
    return { ...state, selectedQuiz: {} as Quiz };
  }

  return {
    ...state,
    selectedQuiz: oldQuiz
  };
};

const addQuizQuestion = (
  state: QuizState,
  data: { quizId: number; newData: Question }
): QuizState => {
  const oldQuiz = state.data.find((v) => v.id == data.quizId);

  if (!oldQuiz) {
    return state;
  }
  return {
    ...state,
    data: [
      ...state.data.filter((v) => v.id != data.quizId),
      { ...oldQuiz, questions_answers: [...oldQuiz.questions_answers, data.newData] }
    ],
    selectedQuiz: {
      ...state.selectedQuiz,
      questions_answers: [...oldQuiz.questions_answers, data.newData]
    }
  };
};

const updateQuizQuestion = (
  state: QuizState,
  data: { quizId: number; questionId: number; newData: Question }
): QuizState => {
  const oldQuiz = state.data.find((v) => v.id == data.quizId);
  const oldQuestion = oldQuiz?.questions_answers?.find((v) => v.id == data.questionId);

  if (!oldQuestion || !oldQuiz) {
    return state;
  }
  const questions_answers = [
    ...oldQuiz.questions_answers.filter((v) => v.id != data.questionId),
    data.newData
  ];
  return {
    ...state,
    data: [
      ...state.data.filter((v) => v.id != data.quizId),
      {
        ...oldQuiz,
        questions_answers: questions_answers
      }
    ],
    selectedQuiz: { ...oldQuiz, questions_answers }
  };
};

const removeQuizQuestion = (
  state: QuizState,
  data: { quizId: number; questionId: number }
): QuizState => {
  const oldQuiz = state.data.find((v) => v.id == data.quizId);
  const oldQuestion = oldQuiz?.questions_answers?.find((v) => v.id == data.questionId);

  if (!oldQuestion || !oldQuiz) {
    return state;
  }

  const questions_answers = [...oldQuiz.questions_answers.filter((v) => v.id != data.questionId)];

  return {
    ...state,
    data: [
      ...state.data.filter((v) => v.id != data.quizId),
      {
        ...oldQuiz,
        questions_answers
      }
    ],
    selectedQuiz: {
      ...oldQuiz,
      questions_answers
    }
  };
};

const selectedQuizQuestion = (
  state: QuizState,
  data: { quizId: number; questionId: number }
): QuizState => {
  const oldQuiz = state.data.find((v) => v.id == data.quizId);
  const oldQuestion = oldQuiz?.questions_answers?.find((v) => v.id == data.questionId);

  if (!oldQuestion || !oldQuiz) {
    return state;
  }

  return {
    ...state,
    selectedQuestion: oldQuestion
  };
};

const addQuizQuestionAnswer = (
  state: QuizState,
  data: { quizId: number; questionId: number; newData: Answer }
): QuizState => {
  const oldQuiz = state.data.find((v) => v.id == data.quizId);
  const oldQuestion = oldQuiz?.questions_answers?.find((v) => v.id == data.questionId);

  if (!oldQuestion || !oldQuiz) {
    return state;
  }

  return {
    ...state,
    data: [
      ...state.data.filter((v) => v.id != data.quizId),
      {
        ...oldQuiz,
        questions_answers: [
          ...oldQuiz.questions_answers.filter((v) => v.id != data.questionId),
          { ...oldQuestion, answers: [...oldQuestion.answers, data.newData] }
        ]
      }
    ],
    selectedQuiz: {
      ...oldQuiz,
      questions_answers: [
        ...oldQuiz.questions_answers.filter((v) => v.id != data.questionId),
        { ...oldQuestion, answers: [...oldQuestion.answers, data.newData] }
      ]
    },
    selectedQuestion: { ...oldQuestion, answers: [...oldQuestion.answers, data.newData] }
  };
};

const updateQuizQuestionAnswer = (
  state: QuizState,
  data: { quizId: number; questionId: number; answerId: number; newData: Answer }
): QuizState => {
  const oldQuiz = state.data.find((v) => v.id == data.quizId);
  const oldQuestion = oldQuiz?.questions_answers?.find((v) => v.id == data.questionId);
  const oldAnswer = oldQuestion?.answers?.find((v) => v.id == data.answerId);
  if (!oldQuestion || !oldQuiz || !oldAnswer) {
    return state;
  }

  return {
    ...state,
    data: [
      ...state.data.filter((v) => v.id != data.quizId),
      {
        ...oldQuiz,
        questions_answers: [
          ...oldQuiz.questions_answers.filter((v) => v.id != data.questionId),
          {
            ...oldQuestion,
            answers: [...oldQuestion.answers.filter((v) => v.id != data.answerId), data.newData]
          }
        ]
      }
    ],
    selectedQuiz: {
      ...oldQuiz,
      questions_answers: [
        ...oldQuiz.questions_answers.filter((v) => v.id != data.questionId),
        {
          ...oldQuestion,
          answers: [...oldQuestion.answers.filter((v) => v.id != data.answerId), data.newData]
        }
      ]
    },
    selectedQuestion: {
      ...oldQuestion,
      answers: [...oldQuestion.answers.filter((v) => v.id != data.answerId), data.newData]
    }
  };
};

const removeQuizQuestionAnswer = (
  state: QuizState,
  data: { quizId: number; questionId: number; answerId: number }
): QuizState => {
  const oldQuiz = state.data.find((v) => v.id == data.quizId);
  const oldQuestion = oldQuiz?.questions_answers?.find((v) => v.id == data.questionId);
  const oldAnswer = oldQuestion?.answers?.find((v) => v.id == data.answerId);
  if (!oldQuestion || !oldQuiz || !oldAnswer) {
    return state;
  }

  return {
    ...state,
    data: [
      ...state.data.filter((v) => v.id != data.quizId),
      {
        ...oldQuiz,
        questions_answers: [
          ...oldQuiz.questions_answers.filter((v) => v.id != data.questionId),
          {
            ...oldQuestion,
            answers: [...oldQuestion.answers.filter((v) => v.id != data.answerId)]
          }
        ]
      }
    ],
    selectedQuiz: {
      ...oldQuiz,
      questions_answers: [
        ...oldQuiz.questions_answers.filter((v) => v.id != data.questionId),
        {
          ...oldQuestion,
          answers: [...oldQuestion.answers.filter((v) => v.id != data.answerId)]
        }
      ]
    },
    selectedQuestion: {
      ...oldQuestion,
      answers: [...oldQuestion.answers.filter((v) => v.id != data.answerId)]
    }
  };
};

const QuizReducer = (
  state: QuizState = quizState,
  { type, payload }: RootQuizAction
): QuizState => {
  switch (type) {
    case QuizActionTypes.ADD_QUIZ_DATA: {
      return addQuiz(state, payload as any);
    }
    case QuizActionTypes.UPDATE_QUIZ_DATA: {
      return updateQuiz(state, payload as any);
    }
    case QuizActionTypes.REMOVE_QUIZ_DATA: {
      return removeQuiz(state, payload as any);
    }
    case QuizActionTypes.SET_SELECTED_QUIZ: {
      return setSelectedQuiz(state, payload as any);
    }
    case QuizActionTypes.ADD_QUIZ_QUESTION: {
      return addQuizQuestion(state, payload as any);
    }
    case QuizActionTypes.UPDATE_QUIZ_QUESTION: {
      return updateQuizQuestion(state, payload as any);
    }
    case QuizActionTypes.REMOVE_QUIZ_QUESTION: {
      return removeQuizQuestion(state, payload as any);
    }
    case QuizActionTypes.SET_SELECTED_QUIZ_QUESTION: {
      return selectedQuizQuestion(state, payload as any);
    }
    case QuizActionTypes.ADD_QUIZ_QUESTION_ANSWER: {
      return addQuizQuestionAnswer(state, payload as any);
    }
    case QuizActionTypes.UPDATE_QUIZ_QUESTION_ANSWER: {
      return updateQuizQuestionAnswer(state, payload as any);
    }
    case QuizActionTypes.REMOVE_QUIZ_QUESTION_ANSWER: {
      return removeQuizQuestionAnswer(state, payload as any);
    }
    default:
      return state;
  }
};

export default QuizReducer;
