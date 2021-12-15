import React from "react";
import Container from "react-bootstrap/Container";
import { useFieldArray, Control, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { IFormInputs } from "../../types/types";
import { v4 as uuid } from "uuid";
import { Row } from "react-bootstrap";
type Props = {
  questionIndex: number;
  control: Control<IFormInputs>;
  register: Function;
  Controller: typeof Controller;
};

function CreateChoice({ questionIndex, control, register, Controller }: Props) {
  const { fields, remove, append } = useFieldArray({
    name: `question.${questionIndex}.choices`,
    control,
  });
  return (
    <React.Fragment>
      {fields.map((f, i) => (
        <Form.Group
          key={f.id}
          controlId={`question.${questionIndex}.choices.${i}.text`}
        >
          <Stack direction="horizontal" gap={3}>
            <InputGroup className="ms-auto mt-3">
              <Form.Control
                aria-label="Text input with checkbox"
                placeholder="choise #1"
                type="text"
                {...register(`question.${questionIndex}.choices[${i}].text`, {
                  required: true,
                })}
              />
              <Form.Check
                className="p-2 bg-gray border"
                {...register(
                  `question.${questionIndex}.choices.${i}.isCorrect`
                )}
              />
              <Button
                type="button"
                className="bg-danger text-white border-0"
                onClick={() => remove(i)}
              >
                X
              </Button>
            </InputGroup>
            {/* <InputGroup className="d-flex align-items-center"></InputGroup> */}
          </Stack>
        </Form.Group>
      ))}
      <Button
        className="mt-3"
        onClick={() =>
          append({
            keyId: uuid(),
            text: `Choice`,
            isCorrect: false,
          })
        }
      >
        Add choice
      </Button>
    </React.Fragment>
  );
}

export default CreateChoice;
