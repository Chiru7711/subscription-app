# Subscription Management API

A Node.js API for managing user subscriptions with referral system capabilities.

## Features

- User management (Create users with phone, email, name)
- Subscription packages (Silver, Gold, Platinum, Diamond)
- Automatic 6-month subscription expiration
- Referral system with unique referral codes
- MongoDB database integration
- RESTful API endpoints

## Prerequisites

- Node.js v18+
- MongoDB installed locally
- Postman (for API testing)
- npm

## Installation

1. Clone repository:
```bash
git clone [https://github.com/Chiru7711/subscription-app]
cd subscription-app

## API Endpoints
----------------------
    Users
----------------------
Method	Endpoint	        Description
POST	/api/users	        Create new user
GET	    /api/users	        Get all users
GET	    /api/users/:userId	Get single user by ID

---------------------------
    Subscriptions
--------------------------- 
Method	Endpoint	        Description
POST	/api/subscriptions	Create new subscription
GET	    /api/subscriptions	Get all subscriptions