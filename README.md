# project-bookly

Bookly
Bookly is a web application that allows users to save items, make payments, and manage their accounts. It integrates Google OAuth for authentication and Flutterwave for secure payment processing.

Features
User Authentication:

Google OAuth login using Passport.js.
Custom login with email and password.
Payment Integration:

Flutterwave payment gateway for card and bank transfer payments.
Payment link generation for saved items.
User Management:

Save and view items.
Pagination for item listings.
Admin Features:

Role-based access control (RBAC) for managing admin privileges.
Technologies Used
Backend:

Node.js
Express.js
MongoDB (Mongoose)
Passport.js (Google OAuth)
Flutterwave API
Frontend:

HTML, CSS (with EJS for templating)
Other Tools:

Axios
dotenv
bcrypt.js
Cloudinary (for image uploads)
Installation
Clone the repository:

git clone https://github.com/your-username/project-bookly.git
cd project-bookly

Install dependencies:

npm install

Set up environment variables: Create a .env file in the root directory and add the following:

Start the server:

Open your browser and navigate to:

API Endpoints
Authentication
GET /auth/google - Initiates Google OAuth login.
GET /auth/google/callback - Callback URL for Google OAuth.
User
POST /api/v1/user/login - Custom user login.
POST /api/v1/user/makePayment - Generate a payment link for saved items.
GET /api/v1/user/viewItems - View saved items with pagination.
Admin
POST /api/v1/admin/invite - Invite a new admin.
POST /api/v1/admin/login - Admin login.
Folder Structure
project-bookly/
├── controllers/         # Application logic (e.g., user, admin, payment)
├── models/              # Mongoose models (e.g., User, Admin, Transaction)
├── routers/             # Route definitions
├── views/               # Frontend templates (EJS files)
├── public/              # Static files (CSS, images, etc.)
├── passport.setup.js    # Passport.js configuration
├── flutterwave.js       # Flutterwave integration
├── index.js             # Main application entry point
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation

Usage
Google OAuth Login
Navigate to /auth/google.
Log in with your Google account.
After successful login, you'll be redirected to the dashboard.
Custom Login
Use the login form on the homepage.
Enter your email and password to log in.
Payments
Save items to your account.
Use the "Make Payment" feature to generate a payment link.
Complete the payment via Flutterwave.
Contributing
Fork the repository.
Create a new branch:
Commit your changes:
Push to the branch:
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For questions or support, please contact:

Email: support@bookly.com
GitHub: your-username
This README.md provides a comprehensive overview of your project and is ready to be included in your repository.