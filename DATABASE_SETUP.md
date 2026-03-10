# Allora Boutique - Database Setup Instructions

## Prerequisites
- MySQL 8.0 or higher installed
- HeidiSQL installed (recommended) or MySQL Workbench

## Option 1: Using HeidiSQL (Recommended)

### Step 1: Connect to MySQL as Root
1. Open HeidiSQL
2. Click "New" button (bottom left)
3. Enter connection details:
   - **Network type**: MySQL (TCP/IP)
   - **Hostname/IP**: localhost
   - **User**: root
   - **Password**: (your MySQL root password)
   - **Port**: 3306
4. Click "Open"

### Step 2: Create Database and User
1. Click on "Query" tab
2. Copy and paste the following SQL commands:

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS allora_boutique 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Create user with password
CREATE USER 'allora_admin'@'localhost' IDENTIFIED BY 'allora123';

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON allora_boutique.* TO 'allora_admin'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
```

3. Click "Execute" (F9) or the blue play button
4. You should see "Query executed successfully"

### Step 3: Load Database Schema
1. Click "File" → "Load SQL file..."
2. Navigate to: `backend/database/schema.sql`
3. Click "Open"
4. The SQL will load in the query window
5. Click "Execute" (F9)
6. All tables will be created with sample data

### Step 4: Connect with New User
1. Create a new session in HeidiSQL:
   - Click "New" button
   - **Hostname/IP**: localhost
   - **User**: allora_admin
   - **Password**: allora123
   - **Port**: 3306
   - **Database**: allora_boutique
2. Click "Open"
3. You should now see the allora_boutique database with tables:
   - users
   - products
   - orders
   - order_items

## Option 2: Using Command Line

### Windows (PowerShell or CMD)

```powershell
# Connect to MySQL
mysql -u root -p

# Enter your root password when prompted
# Then run these commands:
```

```sql
CREATE DATABASE allora_boutique CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'allora_admin'@'localhost' IDENTIFIED BY 'allora123';
GRANT ALL PRIVILEGES ON allora_boutique.* TO 'allora_admin'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

```powershell
# Load the schema
mysql -u allora_admin -p allora_boutique < backend/database/schema.sql
# Enter password: allora123
```

## Verify Installation

1. Open HeidiSQL
2. Connect using:
   - **Host**: localhost
   - **Port**: 3306
   - **User**: allora_admin
   - **Password**: allora123
   - **Database**: allora_boutique

3. You should see 4 tables:
   - `users` (with 1 admin user)
   - `products` (with 8 sample products)
   - `orders` (empty)
   - `order_items` (empty)

## Connection Details for Backend

The backend is already configured with these credentials in `backend/.env`:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=allora_admin
DB_PASSWORD=allora123
DB_NAME=allora_boutique
```

## Troubleshooting

### Error: Access denied for user 'allora_admin'@'localhost'
- Make sure you created the user correctly
- Try recreating the user:
  ```sql
  DROP USER 'allora_admin'@'localhost';
  CREATE USER 'allora_admin'@'localhost' IDENTIFIED BY 'allora123';
  GRANT ALL PRIVILEGES ON allora_boutique.* TO 'allora_admin'@'localhost';
  FLUSH PRIVILEGES;
  ```

### Error: Database 'allora_boutique' doesn't exist
- Make sure you ran the CREATE DATABASE command
- Check if the database exists:
  ```sql
  SHOW DATABASES;
  ```

### Can't connect to MySQL server
- Make sure MySQL service is running
- Windows: Check Services → MySQL80
- Start it if stopped

### Port 3306 already in use
- Check if another MySQL instance is running
- Or use a different port and update `.env` file

## Sample Data

After setup, your database will include:

### Products (8 items):
1. Kavini (A Line maxi) - Pink kurti with dupatta
2. Misty mist - Black kurti set
3. Sufi - Teal kurti
4. Seige garden - Floral dress
5. Ice blue kurti - Blue embroidered kurti
6. Yellow Lily - Yellow kurti with black dupatta
7. Black Jewelry - Black kurti with details
8. Madhavi magic saree - Purple saree

### Admin User:
- Email: admin@allora.com
- Password: admin123

## Next Steps

After database setup:
1. Run the backend: `cd backend && python app.py`
2. Run the frontend: `cd frontend && npm start`
3. Visit: http://localhost:3000

The backend will automatically connect to the database on startup!
