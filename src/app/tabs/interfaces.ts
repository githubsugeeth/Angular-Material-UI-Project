export interface Question {
  type: 'predefined' | 'dropdown' | 'textbox';
  text?: string;
  label?: string;
  options?: Option[];
  selectedValue?: string;
  enteredValue?: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface Section {
  title: string;
  questions: Question[];
}