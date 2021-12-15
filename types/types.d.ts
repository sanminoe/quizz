export interface Choice {
  keyId: string;
  text: string;
  isCorrect: boolean;
  choosen?: boolean;
}

export interface QuestionType {
  keyId: string;
  name: string;
  choices: Choice[];
  answerExplanation: string;
  maxChoices: number;
}

export interface PropsResultComponent {
  eventKey: string;
  question: string;
  choises: Choice[];
  explanation?: string;
}

export type PropsResultBoxComponent = {
  text: string;
  selected: boolean;
  isCorrect: boolean;
};

export type QuizType = {
  keyId: string;
  quizName?: string;
  quizDescription?: string;
  question: {
    keyId: string;
    name: string;
    maxChoices: number;
    answerExplanation: string;
    choices: {
      keyId: string;
      text: string;
      isCorrect: boolean;
      choosen: boolean;
    }[];
  }[];
};

export type IFormInputs = {
  keyId: string;
  quizName?: string;
  quizDescription?: string;
  question: {
    keyId: string;
    name: string;
    maxChoices: number;
    answerExplanation: string;
    choices: {
      keyId: string;
      text: string;
      isCorrect: boolean;
    }[];
  }[];
};
