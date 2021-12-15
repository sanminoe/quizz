import React from "react";
import { PropsResultBoxComponent } from "../../types/types";

function ResultBox(props: PropsResultBoxComponent) {
  let isAnswer = false;
  let resultClasses = `border border-2 border-primary`;
  if (props.isCorrect || (props.choosen && props.isCorrect)) {
    isAnswer = true;
    resultClasses = "bg-success text-white";
  } else if (props.isCorrect === false && props.choosen) {
    resultClasses = "bg-danger text-white";
  } else {
    resultClasses = `border border-2 border-primary`;
  }
  return (
    <div
      className={`d-inline-block align-middle text-center p-1 rounded ${resultClasses}`}
    >
      {props.text}
    </div>
  );
}

export default ResultBox;
