import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuesListComponent } from './components/issues-list.component';
import { IssueFormComponent } from './components/issue-form.component';
import { IssueDetailComponent } from './components/issue-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/issues', pathMatch: 'full' },
  { path: 'issues', component: IssuesListComponent },
  { path: 'issues/create', component: IssueFormComponent },
  { path: 'issues/edit/:id', component: IssueFormComponent },
  { path: 'issues/:id', component: IssueDetailComponent },
  { path: '**', redirectTo: '/issues' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }