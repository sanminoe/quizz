import React, { ReactElement, useEffect, useState } from "react";
import Question from "../../Components/Question/Question";
import Accordion from "react-bootstrap/Accordion";

import {
  Badge,
  CloseButton,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { Choice, IFormInputs, QuestionType, QuizType } from "../../types/types";
import ResultAnswers from "../../Components/ResultAnswers/ResultAnswers";
import NumberDisplayer from "../../Components/NumberDisplayer/NumberDisplayer";
import { useList, useObjectVal } from "react-firebase-hooks/database";
import { equalTo, orderByChild, query, ref, get } from "@firebase/database";
import { database } from "../../firebase/clientApp";
import { useRouter } from "next/router";

function Quiz() {
  const router = useRouter();
  const { quizid } = router.query;
  const maxNumberOfChoises = 1;
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<IFormInputs>({
    keyId: uuid(),
    quizName: "quiz name",
    quizDescription: "description",
    question: [
      {
        keyId: uuid(),
        name: "Question",
        choices: [
          {
            keyId: uuid(),
            text: "1. Choice",
            isCorrect: false,
          },
          {
            keyId: uuid(),
            text: "2. Nice",
            isCorrect: false,
          },
        ],
        answerExplanation: "Answer explanation",
        maxChoices: 1,
      },
    ],
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<QuestionType>({
    keyId: uuid(),
    name: "Question",
    choices: [
      {
        keyId: uuid(),
        text: "1. Choice",
        isCorrect: false,
      },
      {
        keyId: uuid(),
        text: "2. Nice",
        isCorrect: false,
      },
    ],
    answerExplanation: "Answer explanation",
    maxChoices: 1,
  });

  const [isCompleted, setIsCompleted] = useState(false);
  const [hasAnswer, setHasAnswer] = useState<boolean>(false);
  const [numberCorrectAnswers, setNumberCorrectAnswers] = useState(0);
  const [numberWrongAnswers, setNumberWrongAnswers] = useState(0);

  const handlerChooseAnswer = (id: string) => {
    let questionCopy = { ...question };
    let questionOptions = [...questionCopy.choices];

    if (isCompleted) return;

    let qIndex = questionOptions.findIndex((q) => q.keyId === id);
    let q = questionOptions[qIndex];
    q.choosen = !q.choosen;

    let choises = questionOptions.filter((o) =>
      o.choosen === true ? o : null
    ).length;

    if (choises === 0) {
      setHasAnswer(false);
    } else {
      if (questionIndex !== data.question.length) {
        setHasAnswer(true);
      }
    }

    if (choises <= maxNumberOfChoises) {
      questionCopy.choices = questionOptions;
      console.log(q);
    } else {
      q.choosen = false;
    }

    setQuestion(questionCopy);
    console.log(choises, maxNumberOfChoises);
  };

  const handlerNextQuestion = () => {
    let i = questionIndex;
    if (i !== data.question.length) {
      i += 1;
      setQuestionIndex(i);
    }
  };

  useEffect(() => {
    setHasAnswer(false);
    if (data.question.length === questionIndex) {
      setIsCompleted(true);
    } else {
      setQuestion(data.question[questionIndex]);
    }
  }, [questionIndex, data]);

  useEffect(() => {
    let correctAnswers: Choice[] = [];
    let wrongAnswers: Choice[] = [];

    for (let i = 0; i < data.question.length; i++) {
      const q = data.question[i];
      q.choices.map((c: Choice) => {
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
  }, [isLoading, questionIndex]);

  useEffect(() => {
    if (!quizid) {
      return;
    }

    get(
      query(
        ref(database, `quiz`),
        orderByChild("keyId"),
        equalTo(quizid as string)
      )
    ).then((res) => {
      let k = Object.keys(res.val())[0];
      console.log(res.val(), k);
      let d: IFormInputs = res.val()[k];

      if (d && d.keyId) {
        d.question = d.question.map((q) => {
          let f = {
            ...q,
            choices: q.choices.map((e) => ({ ...e, choosen: false })),
          };

          return f;
        });
        console.log(d);
        setData(d);
        setQuestion(data.question[0]);
        setIsLoading(false);
      }
    });
  }, [quizid]);

  return (
    <React.Fragment>
      <div className="position-relative">
        {isLoading === false ? (
          isCompleted === false ? (
            <Question
              choices={question.choices}
              question={question.name}
              hasAnswer={hasAnswer}
              onChoose={handlerChooseAnswer}
              onClickNext={handlerNextQuestion}
            />
          ) : (
            <Container className="border mt-4">
              <Row className="mt-4">
                <Col>
                  <Stack>
                    <Badge>
                      <p className={`p-2 my-auto`}>
                        Nice job!{" "}
                        {(numberWrongAnswers + numberCorrectAnswers) /
                          data.question.length}
                      </p>
                    </Badge>
                  </Stack>
                  <Stack direction="horizontal" className="mt-2">
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
                      <NumberDisplayer value={data.question.length} />
                    </div>
                  </Stack>
                </Col>
              </Row>
              <Row className="my-4">
                <h3>Answers</h3>
                <Accordion defaultActiveKey="0">
                  {data?.question.map((t, i) => (
                    <ResultAnswers
                      choices={t.choices}
                      question={t.name}
                      eventKey={"" + i}
                      key={t.keyId}
                      explanation={t.answerExplanation}
                    />
                  ))}
                </Accordion>
              </Row>
            </Container>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </React.Fragment>
  );
}

export default Quiz;
