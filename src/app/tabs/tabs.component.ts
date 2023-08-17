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
  tabSections: Section[][] = [];
  tabLabels: string[] = [];

  isSmallScreen: boolean = false;

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {
    this.checkScreenSize();
    this.initializeTabs();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  initializeTabs() {
    // Initialize your tabSections and tabLabels arrays here
    const tab1Sections: Section[] = [
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
          },
          {
            type: 'predefined',
            text: 'Experience in years with Python?'
          },
          {
            type: 'textbox',
            label: 'Enter Value',
            enteredValue: '' // Add enteredValue property for textbox
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

    const tab2Sections: Section[] = [
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
      },
      // Add more sections and questions as needed
    ];

    this.tabSections = [
      tab1Sections,
      tab2Sections,
      // Add more tabSections as needed
    ];

    this.tabLabels = this.tabSections.map((section, index) => `Tab ${index + 1}`);
  }

  sendDataToApi(data: any, tabIndex: number) {
    const hasUnfilledFields = this.checkForUnfilledFields(data[tabIndex]);

    if (hasUnfilledFields) {
      console.error("Please fill out all fields in the opened tab before submitting.");
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
    for (const sectionItem of sections) {
      for (const question of sectionItem.questions) {
        if ((question.type === 'dropdown' && !question.selectedValue) ||
            (question.type === 'textbox' && !question.enteredValue)) {
          return true;
        }
      }
    }
    return false;
  }

  resetState() {
    this.tabSections.forEach(sections => {
      sections.forEach(sectionItem => {
        sectionItem.questions.forEach(question => {
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