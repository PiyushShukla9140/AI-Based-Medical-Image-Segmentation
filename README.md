# 🏥 AI-Based Medical Image Segmentation

An AI-powered medical imaging platform developed as a **college minor project** for uploading medical images, analyzing them using **Google Gemini AI**, detecting regions of interest, visualizing AI-generated bounding boxes, and generating diagnostic reports.

The application provides a complete workflow from **patient management → medical scan upload → AI analysis → detected regions → diagnostic report → PDF download**.

> ⚠️ **Disclaimer:** This project is developed for educational and demonstration purposes only. It is not intended for real-world medical diagnosis, treatment, or clinical decision-making.

---

## 🌐 Live Demo

### Frontend

🔗 **Live Application:**  
`https://your-frontend-url.vercel.app`

### Backend API

🔗 **Backend API:**  
`https://your-backend-url.onrender.com`

### Backend Health Check

🔗 **Health Check:**  
`https://your-backend-url.onrender.com/healthcheck`

> Replace the above URLs with your actual Vercel and Render deployment URLs after deployment.

---

## 📌 Project Overview

The **AI-Based Medical Image Segmentation** platform allows users to:

- Register and log in securely
- Manage patient information
- Upload medical images
- Store uploaded images using Cloudinary
- Analyze medical images using Google Gemini AI
- Detect regions of interest in medical images
- Display AI-generated bounding boxes over detected regions
- View AI analysis and severity information
- Create diagnostic reports
- Add doctor notes and final verdicts
- View generated reports
- Download reports as PDF
- Manage scans and reports through a centralized dashboard

The project demonstrates how **Artificial Intelligence, full-stack web development, cloud storage, and database technologies** can be combined to create an educational medical imaging platform.

---

## 🎯 Objectives

The main objectives of this project are:

1. Build a web-based medical imaging platform.
2. Integrate AI-based image analysis using Google Gemini.
3. Visualize detected regions on medical images.
4. Provide patient and medical scan management.
5. Generate structured diagnostic reports.
6. Store medical images using cloud storage.
7. Demonstrate AI integration with a full-stack web application.
8. Provide a simple and user-friendly interface for educational demonstration.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- HTTP-only authentication cookies
- Protected routes
- Logout
- Refresh token support
- Account management
- Password change
- Current-user authentication

---

### 👨‍⚕️ Patient Management

Users can manage patient information through the application.

Features include:

- Add patients
- View patient list
- Search patients
- View patient details
- Update patient information
- Delete patients
- Associate patients with medical scans

Patient information includes:

- Name
- Age
- Gender
- Contact number
- Medical notes

---

### 🩻 Medical Scan Management

Supported scan types include:

- Chest X-Ray
- Brain MRI
- CT Scan
- Skin Lesion
- Hips X-Ray
- Other

Features include:

- Upload medical images
- Image validation
- Cloudinary image storage
- Scan status tracking
- View scan details
- Delete scans
- Associate scans with patients
- View AI analysis associated with a scan

---

### 🤖 AI Image Analysis

The application uses **Google Gemini AI** to analyze uploaded medical images.

AI analysis can provide:

- Overall findings
- Severity level
- Detected regions
- Region labels
- Detection categories
- Confidence scores
- Clinical descriptions
- Bounding box coordinates

Example:

```text
Detection
--------------------------------
Label: Left Hip Degenerative Changes
Category: Degenerative
Confidence: 80%
Severity: Low



## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Building the user interface |
| Vite | Frontend development and build tool |
| JavaScript | Application programming language |
| Tailwind CSS | UI styling and responsive design |
| React Router DOM | Client-side routing |
| Zustand | Global state management |
| Axios | Frontend-to-backend API communication |
| Lucide React | UI icons |
| Canvas API | Medical image visualization |
| jsPDF | PDF report generation |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend REST API |
| JavaScript | Backend programming language |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| JWT | User authentication |
| HTTP-only Cookies | Secure token storage |
| Multer | Medical image upload handling |
| Cookie Parser | Cookie handling |
| CORS | Cross-origin API communication |

### AI & Cloud Services

| Technology | Purpose |
|---|---|
| Google Gemini AI | AI-based medical image analysis |
| Cloudinary | Medical image cloud storage |
| MongoDB Atlas | Cloud-hosted MongoDB database |

### Development & Deployment

| Technology | Purpose |
|---|---|
| Git | Version control |
| GitHub | Source code repository |
| npm | Package management |
| VS Code | Development environment |
| Postman | API testing |
| Vercel | Frontend deployment |
| Render | Backend deployment |

---

## 🏗️ System Design

The application follows a **client-server architecture** where the React frontend communicates with the Node.js and Express backend through REST APIs.

The backend manages authentication, patients, medical scans, AI analysis, and diagnostic reports.

```text
                         ┌──────────────────────┐
                         │        USER          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                    ┌──────────────────────────────┐
                    │       React Frontend         │
                    │                              │
                    │  React + Vite                │
                    │  Tailwind CSS                │
                    │  React Router                │
                    │  Zustand                     │
                    │  Axios                       │
                    └──────────────┬───────────────┘
                                   │
                              REST API
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │      Node.js Backend         │
                    │       Express.js             │
                    │                              │
                    │  Authentication              │
                    │  Patient Management          │
                    │  Scan Management              │
                    │  AI Analysis                 │
                    │  Report Management            │
                    └───────┬──────────┬───────────┘
                            │          │
              ┌─────────────┘          └──────────────┐
              │                                       │
              ▼                                       ▼
    ┌──────────────────┐                    ┌──────────────────┐
    │   MongoDB Atlas  │                    │    Cloudinary     │
    │                  │                    │                  │
    │ Users            │                    │ Medical Images   │
    │ Patients         │                    │ Cloud Storage    │
    │ Scans            │                    │                  │
    │ AI Analysis      │                    └──────────────────┘
    │ Reports          │
    └──────────────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │   Google Gemini AI  │
                  │                     │
                  │ Medical Image       │
                  │ Analysis             │
                  │                     │
                  │ Detected Regions    │
                  │ Confidence Scores   │
                  │ Severity             │
                  │ Bounding Boxes      │
                  └─────────────────────┘


 AI-Based-Medical-Image-Segmentation/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Topbar.jsx
│   │   │   │
│   │   │   ├── patients/
│   │   │   │   ├── PatientCard.jsx
│   │   │   │   ├── PatientForm.jsx
│   │   │   │   └── PatientList.jsx
│   │   │   │
│   │   │   ├── scans/
│   │   │   │   ├── ScanCard.jsx
│   │   │   │   ├── ScanStatus.jsx
│   │   │   │   ├── ScanUpload.jsx
│   │   │   │   └── ScanDetails.jsx
│   │   │   │
│   │   │   ├── viewer/
│   │   │   │   ├── MedicalImageViewer.jsx
│   │   │   │   ├── ViewerToolbar.jsx
│   │   │   │   ├── DetectionOverlay.jsx
│   │   │   │   ├── DetectionSidebar.jsx
│   │   │   │   └── DetectionItem.jsx
│   │   │   │
│   │   │   └── reports/
│   │   │       └── ReportCard.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Patients.jsx
│   │   │   ├── PatientDetails.jsx
│   │   │   ├── Scans.jsx
│   │   │   ├── ScanDetails.jsx
│   │   │   ├── ScanViewer.jsx
│   │   │   ├── AIAnalysis.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── CreateReport.jsx
│   │   │   ├── ReportDetails.jsx
│   │   │   └── auth/
│   │   │       ├── Login.jsx
│   │   │       └── Register.jsx
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── PublicRoute.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.service.js
│   │   │   ├── patient.service.js
│   │   │   ├── scan.service.js
│   │   │   ├── viewer.service.js
│   │   │   └── report.service.js
│   │   │
│   │   ├── stores/
│   │   │   ├── authStore.js
│   │   │   ├── patientStore.js
│   │   │   ├── scanStore.js
│   │   │   ├── viewerStore.js
│   │   │   └── reportStore.js
│   │   │
│   │   ├── utils/
│   │   │   └── imageCoordinates.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── src/
│   │   │
│   │   ├── controllers/
│   │   │   ├── user.controller.js
│   │   │   ├── patient.controller.js
│   │   │   ├── medicalScan.controller.js
│   │   │   ├── report.controller.js
│   │   │   └── dashboard.controller.js
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── patient.model.js
│   │   │   ├── medicalScan.model.js
│   │   │   ├── AIanalysis.model.js
│   │   │   ├── detectedRegion.model.js
│   │   │   └── diagnosticReport.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── user.routes.js
│   │   │   ├── patient.routes.js
│   │   │   ├── medicalScan.routes.js
│   │   │   ├── report.routes.js
│   │   │   └── dashboard.routes.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── multer.middleware.js
│   │   │   └── role.middleware.js
│   │   │
│   │   ├── db/
│   │   │   └── index.js
│   │   │
│   │   ├── services/
│   │   │   ├── gemini.service.js
│   │   │   ├── cloudinary.service.js
│   │   │   └── report.service.js
│   │   │
│   │   ├── utils/
│   │   │   ├── apiError.js
│   │   │   ├── apiResponse.js
│   │   │   └── asyncHandler.js
│   │   │
│   │   ├── app.js
│   │   ├── constant.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── screenshots/
│   ├── dashboard.png
│   ├── login.png
│   ├── register.png
│   ├── patients.png
│   ├── scans.png
│   ├── scan-viewer.png
│   ├── ai-analysis.png
│   └── report.png
│
├── README.md
└── .gitignore                 


🔌 API Endpoints
Authentication
POST   /api/v1/users/register
POST   /api/v1/users/login
POST   /api/v1/users/logout
POST   /api/v1/users/refresh-token
GET    /api/v1/users/current-user
POST   /api/v1/users/change-password
PATCH  /api/v1/users/update-account
GET    /api/v1/users/patients-profile
Patients
POST   /api/v1/patient/create-Patient
GET    /api/v1/patient/get-Doctor-Patient
GET    /api/v1/patient/:id/get-Patient
PATCH  /api/v1/patient/:id/update-Patient
DELETE /api/v1/patient/:id/delete-Patient
Medical Scans
POST   /api/v1/scans/analyze
GET    /api/v1/scans/:id
DELETE /api/v1/scans/:id
PATCH  /api/v1/scans/:regionId/verify-region
Diagnostic Reports
POST   /api/v1/report/create-report
GET    /api/v1/report/
GET    /api/v1/report/:id
PATCH  /api/v1/report/:id
DELETE /api/v1/report/:id


##  Live Links :
Frontend
https://your-frontend-url.vercel.app

Backend
https://your-backend-url.onrender.com

Backend Health Check
https://your-backend-url.onrender.com/healthcheck



👩‍💻 Author

Your Name

GitHub:
https://github.com/your-username

LinkedIn:
https://linkedin.com/in/your-profile



📜 License

This project is developed for educational purposes.


