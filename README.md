# User & Project Management Portal

A full-featured SaaS-style User & Project Management Portal built with React, Vite, and Ant Design.

## Features

- **Authentication & Authorization**: Role-based access control (Admin, Manager, User)
- **User Management**: CRUD operations for user accounts
- **Project Management**: Complete project lifecycle management
- **Responsive Design**: Mobile-first approach with Ant Design components
- **State Management**: Context API for global state
- **Performance Optimization**: Code splitting, lazy loading, and memoization
- **Form Validation**: Client-side validation with comprehensive error handling
- **API Integration**: Full CRUD operations with MockAPI.io

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Ant Design**: Professional UI component library
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API requests
- **MockAPI.io**: Backend API service

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-project-management
```

2. Install dependencies:
```bash
npm install
```

3. Setup MockAPI:
   - Go to https://mockapi.io
   - Create a new project
   - Create two resources:
     - `users` with fields: name, email, role, phone, department
     - `projects` with fields: title, description, status, manager, budget, startDate, endDate, team
   - Update the `API_BASE_URL` in `src/utils/constants.js` with your MockAPI endpoint

4. Start the development server:
```bash
npm run dev
```

## Demo Credentials

- **Admin**: admin@test.com / admin123
- **Manager**: manager@test.com / manager123
- **User**: user@test.com / user123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Implementation

### Authentication & Routing
- Protected routes with role-based access
- Automatic redirect to login for unauthenticated users
- Unauthorized page for insufficient permissions

### State Management
- Context API for authentication state
- Custom hooks for data fetching and debouncing
- Optimized re-renders with useMemo and useCallback

### Performance Optimization
- Code splitting with React.lazy
- Route-based code splitting
- Component memoization
- Debounced search inputs
- Manual chunking for vendor libraries

### Form Validation
- Required field validation
- Email format validation
- Min/max length validation
- Custom validation functions

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Responsive tables with horizontal scroll
- Collapsible sidebar for mobile devices

## Role-Based Access

- **Admin**: Full access to all features (CRUD for users and projects)
- **Manager**: Can manage projects and view users (limited delete access)
- **User**: Can only view own data and projects

## API Endpoints

All endpoints use the MockAPI.io base URL configured in constants.js:

- `GET /users` - Get all users
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /projects` - Get all projects
- `POST /projects` - Create new project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT