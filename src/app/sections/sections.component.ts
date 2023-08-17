import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent {
  @Input() sections: any[] = [];
  expandedSectionIndex: number = -1; // Initialize with -1 to indicate no section is expanded

  toggleSection(index: number): void {
    if (this.expandedSectionIndex === index) {
      this.expandedSectionIndex = -1; // Collapse the section if already expanded
    } else {
      this.expandedSectionIndex = index; // Expand the selected section
    }
  }
}