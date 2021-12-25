import React from "react";

import MaterialTable from "material-table";
import { Modal } from "@material-ui/core";
import isURL from "validator/lib/isURL";
import isEmpty from "validator/lib/isEmpty";
import { useAppDispatch, useAppSelector } from "../redux";
import {
  addQuizData,
  addQuizQuestion,
  addQuizQuestionAnswer,
  removeQuizData,
  removeQuizQuestion,
  removeQuizQuestionAnswer,
  setSelectedQuizData,
  setSelectedQuizQuestion,
  updateQuizData,
  updateQuizQuestion,
  updateQuizQuestionAnswer
} from "../redux/actions/QuizActions";

function Home() {
  const dispatch = useAppDispatch();
  const quizState = useAppSelector((state) => state.quiz);

  React.useEffect(() => {
    dispatch(
      addQuizData({
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
      })
    );
  }, []);
  const [openAnswers, setOpenAnswers] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const renderTblQuiz = React.useMemo(() => {
    return (
      <div className="">
        {" "}
        <Modal
          open={openAnswers}
          onClose={() => setOpenAnswers(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MaterialTable
            title={`${quizState.selectedQuiz.id}-${quizState.selectedQuiz.title}`}
            data={quizState.selectedQuestion.answers ?? []}
            options={{ actionsColumnIndex: -1, paging: false }}
            columns={[
              { title: "ID", field: "id", type: "numeric", editable: "always" },
              { title: "Title", field: "text", editable: "always" },
              { title: "True", field: "is_true", type: "boolean", editable: "always" }
            ]}
            editable={{
              onRowAdd: (newData: any) => {
                return new Promise<void>((res) => {
                  dispatch(
                    addQuizQuestionAnswer({
                      quizId: quizState.selectedQuiz.id,
                      questionId: quizState.selectedQuestion.id,
                      newData: newData
                    })
                  );
                  res();
                });
              },
              onRowUpdate: (newData: any, oldData: any) => {
                return new Promise<void>((res) => {
                  dispatch(
                    updateQuizQuestionAnswer({
                      quizId: quizState.selectedQuiz.id,
                      questionId: quizState.selectedQuestion.id,
                      answerId: oldData.id,
                      newData: newData
                    })
                  );
                  res();
                });
              },
              onRowDelete: (oldData: any) => {
                return new Promise<void>((res) => {
                  dispatch(
                    removeQuizQuestionAnswer({
                      quizId: quizState.selectedQuiz.id,
                      questionId: quizState.selectedQuestion.id,
                      answerId: oldData.id
                    })
                  );
                  res();
                });
              }
            }}
          />
        </Modal>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MaterialTable
            title={`${quizState.selectedQuiz.id}-${quizState.selectedQuiz.title}`}
            data={quizState.selectedQuiz.questions_answers ?? []}
            options={{ actionsColumnIndex: -1, addRowPosition: "first", paging: false }}
            columns={[
              { title: "ID", field: "id", type: "numeric", editable: "always" },
              { title: "Title", field: "text", editable: "always" },
              {
                title: "# of Answers",
                field: "",
                render: (data) => {
                  return <div>{data.answers.length} </div>;
                }
              },
              { title: "Correct Ans Feedback", field: "feedback_true", editable: "always" },
              { title: "Wrong Ans Feedback", field: "feedback_false", editable: "always" }
            ]}
            actions={[
              {
                icon: "add",
                tooltip: "Add Answer",
                onClick: (ev, rowData: any) => {
                  dispatch(
                    setSelectedQuizQuestion({
                      quizId: quizState.selectedQuiz.id,
                      questionId: rowData.id
                    })
                  );
                  setOpenAnswers(true);
                }
              }
            ]}
            editable={{
              onRowAdd: (newData: any) => {
                return new Promise<void>((res) => {
                  dispatch(
                    addQuizQuestion({ quizId: quizState.selectedQuiz.id, newData: newData })
                  );
                  res();
                });
              },
              onRowUpdate: (newData: any, oldData: any) => {
                return new Promise<void>((res) => {
                  dispatch(
                    updateQuizQuestion({
                      quizId: quizState.selectedQuiz.id,
                      questionId: oldData.id,
                      newData: newData
                    })
                  );
                  res();
                });
              },
              onRowDelete: (oldData: any) => {
                return new Promise<void>((res) => {
                  dispatch(
                    removeQuizQuestion({
                      quizId: quizState.selectedQuiz.id,
                      questionId: oldData.id
                    })
                  );
                  res();
                });
              }
            }}
          />
        </Modal>
        <MaterialTable
          title="Quiz List"
          options={{
            addRowPosition: "first",
            actionsColumnIndex: -1,
            paging: false
          }}
          columns={[
            { title: "ID", field: "id", editable: "always" },
            {
              title: "Title",
              field: "title",
              editable: "always",
              validate: (rowData) => !isEmpty(rowData.title ?? "")
            },
            {
              title: "Description",
              field: "description",
              type: "string",
              editable: "always"
            },
            {
              title: "URL",
              field: "url",
              type: "string",
              editable: "always",
              validate: (rowData) => isURL(rowData?.url ?? "")
            },
            {
              title: "# of Questions",
              type: "numeric",
              render: (rowData) => {
                return <div className="">{rowData.questions_answers?.length}</div>;
              }
            },
            { title: "Score", field: "score", type: "string", editable: "never" }
          ]}
          data={quizState.data}
          actions={[
            {
              icon: "start",
              tooltip: "Start Quiz",
              onClick: (ev, rowData: any) => {
                dispatch(setSelectedQuizData({ quizId: rowData.id }));
              }
            },
            {
              icon: "add",
              tooltip: "Add Questions",
              onClick: (ev, rowData: any) => {
                dispatch(setSelectedQuizData({ quizId: rowData.id }));
                setOpen(true);
              }
            }
          ]}
          editable={{
            onRowAdd: (newData) => {
              return new Promise<void>((res) => {
                dispatch(addQuizData(newData));
                res();
              });
            },
            onRowUpdate: (newData: any, oldData: any) => {
              return new Promise<void>((res) => {
                dispatch(updateQuizData({ quizId: oldData.id, newData: newData }));
                res();
              });
            },
            onRowDelete: (newData: any) => {
              return new Promise<void>((res) => {
                dispatch(removeQuizData({ quizId: newData.id }));
                res();
              });
            }
          }}
        />
      </div>
    );
  }, [
    quizState.data,
    quizState.selectedQuestion.answers,
    quizState.selectedQuiz.questions_answers,
    open,
    openAnswers
  ]);

  return <div className="App">{renderTblQuiz}</div>;
}

export default Home;
