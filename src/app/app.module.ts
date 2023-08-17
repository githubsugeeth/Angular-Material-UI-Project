// Import necessary modules and components
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { SectionsComponent } from './sections/sections.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  declarations: [
    // List all the components that belong to this module
    AppComponent,
    TabsComponent,
    SectionsComponent,
    QuestionsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow unknown elements in templates
  imports: [
    // List all the modules that this module depends on
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  bootstrap: [AppComponent] // Set the root component
})
export class AppModule { }