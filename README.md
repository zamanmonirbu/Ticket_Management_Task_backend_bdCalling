# Ticket Management System

## Project Overview
The **Ticket Management System** is a complete platform designed to facilitate the management, tracking, and resolution of user tickets. It features role-based access, user authentication, and real-time ticket management to streamline operations for both users and administrators.

LiveTicket.js Link: [Ticket Management System](https://ticket-management-task-fronend-bd-calling.vercel.app/)


## Features

### 1. **Authentication & Authorization**
- **User Registration**: Users can create new accounts to access the system.
- **Login & Logout**: Secure login and logout functionality using JWT tokens.
- **Role-based Access Control (RBAC)**: Separate roles for Admin and Users, ensuring access is granted only to appropriate functionalities.

### 2. **User Management**
- **User Dashboard**: Users can view their ticket history and current ticket status.
- **Admin Dashboard**: Admins can manage users, view user details, and update user roles if needed.Ticket.js

### 3. **Admin Functionalities**
- **Bus Management**:
  - Add a new bus.
  - Update existing bus information.
  - Delete a bus.
- **Ticket Management**:
  - Upload new tickets with prices and time slots for buses.
  - Update existing ticket information.
  - Delete a ticket.

### 4. **Security**
- **Password Encryption**: User passwords are encrypted before being stored in the database.
- **JWT Authentication**: Token-based authentication for secure login sessions.

## Technologies Used

### **Frontend**
- **React**: For building the user interface.
- **Vite**: For fast development and build tools.
- **Redux**: For state management of the application.

### **Backend**
- **Node.js**: Server-side runtime environment.
- **Express.js**: Framework for handling routes and server logic.
- **Mongoose**: ODM for MongoDB to manage database interactions.
- **JWT**: Used for user authentication and authorization.

### **Database**
- **MongoDB**: NoSQL database used for storing user, ticket, and admin data.


## ERD 
![image](https://github.com/user-attachments/assets/fd6fca75-b80d-4189-8796-77bc6eb239a6)


## API Endpoints



### **Authentication APIs**
| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| POST   | /auth/register    | User registration     |
| POST   | /auth/login       | User login            |
| POST   | /auth/logout      | User logout           |

### **Admin APIs**
| Method | Endpoint                | Description                 |
|--------|-------------------------|-----------------------------|
| POST   | /admin/bus               | Add a new bus               |
| PUT    | /admin/bus/:id           | Update existing bus info    |
| DELETE | /admin/bus/:id           | Delete a bus                |
| POST   | /admin/ticket            | Upload a new ticket         |
| PUT    | /admin/ticket/:id        | Update existing ticket info |
| DELETE | /admin/ticket/:id        | Delete a ticket             |

### **User APIs**
| Method | Endpoint       | Description                            |
|--------|-----------------|---------------------------------------|
| GET    | /buses          | View available buses                  |
| GET    | /tickets        | View available tickets                |
| POST   | /tickets/purchase | Purchase a ticket for a specific bus |


## Installation

### 1. **Clone the Repository**
```bash
git clone https://github.com/zamanmonirbu/Ticket_Management_Task_backend_bdCalling.git
cd Ticket_Management_Task_backend_bdCalling
```

### 2. **Install Backend Dependencies**
```bash
npm install
```

### 3. **Environment Variables**
Create a `.env` file in the root of the backend folder and add the following keys:
```
PORT=5000
MONGO_URI=mongodb+srv://bdcalling24:bdcalling24@cluster0.fwfzjhi.mongodb.net/bdcalling24?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=ThisIsSecrateKey24
REFRESH_SECRET=REFRESH_SECRET_TOKN24
```
### 4. **Run Project**
```bash
npm run dev
```


The application will be accessible at **http://localhost:5173**.

## Usage
1. Register a new user or log in using existing credentials.
2. Users can create, update, and view the status of their tickets.
3. Admins have the authority to manage users and update ticket statuses.

## Login Credential

### User
*Email: user@example.com*
*Password: password123*
### Admin
*Email: admin@example.com*
*Password: password123*



## Connect with Me

You can connect with me through the following platforms:

- **Email:** [monir.cse6.bu@gmail.com](mailto:monir.cse6.bu@gmail.com)
- **GitHub:** [![GitHub Icon](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/zamanmonirbu)
- **LinkedIn:** [![LinkedIn Icon](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mdmoniruzzamanbu/)
- **Codeforces:** [![Codeforces Icon](https://img.shields.io/badge/Codeforces-00FF00?style=for-the-badge&logo=codeforces&logoColor=white)](https://codeforces.com/profile/ZaMo)
- **LeetCode:** [![LeetCode Icon](https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/u/moniruzzamancse6/)
- **Portfolio:** [![Portfolio Icon](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=codeforces&logoColor=white)](https://moniruzzamanbu.netlify.app/)
- **Medium:** [![Medium Icon](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@zamanmonirbu)

Feel free to reach out or connect for collaborations, suggestions, or just to chat about technology!


Developed by **[Md. Moniruzzaman](https://www.linkedin.com/in/mdmoniruzzamanbu)**.
