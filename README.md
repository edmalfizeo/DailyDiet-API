# **Daily Diet API**

The **Daily Diet API** is an application designed for daily diet tracking, allowing users to log their meals and monitor their dietary metrics.

## **Project Overview**

The goal is to create a RESTful API that enables users to:

- Create a user account.
- Authenticate into the application.
- Log, edit, and delete meals.
- List all logged meals.
- View detailed information of a specific meal.
- Retrieve personal metrics about their meals.
- Ensure that each user can only manage their own meals.

## **Technologies Used**

- **Node.js** with **TypeScript**
- **Fastify** as the web framework
- **Knex** for database interaction
- **SQLite** as the development database
- **ESLint** for code standardization

## **Functional Requirements**

### **Users**

- [x] **User Registration**: Implement the route to create users with necessary fields (name, email, password).
- [x] **User Authentication**: Implement the login route for user authentication, returning a JWT token.
- [x] **Route Protection**: Create middleware to protect routes that require authentication by validating the provided JWT token.

### **Meals**

- [x] **Log Meal**: Implement the route to log a new meal with the following fields:
  - Meal name
  - Description
  - Date and time
  - Indicator if the meal is within the diet or not
- [x] **Edit Meal**: Implement the route to edit an existing meal.
- [x] **Delete Meal**: Implement the route to delete a meal.
- [x] **List Meals**: Implement the route to list all meals for the authenticated user.
- [x] **View Meal**: Implement the route to view details of a specific meal.

### **User Metrics**

- [x] **Retrieve Metrics**: Implement the route to retrieve metrics for the authenticated user:
  - Total number of meals logged.
  - Total number of meals within the diet.
  - Total number of meals outside the diet.
  - Best sequence of meals within the diet.

### **Business Rules**

- [x] **Access Restriction**: Ensure that a user can only view, edit, or delete meals that they have created.
- [x] **Data Validation**: Implement validation for input data in all routes.
