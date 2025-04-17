# 📝 To-Do App

A full-stack To-Do application built with React, Chakra UI, Zustand, TypeGraphQL, TypeORM, and PostgreSQL.

## Features

- User-friendly interface for managing tasks
- Add, edit, delete, and mark tasks as completed
- Filter tasks by completion status and priority
- Persistent storage with PostgreSQL
- Modern UI with Chakra UI
- State management with Zustand
- Type-safe backend with TypeGraphQL and TypeORM

## Tech Stack

- **Frontend:** React, Chakra UI, Zustand
- **Backend:** Node.js, TypeGraphQL, TypeORM
- **Database:** PostgreSQL

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- Yarn or npm

### Clone the repository


### Backend Setup

1. **Install dependencies:**
    ```
    cd backend
    npm install
    # or
    yarn
    ```

2. **Configure environment variables:**
    - Create a `.env` file in the `backend` directory:
      ```
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=your_db_user
      DB_PASSWORD=your_db_password
      DB_DATABASE=your_db_name
      ```

3. **Run database migrations (if any):**
    ```
    npm run typeorm migration:run
    ```

4. **Start the backend server:**
    ```
    npm run dev
    ```

### Frontend Setup

1. **Install dependencies:**
    ```
    cd frontend
    npm install
    # or
    yarn
    ```

2. **Start the frontend:**
    ```
    npm run dev
    # or
    yarn run dev
    ```

3. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173)

## Usage

- **Add a new task:** Fill out the form and click "Add Task".
- **Edit a task:** Click the edit icon, update details, and save.
- **Delete a task:** Click the delete icon.
- **Mark as completed:** Use the checkbox next to each task.
- **Filter:** Use the navbar filters to view tasks by status or priority.

