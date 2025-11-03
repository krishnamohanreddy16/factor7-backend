# CRM Backend (Fastor / Factor7 Assignment)

## Overview
RESTful Node.js + Express backend for a simple CRM focused on lead/enquiry management.

Features:
- Employee (counselor) register & login (JWT)
- Public enquiry submission (no auth)
- Fetch public (unclaimed) enquiries
- Claim an enquiry (becomes private to the claiming counselor)
- Fetch private enquiries claimed by logged-in counselor

## Setup (local, using VSCode)

1. Copy `.env.example` to `.env` and update values (especially `JWT_SECRET`).
   ```
   cp .env.example .env
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run in development:
   ```
   npm run dev
   ```
   or production:
   ```
   npm start
   ```

The server will create / use SQLite DB file at the path specified in `.env` (default `./crm_db.sqlite`).

## APIs (examples)
- Register: `POST /api/employees/register`  
  Body: `{ "name":"Alice", "email":"a@x.com", "password":"pass123" }`
- Login: `POST /api/employees/login`  
  Body: `{ "email":"a@x.com", "password":"pass123" }`  
  Response includes `{ token }`
- Public submit: `POST /api/enquiries/public`  
  Body: `{ "name":"Bob","email":"b@x.com","courseInterest":"Mern" }`
- Get public (unclaimed): `GET /api/enquiries/public`
- Claim lead: `PATCH /api/enquiries/:id/claim` (Auth: `Authorization: Bearer <token>`)
- Get private (claimed by you): `GET /api/enquiries/private` (Auth)

## Notes
- JWT token expires in 1 hour (change in `controllers/employeeController.js`).
- This project uses Sequelize ORM with SQLite for simplicity.
