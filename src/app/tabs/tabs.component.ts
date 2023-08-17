import { Component, HostListener, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section, Question } from './interfaces';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {

  expandedSectionIndex: number = -1;

  tab1Sections = [
    {
      title: 'Section 1',
      questions: [
        {
          type: 'predefined',
          text: 'Are you familiar with Angular?'
        },
        {
          type: 'dropdown',
          label: 'Select Option',
          options: [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' }
          ],
          selectedValue: '' // Add selectedValue property for dropdown
        }
      ]
    },
    {
      title: 'Section 2',
      questions: [
        {
          type: 'predefined',
          text: 'Enter your experience in years with .NET?'
        },
        {
          type: 'textbox',
          label: 'Enter Value',
          enteredValue: '' // Add enteredValue property for textbox
        },
      ]
    },
  ];

  tab2Sections = [
    {
      title: 'Section 1',
      questions: [
        {
          type: 'predefined',
          text: 'Are you familiar with JavaScript?'
        },
        {
          type: 'dropdown',
          label: 'Select Option',
          options: [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' }
          ],
          selectedValue: '' // Add selectedValue property for dropdown
        }
      ]
    }
    // Add more sections and questions as needed
  ];

  tabSections: any[] = [
    this.tab1Sections, this.tab2Sections
  ];

  tabLabels: string[] = this.tabSections.map((section, index) => `Tab ${index + 1}`);

  isSmallScreen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {
    this.checkScreenSize();
  }

  sendDataToApi(data: any, tabIndex: number) {
    const hasUnfilledFields = this.checkForUnfilledFields(data[tabIndex]);
    
    if (hasUnfilledFields) {
      // Show an error or take appropriate action
      console.log("Please fill out all fields in the opened tab before submitting.");
      return;
    }
  
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    this.http.post(apiUrl, data).subscribe(response => {
      console.log('Data sent to API:', response);
      this.resetState();
  
      // Trigger change detection to update the view
      this.changeDetectorRef.detectChanges();
    });
  }
  
  checkForUnfilledFields(sections: Section[]): boolean {
    let hasUnfilledFields = false;
  
    sections.forEach((sectionItem: Section) => {
      sectionItem.questions.forEach((question: Question) => {
        if (
          (question.type === 'dropdown' && !question.selectedValue) ||
          (question.type === 'textbox' && !question.enteredValue)
        ) {
          hasUnfilledFields = true;
          return;
        }
      });
    });
  
    return hasUnfilledFields;
  }

  submitData(data: any) {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    this.http.post(apiUrl, data).subscribe(response => {
      console.log('Data sent to API:', response);
      this.resetState();
      this.changeDetectorRef.detectChanges();
    });
  }


  resetState() {
    this.tabSections.forEach((sections: Section[]) => {
      sections.forEach((sectionItem: Section) => {
        sectionItem.questions.forEach((question: Question) => {
          if (question.type === 'dropdown') {
            question.selectedValue = '';
          }
          if (question.type === 'textbox') {
            question.enteredValue = '';
          }
        });
      });
    });
    this.expandedSectionIndex = -1;
  }
}