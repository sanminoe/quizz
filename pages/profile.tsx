import React, { useEffect, useState } from "react";
import { Col, Container, Row, Stack, Button, Collapse } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Choice, QuestionType } from "../types/types";
import { useList } from "react-firebase-hooks/database";
import { ref, push, set } from "firebase/database";
import { v4 as uuid } from "uuid";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";

import CreateChoice from "../Components/creatorChoice/CreateChoice";

import { database } from "../firebase/clientApp";

import { IFormInputs } from "../types/types";

function Profile() {
  const [myQuiz, setMyQuiz] = useState([]);

  const { register, handleSubmit, reset, watch, control, formState } =
    useForm<IFormInputs>({
      defaultValues: {
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
      },
    });

  const { fields, append, remove } = useFieldArray({
    name: "question",
    control,
  });

  let handlerAddQuestion = () => {
    let question = {
      name: "",
      maxChoices: 1,
      answerExplanation: "",
      choices: [],
      keyId: uuid(),
    };

    append(question);
  };

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    console.log(process.env.NEXT_PUBLIC_FIREBASE_DB_URL);
    const quizListRef = ref(database, "quiz");
    const newQuizRef = push(quizListRef);
    const res = await set(newQuizRef, { ...data });
    console.log(res);
  };

  const ques = fields.map((field, index) => (
    <React.Fragment>
      <div className="mt-3" key={field.id}>
        <Stack direction="horizontal">
          <div>
            <h2>{field.name}</h2>
          </div>
          <div className="ms-auto me-2">
            <Button className="bg-danger" onClick={() => remove(index)}>
              Delete
            </Button>
          </div>
        </Stack>
        <Collapse in={true} className="mt-3">
          <Stack>
            <Stack direction="horizontal">
              <Form.Group className="w-100 me-5">
                <Form.Label>Question #1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Question #1"
                  {...register(`question.${index}.name`)}
                />
              </Form.Group>
              <Form.Group className="ms-auto">
                <Form.Label>N° of answer</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1"
                  min="1"
                  {...register(`question.${index}.maxChoices`)}
                />
              </Form.Group>
            </Stack>

            <p className="mt-2">Choices</p>
            <CreateChoice
              questionIndex={index}
              control={control}
              register={register}
              Controller={Controller}
            />
            <Form.Group className="mt-3">
              <Form.Label>Answer explanation</Form.Label>
              <Form.Control
                type="text"
                {...register(`question.${index}.answerExplanation`)}
              />
            </Form.Group>
          </Stack>
        </Collapse>
      </div>
      <div
        className="w-100 mt-2"
        style={{ backgroundColor: "black", height: "1px" }}
      />
    </React.Fragment>
  ));

  return (
    <Container>
      <Row>
        <Col>
          <Stack className="w-full" gap={4} direction="horizontal">
            <div>
              <span>My Profile</span>
            </div>
            <Button className="ms-auto">New Quiz+</Button>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="quiz.name" className="mb-3">
                <Form.Label>Quiz Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the quiz name"
                  {...register("quizName", { required: true })}
                />
              </Form.Group>
              <Form.Group controlId="quiz.description">
                <Form.Label>Quiz Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("quizDescription", { required: true })}
                />
              </Form.Group>
              <Stack className="mt-2">
                <Button onClick={handlerAddQuestion}>Add Question</Button>
              </Stack>
              <Container>{ques}</Container>
              <Button className="w-100 my-3" type="submit">
                Save
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
