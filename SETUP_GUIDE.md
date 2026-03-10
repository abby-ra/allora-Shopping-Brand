# Allora Boutique - Setup Guide

## Quick Start Guide

Follow these steps to get your Allora Boutique website up and running:

### Step 1: Install MySQL Database

1. Download and install MySQL from: https://dev.mysql.com/downloads/installer/
2. During installation, set root password (remember this)
3. Install HeidiSQL from: https://www.heidisql.com/download.php

### Step 2: Create Database

1. Open HeidiSQL
2. Click "New" to create a new session
3. Enter connection details:
   - Network type: MySQL (TCP/IP)
   - Hostname/IP: localhost
   - User: root
   - Password: (your root password)
   - Port: 3306
4. Click "Open"
5. In the query tab, run these commands:

```sql
CREATE DATABASE allora_boutique;
CREATE USER 'allora_admin'@'localhost' IDENTIFIED BY 'allora123';
GRANT ALL PRIVILEGES ON allora_boutique.* TO 'allora_admin'@'localhost';
FLUSH PRIVILEGES;
```

6. Now connect with the new user:
   - Create new session in HeidiSQL
   - User: allora_admin
   - Password: allora123
   - Database: allora_boutique

7. Load and execute: `backend/database/schema.sql`

### Step 3: Setup Backend

Open PowerShell and run:

```powershell
# Navigate to backend
cd "d:\Project\allora shopping brand\backend"

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

**Expected Output:**
- Loading CLIP model...
- Database tables created successfully!
- Database Connection Details will be displayed
- Server running on http://0.0.0.0:5000

### Step 4: Setup Frontend

Open a NEW PowerShell window and run:

```powershell
# Navigate to frontend
cd "d:\Project\allora shopping brand\frontend"

# Install dependencies
npm install

# Start the app
npm start
```

Your browser will automatically open to http://localhost:3000

### Step 5: Access Everything

- **Website**: http://localhost:3000
- **API**: http://localhost:5000
- **Database**: Use HeidiSQL with credentials below

## Database Access Details

### For HeidiSQL Connection:
- **Host**: localhost
- **Port**: 3306
- **Username**: allora_admin
- **Password**: allora123
- **Database**: allora_boutique

### Pre-loaded Data

The database comes with 8 sample products:
1. Kavini (A Line maxi) - Rs. 1,300
2. Misty mist - Rs. 1,499
3. Sufi - Rs. 799
4. Seige garden - Rs. 999
5. Ice blue kurti - Rs. 999
6. Yellow Lily - Rs. 1,299
7. Black Jewelry - Rs. 1,829
8. Madhavi magic saree - Rs. 1,599

## Adding Your Own Products

### Method 1: Using HeidiSQL (Manual)

1. Open HeidiSQL and connect to allora_boutique
2. Open the 'products' table
3. Click "Insert row" and fill in the details:
   - name: Product name
   - description: Product description
   - price: Selling price
   - original_price: Original price (for discount display)
   - category: e.g., "Kurti-Dupatta", "Saree", "Dress"
   - fabric: e.g., "cotton", "silk"
   - color: Product color
   - stock: Quantity available
   - is_featured: 1 for featured, 0 for normal
   - is_bestseller: 1 for bestseller, 0 for normal
   - is_sale: 1 if on sale, 0 if not

### Method 2: Using API (With AI Embeddings)

Use Postman or any API client:

```bash
POST http://localhost:5000/api/products
Content-Type: application/json

{
  "name": "Beautiful Kurti",
  "description": "Elegant cotton kurti with dupatta",
  "price": 1299.00,
  "original_price": 1999.00,
  "category": "Kurti-Dupatta",
  "fabric": "cotton",
  "color": "Pink",
  "stock": 10,
  "image_url": "/images/kurti.jpg",
  "image_path": "path/to/local/image.jpg",
  "is_featured": true,
  "is_bestseller": false,
  "is_sale": true
}
```

Note: `image_path` is used to generate AI embeddings, `image_url` is for display.

## Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check credentials in `backend/.env`
- Ensure allora_admin user has proper privileges

### CLIP Model Loading Error
- First run takes longer (downloading model ~500MB)
- Check internet connection
- Ensure adequate disk space

### Port Already in Use
- Frontend (3000): Stop other React apps
- Backend (5000): Stop other Flask apps
- Or change ports in code

### Module Not Found Error
- Ensure virtual environment is activated: `.\venv\Scripts\activate`
- Reinstall dependencies: `pip install -r requirements.txt`

## Default Admin Account

- **Email**: admin@allora.com
- **Password**: admin123

(Note: Full authentication system is not yet implemented)

## Next Steps

1. Add your product images to `frontend/public/images/`
2. Update product image URLs in database
3. Customize colors in `frontend/src/index.css`
4. Add your store information in Footer component
5. Update Instagram links and content

## Need Help?

Check the main README.md for detailed API documentation and architecture details.
