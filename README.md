#  Dashboard Application

A **React + TypeScript** dashboard application built with modern tools.  
Features authentication, profile management, product boards (Kanban with drag & drop), and product list with virtualization & infinite scroll.

---
## Installation & Setup
   -**install dependencies**: npm install
   -**run a dev server** : npm run dev
   -**run a prod build** : npm start
 
---
## Tech Stack

- **Framework**: [React + Vite](https://vitejs.dev/) (with TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Ant Design](https://ant.design/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching & Caching**: [TanStack Query](https://tanstack.com/query)
- **Virtualization**: [TanStack Virtual](https://tanstack.com/virtual)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Drag & Drop**: [@dnd-kit/core](https://dndkit.com/)

---

## Features

- **Authentication**
  - Login with [DummyJSON Auth API](https://dummyjson.com/docs/auth#auth-login)
  - Token stored in `localStorage`
  - Logout clears token and redirects

- **Dashboard Layout**
  - Header with logo and profile
  - Profile modal (user info from [Auth Me API](https://dummyjson.com/docs/auth#auth-me))
  - Collapsible Sidebar (Product Boards, Product List)

- **Product Boards (Kanban)**
  - Columns: Pending, In Progress, Completed
  - Drag & drop tasks across columns
  - Data from [DummyJSON Todos](https://dummyjson.com/docs/todos#todos-all)

- **Product List**
  - Infinite scrolling + virtualization
  - Search by title
  - view actions
  - Data from [DummyJSON Products](https://dummyjson.com/docs/products#products-all)

- **Product Details**
  - Opened on `/products/:id`
  - Sidebar shows list, right panel shows details
  - Includes image, title, brand, category, price, rating, stock, description
  - Close button hides panel

- **Access Control**
  - Private routes – redirect to login if unauthenticated

---


### Clone the repository
```bash
git clone https://github.com/your-username/dashboard-app.git
cd project
