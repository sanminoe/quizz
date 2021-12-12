export interface Choise {
  id: string;
  text: string;
  choosen: boolean;
  isCorrect: boolean;
}

export interface QuestionType {
  id: string;
  question: string;
  choises: Choise[];
  answer: string[];
  answerExplanation?: string;
}

export interface PropsResultComponent {
  eventKey: string;
  question: string;
  choises: Choise[];
  explanation?: string;
}

export type PropsResultBoxComponent = {
  text: string;
  selected: boolean;
  isCorrect: boolean;
};
