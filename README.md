# 💼 HireHub – MERN Stack Job Portal

HireHub is a full-stack job portal web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It connects job seekers with recruiters, providing a platform to post, browse, and apply for jobs efficiently.

---

## 🌟 Features

### 👤 Applicants
- Register and log in securely
- Create and manage profile
- Browse job listings
- Apply to jobs
- View application history
- Receive email notifications when shortlisted

### 🧑‍💼 Recruiters
- Register and log in securely
- Post and manage job listings
- View applicant details
- Shortlist applicants and trigger automated email notifications
- Manage received applications

### 🛡️ Common
- JWT-based authentication
- Role-based access control (Applicant / Recruiter)
- Responsive and user-friendly interface
- RESTful APIs

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Axios
- Redux-toolkit (State Management)
- React Router DOM

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Bcrypt for password hashing
- Cloudinary (for image uploads)
- Nodemailer (for sending email notifications)

---

## 🚀 Deployment Links

- **GitHub Repository**: [HireHub on GitHub](https://github.com/naseeb03/hirehub-mern/)
- **Docker Images**:
  - Backend: [`docker.io/naseeb03/hirehub-mern-backend:latest`](https://hub.docker.com/r/naseeb03/hirehub-mern-backend)
  - Frontend: [`docker.io/naseeb03/hirehub-mern-frontend:latest`](https://hub.docker.com/r/naseeb03/hirehub-mern-frontend)

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js and npm
- MongoDB (local or cloud like MongoDB Atlas)
- Docker (for running containerized version)
- A Gmail account (for sending email notifications)

---

### 🧩 Clone the Repository

```bash
git clone https://github.com/naseeb03/hirehub-mern.git
cd hirehub-mern
```

---

### 📦 Backend Setup (Manual)

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and configure the following:

```env
PORT=5000
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
MAIL_HOST=gmail
MAIL_PASS=your_app_password
MAIL_USER=your_email
```

4. Start the backend server:

```bash
npm start
```

---

### 🎨 Frontend Setup (Manual)

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:

```bash
npm start
```

---

### 🐳 Docker Setup (Recommended)

1. Pull the Docker images:

```bash
docker pull docker.io/naseeb03/hirehub-mern-backend:latest
docker pull docker.io/naseeb03/hirehub-mern-frontend:latest
```

2. Create a Docker network to allow containers to communicate:

```bash
docker network create hirehub-network
```

3. Create `.env` files locally and mount them while running:

**Backend `.env` file (backend.env):**

```env
PORT=5000
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
MAIL_HOST=gmail
MAIL_PASS=your_app_password
MAIL_USER=your_email
```

**Frontend `.env` file (frontend.env):**

```env
VITE_API_URL=http://localhost:5000/api
```

4. Run the containers:

**Backend:**

```bash
docker run -d --name hirehub-backend \
  --env-file ./backend.env \
  --network hirehub-network \
  -p 5000:5000 \
  docker.io/naseeb03/hirehub-mern-backend:latest
```

**Frontend:**

```bash
docker run -d --name hirehub-frontend \
  --env-file ./frontend.env \
  --network hirehub-network \
  -p 5173:5173 \
  docker.io/naseeb03/hirehub-mern-frontend:latest
```

---

## 📌 Future Improvements

- ✅ Email notifications for applicants when shortlisted
- 🔍 Advanced search and filters
- 📊 Admin dashboard
- 🤖 AI-based job matching and recommendations
- 💬 Real-time chat system

---

## 👨‍💻 Developed By

**Naseeb Ahmed**  
BSCS Final Year Project – Punjab University  
[GitHub](https://github.com/naseeb03)

---

## 📝 License

This project is open-source and free to use under the [MIT License](LICENSE).
