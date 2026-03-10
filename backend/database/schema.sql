-- Allora Boutique Database Schema
-- This script creates the database and all necessary tables

CREATE DATABASE IF NOT EXISTS allora_boutique 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE allora_boutique;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    category VARCHAR(100),
    fabric VARCHAR(100),
    color VARCHAR(50),
    style VARCHAR(100),
    stock INT DEFAULT 0,
    image_url VARCHAR(500),
    image_embedding TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_sale BOOLEAN DEFAULT FALSE,
    lining BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_is_featured (is_featured),
    INDEX idx_is_bestseller (is_bestseller)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    shipping_address TEXT,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_order_number (order_number),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    size VARCHAR(10),
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample Data for Products
INSERT INTO products (name, description, price, original_price, category, fabric, color, style, stock, is_featured, is_bestseller, is_sale) VALUES
('Kavini (A Line maxi)', 'Beautiful cotton A-line maxi with dupatta', 1300.00, 1999.00, 'Kurti-Dupatta', 'cotton', 'Pink', 'kurti+Dupatta', 10, TRUE, FALSE, TRUE),
('Misty mist', 'Elegant black kurti with printed dupatta', 1499.00, 2499.00, 'Kurti-Dupatta', 'cotton', 'Black', 'kurti+Dupatta', 8, TRUE, TRUE, TRUE),
('Sufi', 'Stunning teal green kurti set', 799.00, 1099.00, 'Kurti-Dupatta', 'cotton', 'Teal', 'kurti+Dupatta', 15, FALSE, TRUE, TRUE),
('Seige garden', 'Floral printed dress with beautiful patterns', 999.00, 1399.00, 'Dress', 'cotton', 'Multicolor', 'Dress', 12, FALSE, TRUE, TRUE),
('Ice blue kurti', 'Light blue embroidered kurti', 999.00, 1799.00, 'Kurti', 'cotton', 'Blue', 'Kurti', 20, FALSE, TRUE, TRUE),
('Yellow Lily', 'Bright yellow kurti with black dupatta', 1299.00, NULL, 'Kurti-Dupatta', 'cotton', 'Yellow', 'kurti+Dupatta', 7, FALSE, TRUE, FALSE),
('Black Jewelry', 'Elegant black kurti with intricate details', 1829.00, 2499.00, 'Kurti-Dupatta', 'cotton', 'Black', 'kurti+Dupatta', 5, FALSE, TRUE, TRUE),
('Madhavi magic saree', 'Traditional saree with modern touch', 1599.00, NULL, 'Saree', 'silk', 'Purple', 'Saree', 6, FALSE, FALSE, FALSE);

-- Create admin user (password: admin123)
INSERT INTO users (email, password_hash, first_name, last_name, phone) VALUES
('admin@allora.com', 'scrypt:32768:8:1$VvZ3XM8YqGg4Ri9Q$4a8e3f1d9c6b2a7e5f8d3c9a1b4e7f2d5c8a3b6f9e2d5c8a7b4e1f8d3c9a6b2e5f8d1c4a7b3e6f9d2c5a8b1e4f7d0', 'Admin', 'User', '+91 9876543210');
