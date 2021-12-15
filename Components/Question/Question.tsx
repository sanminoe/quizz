import React, { MouseEventHandler } from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import { Choice } from "../../types/types";
interface Props {
  choices: Choice[];
  question: string;
  hasAnswer: boolean;
  onChoose: Function;
  onClickNext: MouseEventHandler;
}

function Question(props: Props) {
  let choisesElement = props.choices.map((c, i) => (
    <div className="w-75" key={c.keyId}>
      <Button
        variant={`${c.choosen ? "primary" : "outline-primary"}`}
        className="w-100 m-2 d-flex align-items-center "
        onClick={() => props.onChoose(c.keyId)}
      >
        {i + 1}. {c.text}
      </Button>
    </div>
  ));
  return (
    <Container className="border mt-4">
      <Row className="mt-4">
        <Col>
          <div>
            <h2>{props.question}</h2>
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <Stack className="align-items-center">{choisesElement}</Stack>
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <Stack className="flex-row-reverse">
            <Button
              className="w-25"
              disabled={!props.hasAnswer}
              onClick={props.onClickNext}
            >
              Next
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default Question;
