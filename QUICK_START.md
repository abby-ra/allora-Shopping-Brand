# 🚀 Allora Boutique - Quick Reference

## ⚡ Fastest Way to Start

### Step 1: Setup Database (One-time only)
1. Install MySQL and HeidiSQL
2. Open HeidiSQL, connect as root
3. Run this SQL:
```sql
CREATE DATABASE allora_boutique;
CREATE USER 'allora_admin'@'localhost' IDENTIFIED BY 'allora123';
GRANT ALL PRIVILEGES ON allora_boutique.* TO 'allora_admin'@'localhost';
FLUSH PRIVILEGES;
```
4. Load file: `backend/database/schema.sql`

### Step 2: Run Everything
Double-click: **`START_ALL.bat`** in the project root folder

That's it! 🎉

---

## 📋 Database Credentials (For HeidiSQL)

```
Host:     localhost
Port:     3306
Username: allora_admin
Password: allora123
Database: allora_boutique
```

Copy these into HeidiSQL to manage your database!

---

## 🌐 Access URLs

| Service | URL |
|---------|-----|
| **Website** | http://localhost:3000 |
| **API** | http://localhost:5000 |
| **Health Check** | http://localhost:5000/api/health |

---

## 📦 What's Included

✅ **Frontend**: Modern React website with product listings
✅ **Backend**: Flask API with CLIP AI model
✅ **Database**: MySQL with 8 sample products
✅ **AI Features**: Automatic similar product recommendations
✅ **Responsive Design**: Works on desktop and mobile

---

## 🎯 Key Features

### For Customers:
- Browse products by category
- View detailed product information
- See AI-powered similar product recommendations
- Mobile-friendly interface

### For You (Admin):
- Add products via HeidiSQL or API
- AI automatically finds similar products
- Track inventory and orders
- Manage customer data

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `START_ALL.bat` | Start both servers with one click |
| `DATABASE_SETUP.md` | Detailed database setup guide |
| `SETUP_GUIDE.md` | Complete installation instructions |
| `backend/.env` | Database credentials (already configured) |
| `backend/database/schema.sql` | Database structure + sample data |

---

## 🛠️ Manual Start (If needed)

### Backend:
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend:
```powershell
cd frontend
npm install
npm start
```

---

## 🤖 How AI Works

1. **Upload Image** → CLIP generates 512-dimensional vector
2. **Store in DB** → Embedding saved with product
3. **Find Similar** → Compares vectors using cosine similarity
4. **Display** → Shows top 4 similar products automatically

---

## ➕ Adding Products

### Via HeidiSQL (Simple):
1. Open `products` table
2. Click "Insert row"
3. Fill in: name, price, category, stock, etc.
4. Save

### Via API (With AI):
```bash
POST http://localhost:5000/api/products
{
  "name": "Beautiful Dress",
  "price": 1299,
  "category": "Dress",
  "image_path": "path/to/image.jpg",
  "stock": 10
}
```

---

## 🎨 Customization

### Change Colors:
Edit `frontend/src/index.css`:
```css
:root {
  --primary-color: #a8d5ba;  /* Change this */
  --accent-color: #ff6b9d;   /* And this */
}
```

### Add Images:
1. Put images in: `frontend/public/images/`
2. Update product `image_url` in database
3. For AI: provide local `image_path` when creating product

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't connect to database | Check MySQL is running + verify credentials |
| Port 3000 in use | Stop other React apps or change port |
| Port 5000 in use | Stop other Flask apps |
| No products showing | Check backend is running + database has data |
| AI not working | First run downloads model (~500MB), be patient |

---

## 📊 Sample Data Included

8 Products pre-loaded:
- Kavini (A Line maxi) - Rs. 1,300
- Misty mist - Rs. 1,499
- Sufi - Rs. 799
- Seige garden - Rs. 999
- Ice blue kurti - Rs. 999
- Yellow Lily - Rs. 1,299
- Black Jewelry - Rs. 1,829
- Madhavi magic saree - Rs. 1,599

Default admin account:
- Email: admin@allora.com
- Password: admin123

---

## 📞 Need More Help?

- **Full Setup**: Read `SETUP_GUIDE.md`
- **Database Help**: Read `DATABASE_SETUP.md`
- **Tech Details**: Read `README.md`

---

## ✨ Current Status

✅ React Frontend - Complete
✅ Flask Backend - Complete
✅ CLIP AI Model - Integrated
✅ MySQL Database - Schema Ready
✅ Sample Data - 8 Products Loaded
✅ Responsive Design - Mobile Ready

### Ready for Future:
- Shopping cart
- Payment integration
- Order management
- User authentication
- Admin dashboard
- Image uploads
- Email notifications

---

**Happy Selling! 🛍️**
