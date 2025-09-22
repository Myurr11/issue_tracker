import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService, Issue } from '../services/issue.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {
  issue: Issue | null = null;
  loading = false;
  error = '';
  issueId: string | null = null;

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.issueId = this.route.snapshot.paramMap.get('id');
    if (this.issueId) {
      this.loadIssue(this.issueId);
    }
  }

  loadIssue(id: string): void {
    this.loading = true;
    this.error = '';
    
    this.issueService.getIssue(id).subscribe({
      next: (issue) => {
        this.issue = issue;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load issue';
        this.loading = false;
        console.error('Error loading issue:', error);
      }
    });
  }

  editIssue(): void {
    if (this.issue?.id) {
      this.router.navigate(['/issues/edit', this.issue.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/issues']);
  }

  getPriorityClass(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'open': return 'status-open';
      case 'in progress': return 'status-in-progress';
      case 'closed': return 'status-closed';
      default: return '';
    }
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }

  getIssueJson(): string {
    return JSON.stringify(this.issue, null, 2);
  }
}