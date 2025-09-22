import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService, Issue } from '../services/issue.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss']
})
export class IssueFormComponent implements OnInit {
  issue: Issue = {
    title: '',
    description: '',
    status: 'Open',
    priority: 'Medium',
    assignee: ''
  };
  
  isEditMode = false;
  issueId: string | null = null;
  loading = false;
  error = '';

  statusOptions = ['Open', 'In Progress', 'Closed'];
  priorityOptions = ['Low', 'Medium', 'High'];

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.issueId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.issueId;

    if (this.isEditMode && this.issueId) {
      this.loadIssue(this.issueId);
    }
  }

  loadIssue(id: string): void {
    this.loading = true;
    this.issueService.getIssue(id).subscribe({
      next: (issue) => {
        this.issue = { ...issue };
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load issue';
        this.loading = false;
        console.error('Error loading issue:', error);
      }
    });
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.isEditMode && this.issueId) {
      // Update existing issue
      const updateData = {
        title: this.issue.title,
        description: this.issue.description,
        status: this.issue.status,
        priority: this.issue.priority,
        assignee: this.issue.assignee
      };

      this.issueService.updateIssue(this.issueId, updateData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/issues']);
        },
        error: (error) => {
          this.error = 'Failed to update issue';
          this.loading = false;
          console.error('Error updating issue:', error);
        }
      });
    } else {
      // Create new issue
      const newIssue = {
        title: this.issue.title,
        description: this.issue.description || '',
        status: this.issue.status,
        priority: this.issue.priority,
        assignee: this.issue.assignee || ''
      };

      this.issueService.createIssue(newIssue).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/issues']);
        },
        error: (error) => {
          this.error = 'Failed to create issue';
          this.loading = false;
          console.error('Error creating issue:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/issues']);
  }

  isFormValid(): boolean {
    return !!(this.issue.title && this.issue.title.trim());
  }
}