import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Stack from "react-bootstrap/Stack";
import { PropsResultComponent } from "../../types/types";
import ResultBox from "../ResultBox/ResultBox";

function ResultAnswers(props: PropsResultComponent) {
  return (
    <Accordion.Item eventKey={props.eventKey}>
      <Accordion.Header>{props.question}</Accordion.Header>
      <Accordion.Body>
        <Stack gap={3}>
          {props.choises.map((c) => (
            <ResultBox
              text={c.text}
              key={c.id}
              selected={c.choosen}
              isCorrect={c.isCorrect}
            />
          ))}
        </Stack>
      </Accordion.Body>
      <Accordion.Body>
        {props.explanation && (
          <div>
            <p>{props.explanation}</p>
          </div>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default ResultAnswers;
