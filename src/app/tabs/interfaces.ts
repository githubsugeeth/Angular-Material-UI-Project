export interface Question {
    type: 'predefined' | 'dropdown' | 'textbox';
    text?: string;
    label?: string;
    options?: { label: string; value: string }[];
    selectedValue?: string;
    enteredValue?: string;
  }
  
  export interface Section {
    title: string;
    questions: Question[];
  }