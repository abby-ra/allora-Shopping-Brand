# Allora Boutique - E-commerce Platform

A modern boutique e-commerce website with AI-powered product recommendations using CLIP image embeddings.

## 🚀 Features

- Modern React frontend with responsive design
- Flask REST API backend
- AI-powered similar product recommendations using CLIP
- MySQL database for data persistence
- Product catalog with categories and filters
- User management and order tracking

## 🛠️ Tech Stack

**Frontend:** React, React Router, Axios  
**Backend:** Flask, PyTorch, CLIP, SQLAlchemy  
**Database:** MySQL  
**AI/ML:** OpenAI CLIP (Vision-Language Model)

## 📋 Prerequisites

- Node.js 16+
- Python 3.8+
- MySQL 8.0+
- HeidiSQL (optional, for database management)

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/abby-ra/allora-Shopping-Brand.git
cd allora-Shopping-Brand
```

### 2. Setup Database
- Install MySQL and create database
- See `DATABASE_SETUP.md` for detailed instructions

### 3. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt

# Copy and configure environment variables
copy .env.example .env
# Edit .env with your database credentials

python app.py
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🌐 Access

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 📚 Documentation

- `SETUP_GUIDE.md` - Complete setup instructions
- `DATABASE_SETUP.md` - Database configuration guide
- `QUICK_START.md` - Quick reference guide

## 🤖 AI Features

The platform uses OpenAI's CLIP model for intelligent product recommendations:
- Automatic image embedding generation
- Similarity-based product suggestions
- Visual search capabilities

## 📦 Project Structure

```
├── frontend/          # React application
├── backend/           # Flask API + AI services
├── DATABASE_SETUP.md  # Database guide
└── README.md         # This file
```

## 🔐 Security Note

Never commit `.env` files or expose database credentials. Use `.env.example` as a template.

## 📄 License

Private project for Allora Boutique

## 👤 Author

Created for Allora Boutique - Fashion E-commerce Platform
