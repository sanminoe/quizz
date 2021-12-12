import React, { MouseEventHandler } from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";

interface Props {
  choises: Choise[];
  question: string;
  hasAnswer: boolean;
  onChoose: Function;
  onClickNext: MouseEventHandler;
}
interface Choise {
  id: string;
  text: string;
  choosen: boolean;
}

function Question(props: Props) {
  let choisesElement = props.choises.map((c, i) => (
    <div className="w-75" key={c.id}>
      <Button
        variant={`${c.choosen ? "primary" : "outline-primary"}`}
        className="w-100 m-2 d-flex align-items-center "
        onClick={() => props.onChoose(c.id)}
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
