# Split App - Expense Splitter Backend

This is the backend API for the **Split App**, a simplified version of apps like **Splitwise**, that helps groups of people split expenses fairly and track who owes whom.

Built using **Node.js**, **Express.js**, and **MongoDB Atlas**.

---
### API : https://splitapp-bk0h.onrender.com
---

## Features

### Core Functionality
- **Add Expenses**: Add a new expense with description, amount, payer, and participants.
- **Track All Expenses**: View, update, and delete all expenses.
- **Auto Add People**: Anyone added in a transaction is automatically added to the group.
- **Settlement Logic**: Calculate fair balances and optimized settlements (who pays whom).
- **Error Handling**: Proper status codes and validation for all API endpoints.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (NoSQL)
- **Deployment**: Render / Railway
- **Testing**: Postman (public collection)

---
## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Create a .env File
```bash
MONGO_URL=mongodb_atlas connection string
PORT=5001
```
### 4. Run the Server
```bash
npm start
or
npm run dev
```
---
### Postman Collection : https://grey-eclipse-705978.postman.co/workspace/Postman-API-Fundamentals-Studen~c7a10f4a-2b4b-4a77-86b5-be8d2b27326a/collection/36784893-78d55ec8-eaee-4784-b05d-2d753eb6f6c3?action=share&creator=36784893
