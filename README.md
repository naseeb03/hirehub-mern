# 💼 HireHub – MERN Stack Job Portal

HireHub is a full-stack job portal web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It connects job seekers with recruiters, providing a platform to post, browse, and apply for jobs efficiently.

---

## 🌟 Features

### 👤 Applicants

* Register and log in securely
* Create and manage profile
* Browse job listings
* Apply to jobs
* View application history
* Receive email notifications when shortlisted

### 🧑‍💼 Recruiters

* Register and log in securely
* Post and manage job listings
* View applicant details
* Shortlist applicants and trigger automated email notifications
* Manage received applications

### 🛡️ Common

* JWT-based authentication
* Role-based access control (Applicant / Recruiter)
* Responsive and user-friendly interface
* RESTful APIs

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* Tailwind CSS
* Axios
* Redux-toolkit (State Management)
* React Router DOM

### Backend:

* Node.js (backend/node-backend)
* Express.js
* MongoDB with Mongoose
* JSON Web Tokens (JWT)
* Bcrypt for password hashing
* Cloudinary (for image uploads)
* Nodemailer (for sending email notifications)

### FastAPI Service (backend/fastapi-service):

* FastAPI
* Uvicorn
* Open-source Vector Database
* Gemini API (for CV Text Extraction and Search)

---

## 🚀 Deployment Links

* **GitHub Repository**: [HireHub on GitHub](https://github.com/naseeb03/hirehub-mern/)
* **Docker Images**:

  * Node Backend: [`docker.io/naseeb03/hirehub-node-backend:latest`](https://hub.docker.com/r/naseeb03/hirehub-node-backend)
  * FastAPI Service: [`docker.io/naseeb03/hirehub-fastapi-service:latest`](https://hub.docker.com/r/naseeb03/hirehub-fastapi-service)
  * Frontend: [`docker.io/naseeb03/hirehub-mern-frontend:latest`](https://hub.docker.com/r/naseeb03/hirehub-mern-frontend)

---

## ⚙️ Setup Instructions

### Prerequisites

* Node.js and npm
* MongoDB (local or cloud like MongoDB Atlas)
* Docker (for running containerized version)
* Python 3.x and virtualenv (for FastAPI Service)
* A Gmail account (for sending email notifications)

---

### 🧩 Clone the Repository

```bash
git clone https://github.com/naseeb03/hirehub-mern.git
cd hirehub-mern
```

---

### 📦 Node Backend Setup (Manual)

1. Navigate to the node-backend directory:

```bash
cd backend/node-backend
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

4. Start the Node backend server:

```bash
npm start
```

---

### 📦 FastAPI Service Setup (Manual)

1. Navigate to the `fastapi-service` directory:

```bash
cd backend/fastapi-service
```

2. Create a virtual environment and activate it:

```bash
python3 -m venv env
source env/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file and configure the following:

```env
FASTAPI_PORT=8000
GEMINI_API_KEY=your_gemini_api_key
GROK_API_KEY=your_grok_api_key
```

5. Run the FastAPI service:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
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
docker pull docker.io/naseeb03/hirehub-node-backend:latest
docker pull docker.io/naseeb03/hirehub-fastapi-service:latest
docker pull docker.io/naseeb03/hirehub-mern-frontend:latest
```

2. Create a Docker network to allow containers to communicate:

```bash
docker network create hirehub-network
```

3. Create `.env` files locally and mount them while running:

**Node Backend `.env` file (node-backend.env):**

```env
PORT=5000
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
...
```

**FastAPI `.env` file (fastapi.env):**

```env
FASTAPI_PORT=8000
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend `.env` file (frontend.env):**

```env
VITE_API_URL=http://localhost:5000/api
VITE_FASTAPI_URL=http://localhost:8000
```

4. Run the containers:

**Node Backend:**

```bash
docker run -d --name hirehub-node-backend \
  --env-file ./node-backend.env \
  --network hirehub-network \
  -p 5000:5000 \
  docker.io/naseeb03/hirehub-node-backend:latest
```

**FastAPI Service:**

```bash
docker run -d --name hirehub-fastapi-service \
  --env-file ./fastapi.env \
  --network hirehub-network \
  -p 8000:8000 \
  docker.io/naseeb03/hirehub-fastapi-service:latest
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

* ✅ Email notifications for applicants when shortlisted
* 🔍 Advanced search and filters
* 📊 Admin dashboard
* 🤖 AI-based job matching and recommendations
* 💬 Real-time chat system
* 📝 CV Text Extraction and Search (FastAPI Service)

---

## 👨‍💻 Developed By

**Naseeb Ahmed**
BSCS Final Year Project – Punjab University
[GitHub](https://github.com/naseeb03)

---

## 📝 License

This project is open-source and free to use under the [MIT License](LICENSE).
