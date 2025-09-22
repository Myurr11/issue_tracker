# Issue Tracker

A full-stack Issue Tracker application built with Python FastAPI backend and Angular frontend. This application allows users to view, search, filter, sort, create, and update issues with a modern, responsive user interface.

## 🚀 Features

### Backend (FastAPI)
- **RESTful API** with comprehensive endpoints
- **Health check** endpoint for monitoring
- **CRUD operations** for issues management
- **Advanced filtering** by status, priority, and assignee
- **Search functionality** by issue title
- **Sorting** by any field (ascending/descending)
- **Pagination** support with customizable page size
- **Auto-generated timestamps** (createdAt, updatedAt)
- **CORS configuration** for frontend integration

### Frontend (Angular 17)
- **Issues List Page** with interactive table
- **Advanced filtering** with dropdown controls
- **Real-time search** functionality
- **Column sorting** with visual indicators
- **Pagination controls** with page size options
- **Issue creation** with form validation
- **Issue editing** capabilities
- **Issue detail view** with full JSON display
- **Responsive design** for all screen sizes
- **Loading states** and error handling

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check - returns `{"status": "ok"}` |
| GET | `/issues` | Get all issues with optional filters, search, sort, and pagination |
| GET | `/issues/{id}` | Get a specific issue by ID |
| POST | `/issues` | Create a new issue |
| PUT | `/issues/{id}` | Update an existing issue |

### Query Parameters for `/issues`

- `search` - Search by issue title
- `status` - Filter by status (Open, In Progress, Closed)
- `priority` - Filter by priority (Low, Medium, High)
- `assignee` - Filter by assignee name
- `sortBy` - Sort by field (title, status, priority, assignee, createdAt, updatedAt)
- `sortOrder` - Sort order (asc, desc)
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10, max: 100)

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**
- **FastAPI** - Modern web framework
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server
- **CORS middleware** - Cross-origin resource sharing

### Frontend
- **Angular 17** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Enhanced CSS with variables and mixins
- **Angular Router** - Client-side routing
- **Angular Forms** - Reactive forms with validation
- **HttpClient** - HTTP communication

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```bash
   python3 main.py
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```
   or
    ```bash
   npm start
   ```


The frontend will be available at `http://localhost:4200`

## 🎯 Usage

### Viewing Issues
1. Open your browser and go to `http://localhost:4200`
2. The Issues List page displays all issues in a table format
3. Use the search box to find issues by title
4. Apply filters using the dropdown menus for status, priority, and assignee
5. Click column headers to sort by different fields
6. Use pagination controls to navigate through multiple pages

### Creating Issues
1. Click the "Create New Issue" button
2. Fill in the required information:
   - **Title** (required)
   - **Description** (optional)
   - **Status** (Open, In Progress, Closed)
   - **Priority** (Low, Medium, High)
   - **Assignee** (optional)
3. Click "Create Issue" to save

### Editing Issues
1. Click the "Edit" button on any issue row
2. Modify the issue details in the form
3. Click "Update Issue" to save changes

### Viewing Issue Details
1. Click anywhere on an issue row (except the Edit button)
2. View complete issue information including timestamps
3. Expand the "Raw Issue Data" section to see the full JSON

## 🗂️ Project Structure

```
Assignment_Securigeek/
├── backend/
│   ├── main.py              # FastAPI application with all endpoints
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Angular components
│   │   │   ├── services/    # HTTP services
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │   ├── styles.scss      # Global styles
│   │   └── main.ts          # Application bootstrap
│   ├── angular.json         # Angular configuration
│   └── package.json         # Node.js dependencies
└── README.md               # This file
```

## 📊 Sample Data

The application comes pre-loaded with sample issues for immediate testing:
- Login page responsiveness issue (High priority, Open)
- Database connection timeout (High priority, In Progress)
- User profile update feature (Medium priority, Open)
- Performance optimization (Low priority, Closed)

## 🔧 Development

### Backend Development
- The FastAPI server supports hot reload during development
- API documentation is automatically generated at `http://localhost:8000/docs`
- Health check endpoint: `http://localhost:8000/health`

### Frontend Development
- Angular CLI provides hot reload for instant development feedback
- Run `ng build` to build the production version
- Run `ng test` to execute unit tests

## 🚦 API Testing

You can test the API endpoints using curl or any HTTP client:

```bash
# Health check
curl http://localhost:8000/health

# Get all issues
curl http://localhost:8000/issues

# Get issues with filters
curl "http://localhost:8000/issues?status=Open&priority=High&page=1&pageSize=5"

# Get specific issue
curl http://localhost:8000/issues/{issue-id}

# Create new issue
curl -X POST http://localhost:8000/issues \
  -H "Content-Type: application/json" \
  -d '{"title":"New Issue","description":"Issue description","status":"Open","priority":"Medium","assignee":"John Doe"}'
```

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Status Badges**: Color-coded status indicators (Open: green, In Progress: yellow, Closed: blue)
- **Priority Badges**: Color-coded priority indicators (High: red, Medium: yellow, Low: green)
- **Interactive Sorting**: Click column headers with visual sort indicators
- **Loading States**: Smooth loading animations during API calls
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation with visual feedback

## 📝 License

This project is created for educational purposes as part of a coding assignment.

---

**Built with ❤️ using FastAPI and Angular**