# Amazon Clone - Backend & Frontend Integration Guide

This document summarizes the architecture of the custom MVP backend built for the Amazon Clone and provides a clear integration path for the Next.js frontend team.

---

## 1. What Was Built

We built a **Node.js + Express** backend using **Prisma ORM** connecting to a fully hosted **Supabase PostgreSQL** instance.

### Key Backend Features Completed:
*   **Database Schema**: Designed complete E-Commerce relations including `User`, `Product`, `Category`, `Order`, `Cart`, `Address`, and `Review`.
*   **Auth Middleware**: Secure token interception that strictly validates Supabase JWTs.
*   **Transactions**: Safe inventory limits mapped out so users cannot buy more stock than what exists. Cart checkouts execute inside guaranteed Prisma transactions.
*   **Seed Data**: Pre-populated database with dummy electronics, fashion, and books ready for direct query rendering.
*   **Error Handling**: Formatted, secure, and clean JSON errors.

---

## 2. API Contract Fundamentals

**Base URL:** `http://localhost:5000/api`
*(When deployed to production, swap `http://localhost:5000` with your respective App Platform or Vercel URL)*

### Request Format
All write requests (`POST`, `PUT`, `PATCH`) must send `"Content-Type": "application/json"`.

### Response Format
Responses adhere to a strict structured JSON envelope so your React code never breaks parsing unknown shapes:

**Success Response:**
```json
{
  "success": true,
  "data": { ... } // Could be an object or array
}
```

**Pagination Response (`GET /api/products`):**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Insufficient stock for iPhone 15 Pro"
}
```

---

## 3. How Authentication Works

We rely entirely on **Supabase Auth** to manage user identities without dealing with raw passwords on this API. 

### What the Frontend Team Needs to Do:
1.  **Login/Signup users via the `@supabase/supabase-js` package** in your Next.js app natively.
2.  Once logged in, grab the user's active session token string (JWT).
3.  Inject this token into the `Authorization` header when calling our custom backend routes.

**Example Next.js API Call using standard `fetch`:**
```javascript
const response = await fetch("http://localhost:5000/api/cart", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${session.access_token}` // Extracted from Supabase
  }
});
const result = await response.json();
```

---

## 4. Frontend Page Mapping

Below is a cheat sheet summarizing which APIs to consume for which frontend page mockups:

### 🏠 Home Page
*   **Feature:** Global product view, categories.
*   **Endpoint:** `GET /api/products?limit=10&sort=newest`
*   **Endpoint:** `GET /api/categories`

### 🔍 Product Grid / Search Page
*   **Feature:** Live pagination, filtering, searching logic.
*   **Endpoint:** `GET /api/products?page=2&category=electronics&search=iphone`
*   **Endpoint:** `GET /api/products?sort=price_low`

### 🛒 Product Detail View
*   **Feature:** Single product specifics, reviews.
*   **Endpoint:** `GET /api/products/:slug` (Fetches product details & its images)
*   **Endpoint:** `GET /api/reviews/product/:productId`

### 🎒 Shopping Cart View
*   **Auth Required:** ✅ Yes
*   **Read Cart:** `GET /api/cart`
*   **Add Item:** `POST /api/cart/add` (`{ productId, quantity }`)
*   **Update Quantity:** `PUT /api/cart/items/:itemId` (`{ quantity }`)
*   **Remove Item:** `DELETE /api/cart/items/:itemId`

### 💳 Checkout View
*   **Auth Required:** ✅ Yes
*   **Fetch Addresses:** `GET /api/users/addresses`
*   **Add Address:** `POST /api/users/addresses` (`{ street, city, postalCode, country }`)
*   **Submit Final Order:** `POST /api/orders` (`{ addressId }`). *Note: This automatically grabs the current user's cart, deducts product stock, generates an Order profile, and empties the cart.*

### 📦 User Profile / My Orders
*   **Auth Required:** ✅ Yes
*   **Get User Info:** `GET /api/users/profile`
*   **List Past Orders:** `GET /api/orders/my-orders`
*   **View Single Order Invoice:** `GET /api/orders/:orderId`

---

## 5. Summary Notes & Next Steps

*   **Mock Checkout Only**: The `POST /api/orders` endpoint currently bypasses Stripe/payment gateway requirements for fast MVP progress. It successfully logs it as "PROCESSING".
*   **Admin Tools**: Any endpoint wrapped in an Admin verification (like creating new categories) will drop a `403 Forbidden` unless the Supabase Auth user has their `role` column set to `ADMIN` in the database.
