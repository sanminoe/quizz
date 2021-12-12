import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Question from "../../Components/Question/Question";
import Accordion from "react-bootstrap/Accordion";

import { CloseButton, Col, Container, Row, Stack } from "react-bootstrap";

import { Choise, QuestionType } from "../../types/types";
import ResultAnswers from "../../Components/ResultAnswers/ResultAnswers";
import NumberDisplayer from "../../Components/NumberDisplayer/NumberDisplayer";

const testData: QuestionType[] = [
  {
    id: "asd",
    question: "Is HTML a programming language?",
    choises: [
      {
        id: "asdas",
        text: "no",
        choosen: false,
        isCorrect: true,
      },
      {
        id: "a",
        text: "yes",
        choosen: false,
        isCorrect: false,
      },
      {
        id: "zaz",
        text: "idk",
        choosen: false,
        isCorrect: false,
      },
    ],
    answer: ["aasd", "a"], // array with the id of the answers,
    answerExplanation: "HTML is a Mark-Up language",
  },
  {
    id: "adfh",
    question: "Is CSS a programming language?",
    choises: [
      {
        id: "asdas",
        text: "no",
        choosen: false,
        isCorrect: true,
      },
      {
        id: "a",
        text: "yes",
        choosen: false,
        isCorrect: false,
      },
      {
        id: "zaz",
        text: "idk",
        choosen: false,
        isCorrect: false,
      },
      {
        id: "zasz",
        text: "yup",
        choosen: false,
        isCorrect: false,
      },
    ],
    answer: ["aasd", "a"], // array with the id of the answers
    answerExplanation: "CSS is not a programming language",
  },
];

function Quiz() {
  const maxNumberOfChoises = 1;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<QuestionType>(
    testData[questionIndex]
  );

  const [isCompleted, setIsCompleted] = useState(false);
  const [hasAnswer, setHasAnswer] = useState<boolean>(false);
  const [numberCorrectAnswers, setNumberCorrectAnswers] = useState(0);
  const [numberWrongAnswers, setNumberWrongAnswers] = useState(0);

  const handlerChooseAnswer = (id: string) => {
    let questionCopy = { ...question };
    let questionOptions = [...questionCopy.choises];

    if (isCompleted) return;

    let qIndex = questionOptions.findIndex((q) => q.id === id);
    let q = questionOptions[qIndex];
    q.choosen = !q.choosen;

    let choises = questionOptions.filter((o) =>
      o.choosen === true ? o : null
    ).length;

    if (choises === 0) {
      setHasAnswer(false);
    } else {
      if (questionIndex !== testData.length) {
        setHasAnswer(true);
      }
    }

    if (choises <= maxNumberOfChoises) {
      questionCopy.choises = questionOptions;
      console.log(q);
    } else {
      q.choosen = false;
    }

    setQuestion(questionCopy);
    console.log(choises, maxNumberOfChoises);
  };

  const handlerNextQuestion = () => {
    let i = questionIndex;
    if (i !== testData.length) {
      i += 1;
      setQuestionIndex(i);
    }
  };

  useEffect(() => {
    setHasAnswer(false);
    if (testData.length === questionIndex) {
      setIsCompleted(true);
    } else {
      setQuestion(testData[questionIndex]);
    }
  }, [questionIndex]);

  useEffect(() => {
    let correctAnswers: Choise[] = [];
    let wrongAnswers: Choise[] = [];

    for (let i = 0; i < testData.length; i++) {
      const q = testData[i];
      q.choises.map((c: Choise) => {
        if (c.isCorrect === true && c.choosen === true) {
          correctAnswers.push(c);
        } else if (c.isCorrect === false && c.choosen === true) {
          wrongAnswers.push(c);
        }
      });
    }
    console.log(correctAnswers);
    setNumberCorrectAnswers(correctAnswers.length);
    setNumberWrongAnswers(wrongAnswers.length);
  });

  let answers = testData.map((t, i) => (
    <ResultAnswers
      choises={t.choises}
      question={t.question}
      eventKey={"" + i}
      key={t.id}
      explanation={t.answerExplanation}
    />
  ));

  return (
    <React.Fragment>
      <div className="position-relative">
        {isCompleted === false ? (
          <Question
            choises={question.choises}
            question={question.question}
            hasAnswer={hasAnswer}
            onChoose={handlerChooseAnswer}
            onClickNext={handlerNextQuestion}
          />
        ) : (
          <Container className="border mt-4">
            <Row className="mt-4">
              <Col>
                <Stack direction="horizontal">
                  <div className="w-50 d-flex flex-column align-items-center">
                    <p>Errors</p>
                    <NumberDisplayer value={numberWrongAnswers} />
                  </div>
                  <div className="w-50 d-flex flex-column align-items-center">
                    <p>Correct</p>
                    <NumberDisplayer value={numberCorrectAnswers} />
                  </div>
                  <div className="w-50 d-flex flex-column align-items-center">
                    <p>Questions</p>
                    <NumberDisplayer value={testData.length} />
                  </div>
                </Stack>
              </Col>
            </Row>
            <Row className="my-4">
              <h3>Answers</h3>
              <Accordion defaultActiveKey="0">{answers}</Accordion>
            </Row>
          </Container>
        )}
      </div>
    </React.Fragment>
  );
}

export default Quiz;
