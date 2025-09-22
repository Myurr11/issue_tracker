import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssuesListComponent } from './components/issues-list.component';
import { IssueFormComponent } from './components/issue-form.component';
import { IssueDetailComponent } from './components/issue-detail.component';
import { IssueService } from './services/issue.service';

@NgModule({
  declarations: [
    AppComponent,
    IssuesListComponent,
    IssueFormComponent,
    IssueDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }