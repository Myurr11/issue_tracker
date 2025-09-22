from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

app = FastAPI()

# Enable CORS for Angular frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Issue(BaseModel):
    id: Optional[str] = None
    title: str
    description: str = ""
    status: str = "Open"  # Open, In Progress, Closed
    priority: str = "Medium"  # Low, Medium, High
    assignee: str = ""
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

class IssueUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    assignee: Optional[str] = None

# In-memory storage (for simplicity)
issues_db = []

# Initialize with sample data
def init_sample_data():
    sample_issues = [
        {
            "id": str(uuid.uuid4()),
            "title": "Login page not responsive",
            "description": "The login page doesn't work properly on mobile devices",
            "status": "Open",
            "priority": "High",
            "assignee": "John Doe",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Database connection timeout",
            "description": "Users experiencing timeout when connecting to database",
            "status": "In Progress",
            "priority": "High",
            "assignee": "Jane Smith",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Update user profile feature",
            "description": "Add ability to update profile picture",
            "status": "Open",
            "priority": "Medium",
            "assignee": "Bob Wilson",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Performance optimization",
            "description": "Optimize query performance for large datasets",
            "status": "Closed",
            "priority": "Low",
            "assignee": "Alice Brown",
            "createdAt": datetime.now(),
            "updatedAt": datetime.now()
        }
    ]
    issues_db.extend(sample_issues)

# Initialize sample data on startup
init_sample_data()

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "ok"}

# Get all issues with search, filter, sort, and pagination
@app.get("/issues")
def get_issues(
    search: Optional[str] = Query(None, description="Search in title"),
    status: Optional[str] = Query(None, description="Filter by status"),
    priority: Optional[str] = Query(None, description="Filter by priority"),
    assignee: Optional[str] = Query(None, description="Filter by assignee"),
    sortBy: Optional[str] = Query("updatedAt", description="Sort by field"),
    sortOrder: Optional[str] = Query("desc", description="Sort order (asc/desc)"),
    page: int = Query(1, ge=1, description="Page number"),
    pageSize: int = Query(10, ge=1, le=100, description="Items per page")
):
    filtered_issues = issues_db.copy()
    
    # Apply search filter
    if search:
        filtered_issues = [
            issue for issue in filtered_issues 
            if search.lower() in issue["title"].lower()
        ]
    
    # Apply status filter
    if status:
        filtered_issues = [
            issue for issue in filtered_issues 
            if issue["status"] == status
        ]
    
    # Apply priority filter
    if priority:
        filtered_issues = [
            issue for issue in filtered_issues 
            if issue["priority"] == priority
        ]
    
    # Apply assignee filter
    if assignee:
        filtered_issues = [
            issue for issue in filtered_issues 
            if assignee.lower() in issue["assignee"].lower()
        ]
    
    # Apply sorting
    reverse = (sortOrder or "desc").lower() == "desc"
    if sortBy in ["title", "status", "priority", "assignee"]:
        filtered_issues.sort(key=lambda x: x[sortBy], reverse=reverse)
    elif sortBy in ["createdAt", "updatedAt"]:
        filtered_issues.sort(key=lambda x: x[sortBy], reverse=reverse)
    
    # Apply pagination
    total = len(filtered_issues)
    start = (page - 1) * pageSize
    end = start + pageSize
    paginated_issues = filtered_issues[start:end]
    
    return {
        "issues": paginated_issues,
        "total": total,
        "page": page,
        "pageSize": pageSize,
        "totalPages": (total + pageSize - 1) // pageSize
    }

# Get single issue
@app.get("/issues/{issue_id}")
def get_issue(issue_id: str):
    issue = next((issue for issue in issues_db if issue["id"] == issue_id), None)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return issue

# Create new issue
@app.post("/issues")
def create_issue(issue: Issue):
    new_issue = {
        "id": str(uuid.uuid4()),
        "title": issue.title,
        "description": issue.description,
        "status": issue.status,
        "priority": issue.priority,
        "assignee": issue.assignee,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    }
    issues_db.append(new_issue)
    return new_issue

# Update issue
@app.put("/issues/{issue_id}")
def update_issue(issue_id: str, issue_update: IssueUpdate):
    issue = next((issue for issue in issues_db if issue["id"] == issue_id), None)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    
    # Update only provided fields
    if issue_update.title is not None:
        issue["title"] = issue_update.title
    if issue_update.description is not None:
        issue["description"] = issue_update.description
    if issue_update.status is not None:
        issue["status"] = issue_update.status
    if issue_update.priority is not None:
        issue["priority"] = issue_update.priority
    if issue_update.assignee is not None:
        issue["assignee"] = issue_update.assignee
    
    issue["updatedAt"] = datetime.now()
    return issue

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)