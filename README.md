# Medical Camp Management System (MCMS)


## Project Purpose

The **Medical Camp Management System (MCMS)** is a **MERN stack** web application designed to help organizers and participants efficiently manage and coordinate medical camps. The system allows **organizers** to create, manage, and track camp registrations, while **participants** can browse, register, and provide feedback. 

It includes **secure JWT authentication**, **payment integration**, **dashboard features**, and **an intuitive user experience**, and is **fully responsive** to ensure accessibility across all devices.


## 📋 Organizers Information:
- **Password:** [adMin76#]
- **Email:** [admin76@gmail.com]


## 🌍 Live Demo & Repository

### 🚀 Live URL
   - Netlify: [MediCamp ](https://tranquil-melomakarona-3d0816.netlify.app/)

   - Firebase: [Live Link 1](https://medical-camp-35f0f.web.app/) OR [Live Link 2](https://medical-camp-35f0f.firebaseapp.com/)

🔗 GitHub Repository: [GitHub Link](https://github.com/Soraiya11-7/MediCamp-client)

---
---
## 📖 Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Admin/Organizer Dashboard](#-adminorganizer-dashboard-private-route)
- [Participant Dashboard](#-participant-dashboard-private-route)
- [Usage](#usage)

---
---

## ✨ Features
- **User Authentication** – Secure login & registration using Firebase and JWT.  
- **Camp Registration** – Users can register for medical camps with payment integration.  
- **Feedback System** – Participants can leave reviews and ratings for camps.  
- **Search & Filters** – Advanced search, sorting, and filtering for easy camp discovery.  
- **Pagination Support** – Camps and participants are displayed with paginated views.  
- **Interactive UI** – Fully responsive design built with Tailwind CSS.  
- **Admin/Organizer Dashboard** – Organizers can manage camps, payments, and users.  
- **Participant Dashboard** – Attendees can track registrations, payments, and feedback.  
- **Payment Integration** – Secure online payments via Stripe.  
- **Notifications** – Real-time alerts via React Toastify & SweetAlert2.  
- **Data Visualization** – Dashboards with analytics and charts (Recharts).  

---
---


## 🛠 Technology Stack

| Category            | Technology / Library |
|---------------------|---------------------|
| **Frontend**       | React, React Router DOM, React Hook Form |
| **Backend**        | Node.js, Express.js |
| **Database**       | MongoDB |
| **Authentication** | Firebase, JWT |
| **State Management** | React Query |
| **UI Components**  | Material Tailwind, DaisyUI, Tailwind CSS |
| **Animations**     | Framer Motion, AOS |
| **Forms & Validation** | React Hook Form, React Simple Captcha |
| **Charts & Data Visualization** | Recharts |
| **Payment Integration** | Stripe |
| **Notifications**  | React Toastify, SweetAlert2 |
| **Performance**    | React Lazy Load, React Loading Skeleton |
| **Build Tool**     | Vite |
| **Linting & Formatting** | ESLint, Prettier |

---
---

## 🛠 Installation

### Prerequisites
Before installing and running the project, ensure you have the following installed:
- **Node.js** (v16 or later) – [Download](https://nodejs.org/)
- **NPM** or **Yarn** – Comes with Node.js installation
- **MongoDB Database** 
- **Firebase Account** – For authentication and storage
- **Stripe Account** – For payment processing


### Steps
1. **Clone the repository**

```sh
# Clone the repository
git clone https://github.com/Soraiya11-7/MediCamp-client.git

# Navigate to the project directory
cd medical-camp-management
```
2. **Install dependencies**

```sh
npm install
```
3. **Set up environment variables** (see `.env.local.example` below)

4. **Run the development server**

```sh
npm run dev
```

---
---

## ⚙️ Configuration (.env.local)

📌 **Create a `.env.local` file** in the root of the project and add the following:

```env
# Firebase Configuration
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

# Image Hosting API Key
VITE_IMAGE_HOSTING_KEY=your_image_hosting_key

# Stripe Payment Gateway
VITE_Payment_Gateway_PK=your_stripe_payment_public_key
```
🔹 Replace `your_value_here` with your actual credentials.

🚨 Important: Never expose your .env.local file in public repositories. Use .gitignore to keep it secure.

---
---
## 📊 Admin/Organizer Dashboard 
The **Organizer Dashboard** provides a structured interface for managing medical camps. It includes:

- **Organizer Profile** – Edit profile details like name, image, and contact info.  
- **Add A Camp** – Create camps with essential details, ensuring proper validation.  
- **Manage Camps** – View, update, or delete created camps in a structured table.  
- **Manage Registered Camps** – Track participant registrations, payment status, and cancellations  
- **Manage Registered Camps** – Track participant registrations, payment status, cancellations, and confirm enrollments.


---

## 👥 Participant Dashboard 
The **Participant Dashboard** offers a personalized experience for camp attendees:

- **Analytics** – Visual charts displaying registered camp statistics.  
- **Participant Profile** – Update personal information easily.  
- **Registered Camps** – View enrolled camps, payment status, feedback, and cancellations.  
- **Payment History** – Track transaction details for past and current camp payments.  

---
---


## 🎯 Usage

✔ **Admins** can create and manage medical camps through the **Admin Dashboard**.  

✔ **Participants** can register for camps and track their details in the **User Dashboard**.  

✔ **Payments** are securely processed via **Stripe**.  

✔ **Admins & Organizers** can monitor user activity, payments, and feedback. 

--- 

 🚀Efficiently manage medical camps with **MCMS**! 🏥💉🚑












