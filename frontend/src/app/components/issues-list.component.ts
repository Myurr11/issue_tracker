import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService, Issue, IssuesResponse, IssueFilters } from '../services/issue.service';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {
  issues: Issue[] = [];
  loading = false;
  error = '';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalItems = 0;

  // Filters and Search
  searchTerm = '';
  selectedStatus = '';
  selectedPriority = '';
  selectedAssignee = '';

  // Sorting
  sortBy = 'updatedAt';
  sortOrder = 'desc';

  // Options for dropdowns
  statusOptions = ['', 'Open', 'In Progress', 'Closed'];
  priorityOptions = ['', 'Low', 'Medium', 'High'];
  assigneeOptions = [''];

  constructor(
    private issueService: IssueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadIssues();
    this.loadAssigneeOptions();
  }

  loadIssues(): void {
    this.loading = true;
    this.error = '';

    const filters: IssueFilters = {
      search: this.searchTerm || undefined,
      status: this.selectedStatus || undefined,
      priority: this.selectedPriority || undefined,
      assignee: this.selectedAssignee || undefined,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      page: this.currentPage,
      pageSize: this.pageSize
    };

    this.issueService.getIssues(filters).subscribe({
      next: (response: IssuesResponse) => {
        this.issues = response.issues;
        this.totalItems = response.total;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load issues';
        this.loading = false;
        console.error('Error loading issues:', error);
      }
    });
  }

  loadAssigneeOptions(): void {
    // Load all issues to get unique assignees
    this.issueService.getIssues({ pageSize: 1000 }).subscribe({
      next: (response) => {
        const assignees = [...new Set(response.issues
          .map(issue => issue.assignee)
          .filter(assignee => assignee && assignee.trim() !== '') as string[]
        )];
        this.assigneeOptions = ['', ...assignees.sort()];
      },
      error: (error) => console.error('Error loading assignees:', error)
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadIssues();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadIssues();
  }

  onSort(field: string): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.loadIssues();
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadIssues();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadIssues();
  }

  createIssue(): void {
    this.router.navigate(['/issues/create']);
  }

  editIssue(event: Event, issue: Issue): void {
    event.stopPropagation();
    this.router.navigate(['/issues/edit', issue.id]);
  }

  viewIssue(issue: Issue): void {
    this.router.navigate(['/issues', issue.id]);
  }

  getSortIcon(field: string): string {
    if (this.sortBy !== field) return '↕️';
    return this.sortOrder === 'asc' ? '↑' : '↓';
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
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getMaxDisplayed(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }
}