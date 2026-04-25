# 🛒 Ecommerce Backend (Express.js + MongoDB)

This is the backend service for a 3‑tier ecommerce application. It provides REST APIs for user management, product catalog, and cart functionality.

---

## 📂 Project Structure
```
├── config
│   └── db.js
├── controllers
│   ├── productController.js
│   └── userController.js
├── models
│   ├── Cart.js
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── package.json
├── routes
│   ├── cartRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── seed.js
└── server.js
```

---

## ⚙️ Setup

1. Install dependencies:
   ```bash
   npm init -y
   npm install express mongoose cors dotenv

2. Database Connection:
   ```bash
   sudo apt install gnupg curl
   curl -fsSL https://pgp.mongodb.com/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor
   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.com/apt/ubuntu noble/mongodb-enterprise/8.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise-8.2.list
   sudo apt update
   sudo apt install mongodb-enterprise
   ```
   

3. Start server and DB:

   ```bash
   sudo systemctl start mongod
   sudo systemctl status mongod
   sudo systemctl enable mongod
   mongosh
   node seed.js 
   node server.js
   ```

---

## 🔗 API Endpoints

### 👤 User

* **Register**\
  `POST /api/users/register`\
  Body:

  ```json
  { "name": "Alice", "email": "alice@example.com", "password": "secret123" }
  ```

* **Login**\
  `POST /api/users/login`\
  Body:

  ```json
  { "email": "alice@example.com", "password": "secret123" }
  ```

---

### 📦 Products

* **List Products**\
  `GET /api/products`

* **Seed Products**\
  `POST /api/products/seed`

---

### 🛒 Cart

* **Add Item to Cart**\
  `POST /api/cart/add`\
  Body:

  ```json
  { "userId": "<ObjectId>", "productId": "<ObjectId>", "quantity": 1 }
  ```

* **Get Cart by User**\
  `GET /api/cart/:userId`

---

## 🧪 Example Curl Usage

```bash
# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Fabio","email":"fabio@example.com","password":"fabio123"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"fabio@example.com","password":"fabio123"}'

# List products
curl http://localhost:5000/api/products

# Add to cart
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"userId":"<REAL_USER_ID>","productId":"<REAL_PRODUCT_ID>","quantity":1}'

# Get cart
curl http://localhost:5000/api/cart/<REAL_USER_ID>
```

---

## 🏗️ Architecture Diagram

```text
          ┌───────────────┐
          │   Frontend    │
          │ React + Vite  │
          └───────▲───────┘
                  │
                  │ REST API calls
                  │
          ┌───────┴───────┐
          │   Backend     │
          │ Express.js     │
          └───────▲───────┘
                  │
                  │ Mongoose ODM
                  │
          ┌───────┴───────┐
          │   MongoDB     │
          │   Database    │
          └───────────────┘
```

---

