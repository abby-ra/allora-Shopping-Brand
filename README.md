# Allora Boutique - Shopping Website

A modern e-commerce platform for Allora Boutique featuring AI-powered product recommendations using CLIP image embeddings.

## Features

- 🛍️ **Modern E-commerce Interface**: Beautiful product listings and detail pages
- 🤖 **AI-Powered Recommendations**: CLIP model for intelligent similar product suggestions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Clean UI**: Inspired by modern boutique websites
- 🔐 **User Management**: Customer accounts and order tracking
- 📦 **Inventory Management**: Product catalog with detailed information

## Tech Stack

### Frontend
- **React** 18.2.0
- **React Router** for navigation
- **Axios** for API calls
- **React Icons** for UI elements

### Backend
- **Flask** 3.0.0 (Python web framework)
- **CLIP** (OpenAI's image embedding model)
- **PyTorch** for ML operations
- **SQLAlchemy** for database ORM
- **MySQL** (via PyMySQL) for data storage

### AI/ML
- **CLIP (ViT-B/32)**: Vision-language model for image understanding
- **Sentence Transformers**: For computing similarity scores
- **scikit-learn**: For cosine similarity calculations


<<<<<<< HEAD
```
allora shopping brand/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.js          # Main app component
│   └── package.json
│
├── backend/                 # Flask API server
│   ├── routes/             # API route handlers
│   ├── services/           # Business logic (CLIP service)
│   ├── database/           # Database schema
│   ├── models.py           # Database models
│   ├── app.py              # Main application
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Environment variables
│
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- MySQL 8.0 or higher
- HeidiSQL (for database management)

### Database Setup

1. **Install MySQL** if not already installed

2. **Connect to MySQL using HeidiSQL**:
   - Host: `localhost`
   - Port: `3306`
   - Username: `your_db_user` (you choose this)
   - Password: `your_secure_password` (you choose this)
   - Database: `allora_boutique`

3. **Create the database and user**:
   ```sql
   CREATE DATABASE allora_boutique;
CREATE USER 'your_db_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON allora_boutique.* TO 'your_db_user'@'localhost';
FLUSH PRIVILEGES;
```

**⚠️ Security Note:** Replace `your_db_user` and `your_secure_password` with your own secure values!
   - Open HeidiSQL
   - Connect to your MySQL server
   - Load and execute: `backend/database/schema.sql`

### Backend Setup

1. **Navigate to backend directory**:
   ```powershell
   cd "d:\Project\allora shopping brand\backend"
   ```

2. **Create virtual environment**:
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   - Copy `.env.example` to `.env` and edit with YOUR database credentials:
     - DB_HOST=localhost
     - DB_PORT=3306
     - DB_USER=your_db_user
     - DB_PASSWORD=your_secure_password
     - DB_NAME=allora_boutique

5. **Run the Flask server**:
   ```powershell
   python app.py
   ```
   
   The server will start on http://localhost:5000

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory**:
   ```powershell
   cd "d:\Project\allora shopping brand\frontend"
   ```

2. **Install dependencies**:
   ```powershell
   npm install
   ```

3. **Start the development server**:
   ```powershell
   npm start
   ```
   
   The app will open at http://localhost:3000

## Database Credentials

Use your database credentials to connect with HeidiSQL:

- **Host**: `localhost`
- **Port**: `3306`
- **Username**: Your database user (from setup)
- **Password**: Your database password (from setup)
- **Database**: `allora_boutique`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/:id/similar` - Get AI-powered similar products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `GET /api/users/:id/orders` - Get user orders

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
=======
>>>>>>> 4ed5e1f13f33de050d3c0a0e210062c383785206

## How AI Recommendations Work

The system uses OpenAI's CLIP (Contrastive Language-Image Pre-training) model:

1. **Image Embedding**: When a product is added, CLIP generates a 512-dimensional vector representing the image
2. **Storage**: The embedding is stored in the database alongside product data
3. **Similarity Search**: When viewing a product, the system:
   - Retrieves the product's embedding
   - Compares it with all other product embeddings using cosine similarity
   - Returns the top 4 most similar products
4. **Display**: Similar products are shown on the product detail page

## Adding Products with AI

To add products with automatic similar product detection:

## Future Enhancements

- [ ] Shopping cart functionality
- [ ] Payment gateway integration
- [ ] Order management dashboard
- [ ] Image upload functionality
- [ ] Search with filters
- [ ] Customer reviews and ratings
- [ ] Email notifications
- [ ] Admin panel for inventory management

## License

Private project for Allora Boutique

## Support

For any issues or questions, contact the development team.
