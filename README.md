#  Nthabi Black – Restaurant Mobile Application

##  Project Description
This project is a **Restaurant Mobile Application** developed using **React Native with Expo** as part of **Task 5**.  
The application allows users to browse food items, customise orders, manage a shopping cart, complete checkout, update their profile, and includes an **Admin Food Management (CRUD)** feature.

The project demonstrates mobile application development concepts such as navigation, state management, authentication logic, and CRUD operations.

---

##  Objectives
- Develop a functional restaurant mobile app using React Native
- Implement user authentication logic
- Allow users to place food orders
- Provide profile and payment detail management
- Implement admin food management (CRUD)
- Apply proper UI/UX principles

---

##  Technologies Used
- React Native
- Expo
- TypeScript (.tsx)
- React Navigation
- Context API
- Expo Vector Icons

---

## Application Features

### User Features
- User login and logout
- Food browsing
- Food customisation (quantity & options)
- Add to cart
- Checkout (restricted to logged-in users)
- Order success confirmation
- Profile update (name, contact details)
- Payment details management

### Cart & Checkout
- View cart items
- Automatic total calculation
- Checkout validation

### Admin Features
- Add food items
- Edit food items
- Delete food items
- View food list (CRUD operations)

---

## 🧭 Navigation
- Home
- Login / Register
- Menu
- Food Details
- Cart
- Checkout
- Order Success
- Account
- Account Settings
- Payment Methods
- Admin Food Management



## Authentication
- Authentication state is managed using Context API
- Users must be logged in to proceed to checkout
- Logout resets navigation state

---

## 💳 Payment
- Stripe CardField UI is used
- Payment is simulated for academic purposes
- No real transactions are processed
- Test card: `4242 4242 4242 4242`

---

##  How to Run the Project

### Install Dependencies
```bash
npm install

### Run
```bash
npx Expo start
