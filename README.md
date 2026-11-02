# Node.js, Express & MongoDB CRUD API

A complete, production-ready RESTful API implementing full CRUD (Create, Read, Update, Delete) operations using **Node.js**, **Express.js**, and **MongoDB (Mongoose)**, following the Model-View-Controller (MVC / Model-Route-Controller) architecture.

Accompanies the backend tutorial: [Intro to Backend Web Development – Node.js & Express Tutorial](https://www.youtube.com/watch?v=KOutPbKc9UM).

---

## 📁 Project Structure

```text
node-express-mongodb-crud/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas connection using Mongoose
│   ├── controllers/
│   │   └── user.controller.js     # Business logic & request handlers for CRUD
│   ├── models/
│   │   └── user.model.js          # Mongoose schema and model definition
│   ├── routes/
│   │   └── user.routes.js         # API route definitions and endpoint mappings
│   ├── app.js                     # Express app setup, CORS & middleware
│   └── server.js                  # Server entry point & port listener
├── .env                           # Local environment variables (DO NOT commit)
├── .env.example                   # Template environment variables
├── .gitignore                     # Git ignore rules
├── index.js                       # Root entry point delegating to src/server.js
├── package.json                   # Dependencies & npm scripts
├── postman_collection.json        # Ready-to-import Postman collection
└── README.md                      # Complete documentation & tutorial guide
```

---

## 🛠️ Step-by-Step Implementation Guide

### Part (a): Node Project Setup & Git / GitHub
1. **Initialize Project**:
   ```bash
   npm init -y
   ```
2. **Install Dependencies**:
   ```bash
   npm install express mongoose dotenv cors
   ```
3. **Configure npm scripts in `package.json`**:
   - `"start": "node index.js"` (production)
   - `"dev": "node --watch index.js"` (development with auto-reload)
4. **Git Version Control**:
   - Initialize git: `git init -b main`
   - `.gitignore` ensures `node_modules` and `.env` are never committed.

---

### Part (b): Setup Online MongoDB Atlas Account & Cluster
1. Navigate to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up / log in.
2. Click **Create** to deploy a free **M0 Sandbox** cluster.
3. Under **Security > Database Access**:
   - Create a database user (e.g., username `admin`, choose a strong password).
4. Under **Security > Network Access**:
   - Click **Add IP Address** > Choose **Allow Access from Anywhere** (`0.0.0.0/0`) so you can connect from your local laptop.
5. Under **Deployment > Database**:
   - Click **Connect** on your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the connection string format:
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/backend_db?retryWrites=true&w=majority
     ```
6. Open your local `.env` file and replace `<username>` and `<password>` with your real MongoDB Atlas credentials:
   ```env
   PORT=5001
   NODE_ENV=development
   MONGO_URI=mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/backend_db?retryWrites=true&w=majority
   ```

---

### Part (c): Database Models (Mongoose Schema)
In `src/models/user.model.js`, we define the `User` schema:
* `name`: String, required, trimmed, max 50 characters.
* `email`: String, required, unique, lowercase, regex-validated.
* `age`: Number, min 0.
* `timestamps`: Automatically adds `createdAt` and `updatedAt` timestamps.

---

### Part (d): Express APIs (Controllers & Routes) for CRUD Operations

| HTTP Method | Route Endpoint | Controller Action | Description |
|---|---|---|---|
| **POST** | `/api/users` | `createUser` | Validates duplicate email and creates a new user |
| **GET** | `/api/users` | `getAllUsers` | Fetches all users from MongoDB sorted newest first |
| **GET** | `/api/users/:id` | `getUserById` | Retrieves single user by MongoDB `_id` |
| **PUT** | `/api/users/:id` | `updateUser` | Updates user details by ID with validation |
| **DELETE** | `/api/users/:id` | `deleteUser` | Deletes user from MongoDB by ID |

---

### Part (e): Testing with Postman Desktop App

1. Download & open the **Postman Desktop App**.
2. Click **Import** (top left) and select the file:
   ```text
   node-express-mongodb-crud/postman_collection.json
   ```
3. The collection includes pre-configured requests:
   - **Health Check**: `GET http://localhost:5001/api/health`
   - **1. Create User**: `POST http://localhost:5001/api/users`
     ```json
     {
       "name": "John Doe",
       "email": "johndoe@example.com",
       "age": 25
     }
     ```
     *(The test script automatically saves the returned `_id` into a collection variable for subsequent requests!)*
   - **2. Get All Users**: `GET http://localhost:5001/api/users`
   - **3. Get User By ID**: `GET http://localhost:5001/api/users/{{userId}}`
   - **4. Update User**: `PUT http://localhost:5001/api/users/{{userId}}`
     ```json
     {
       "name": "John Doe Updated",
       "age": 26
     }
     ```
   - **5. Delete User**: `DELETE http://localhost:5001/api/users/{{userId}}`

---

## 🚀 Running the Application on Your Laptop

1. **Start the Development Server**:
   ```bash
   npm run dev
   ```
2. You will see:
   ```text
   ====================================================
   🚀 Server running on port 5001
   🌐 Base URL: http://localhost:5001
   📡 Health Check: http://localhost:5001/api/health
   👥 Users API: http://localhost:5001/api/users
   ====================================================
   ✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
   ```
3. Open your browser or Postman and visit `http://localhost:5001`.

---

## 📤 Pushing to GitHub (For Assignment Submission)

1. Create a new public repository on [GitHub](https://github.com/new) named `backend-express-mongodb-crud`.
2. Connect your local repository and push:
   ```bash
   git add .
   git commit -m "feat: complete backend tutorial implementation with full CRUD operations"
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/backend-express-mongodb-crud.git
   git branch -M main
   git push -u origin main
   ```
3. Your Public GitHub Repository URL:
   **https://github.com/harshitwsh/backend-express-mongodb-crud**
   Submit this URL for your evaluation!

---

## 🎓 Evaluation & Viva Checklist

Be ready to explain to the evaluator:
1. **MVC Architecture**: Why separate routes (`user.routes.js`) from controllers (`user.controller.js`) and models (`user.model.js`).
2. **Environment Variables**: Why `.env` is in `.gitignore` (security: never expose database passwords to GitHub).
3. **Middleware**: Purpose of `express.json()` (parses incoming JSON request bodies) and `cors()` (Cross-Origin Resource Sharing).
4. **Mongoose**: How schemas enforce structure on NoSQL databases and provide validation rules.
5. **Status Codes**: 
   - `200 OK`: Successful GET / PUT / DELETE.
   - `201 Created`: Successful POST.
   - `400 Bad Request`: Validation error or duplicate email.
   - `404 Not Found`: User ID not found.
   - `500 Internal Server Error`: Server/database exception.
