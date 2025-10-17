# Triora - E-Commerce Platform

Triora is a modern e-commerce website that sells skincare products, gaming accessories, and digital eBooks. It has a complete system for users, sellers, and admins to manage everything.

## What This Project Does

Triora lets people:
- **Shop for products**: Buy skincare items, gaming gear, and eBooks
- **Sign up and sign in**: Create accounts as regular users, sellers, or admins
- **Chat with AI**: Get help from an AI assistant powered by Google Gemini
- **Make payments**: Pay with cards, mobile money, or crypto through Flutterwave and MetaMask
- **Manage accounts**: Users can view profiles, payment history, and dashboards
- **Contact support**: Send messages through a contact form
- **Browse categories**: Explore different product types with special deals

## Technologies Used

### Frontend (What Users See)
- **React**: Main framework for building the website
- **Vite**: Tool that makes the website load fast during development
- **Tailwind CSS**: Makes the website look beautiful and responsive
- **React Router**: Handles navigation between pages
- **Redux**: Manages application state
- **Google OAuth**: Sign in with Google accounts
- **Flutterwave**: Payment processing for cards and mobile money
- **MetaMask**: Crypto payments

### Backend (Server Side)
- **Node.js**: JavaScript runtime for the server
- **Express.js**: Framework for building the API
- **MongoDB**: Database to store user data, products, and orders
- **Mongoose**: Helps work with MongoDB
- **JWT**: Secure authentication tokens
- **bcrypt**: Password encryption
- **Google Gemini AI**: Powers the chat assistant
- **Nodemailer & Resend**: Sends emails
- **CORS**: Allows frontend to talk to backend

## Project Structure

```
triora/
├── index.js                    # Main server file
├── package.json               # Backend dependencies
├── test-gemini.js            # AI testing script
├── models/                   # Database models
│   ├── user.model.js        # User data structure
│   ├── seller.model.js      # Seller data structure
│   ├── admin.model.js       # Admin data structure
├── controllers/             # Business logic
│   ├── user.controller.js   # User operations
│   ├── seller.controller.js # Seller operations
│   ├── admin.controller.js  # Admin operations
│   ├── payment.controller.js # Payment handling
│   └── contact.controller.js # Contact form
├── routes/                  # API endpoints
│   ├── user.route.js        # User routes
│   ├── seller.route.js      # Seller routes
│   ├── admin.route.js       # Admin routes
│   ├── payment.route.js     # Payment routes
│   └── contact.route.js     # Contact routes
├── views/                   # EJS templates (for some pages)
├── src/                     # Frontend React app
│   ├── App.jsx              # Main React component
│   ├── main.jsx             # App entry point
│   ├── index.css            # Global styles
│   ├── Components/          # Reusable components
│   │   ├── Navbar.jsx       # Top navigation
│   │   ├── ChatAI.jsx       # AI chat widget
│   │   ├── TrioraHero.jsx   # Homepage hero section
│   │   ├── Categories.jsx   # Product categories
│   │   ├── ProtectedRoute.jsx # Login protection
│   │   └── Footer.jsx       # Website footer
│   ├── Pages/               # Page components
│   │   ├── Home.jsx         # Homepage
│   │   ├── SignIn.jsx       # Login page
│   │   ├── SignUp.jsx       # Registration page
│   │   ├── Shop.jsx         # Product catalog
│   │   ├── Checkout.jsx     # Payment page
│   │   ├── Contact.jsx      # Contact form
│   │   ├── Account.jsx      # User profile
│   │   └── AdminDashboard.jsx # Admin panel
│   ├── Context/             # React context
│   ├── Hooks/               # Custom React hooks
│   └── redux/               # State management
├── public/                  # Static files (images)
└── .env                     # Environment variables
```

## Features

### User Features
- **Sign Up/Sign In**: Create account or login with email/password or Google
- **Browse Products**: View skincare, gaming, and eBook categories
- **Shopping Cart**: Add/remove items, view total
- **Checkout**: Enter shipping info and pay
- **Payment Options**: Card, mobile money, USSD, crypto
- **Profile Management**: View account details and payment history
- **AI Chat**: Get help from AI assistant
- **Contact Form**: Send messages to support

### Seller Features
- **Seller Account**: Special login for sellers
- **Dashboard**: Manage seller profile
- **Product Management**: (Future feature)

### Admin Features
- **Admin Panel**: Special dashboard for administrators
- **User Management**: View and manage users
- **System Oversight**: Monitor the platform

## How to Set Up the Project

### Requirements
- Node.js (version 16 or higher)
- MongoDB database
- Git

### Installation Steps

1. **Download the project**:
   ```bash
   git clone <repository-url>
   cd triora
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root folder with:
   ```
   URI=mongodb://localhost:27017/triora
   JWT_SECRET=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GEMINI_API_KEY=your-gemini-api-key
   FLUTTERWAVE_PUBLIC_KEY=your-flutterwave-public-key
   FLUTTERWAVE_SECRET_KEY=your-flutterwave-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   RESEND_API_KEY=your-resend-api-key
   TO_EMAIL=support@triora.com
   PORT=7145
   ```

4. **Install frontend dependencies**:
   ```bash
   cd src
   npm install
   cd ..
   ```

5. **Start MongoDB** (if running locally)

6. **Start the backend server**:
   ```bash
   npm start
   # or for development:
   node index.js
   ```

7. **Start the frontend** (in another terminal):
   ```bash
   cd src
   npm run dev
   ```

8. **Open your browser** and go to `http://localhost:5173`

## API Endpoints

### User Routes (`/user`)
- `GET /user/signup` - Signup page
- `POST /user/register` - Create new user account
- `GET /user/signin` - Signin page
- `POST /user/login` - User login
- `POST /user/signin` - Alternative signin
- `GET /user/profile` - Get user profile (requires token)
- `GET /user/dashboard` - User dashboard (requires token)
- `POST /user/google-auth` - Google OAuth login

### Seller Routes (`/seller`)
- `GET /seller/signup` - Seller signup page
- `POST /seller/register` - Create seller account
- `GET /seller/login` - Seller login page
- `POST /seller/login` - Seller login

### Admin Routes (`/admin`)
- `GET /admin/signup` - Admin signup page
- `POST /admin/register` - Create admin account
- `GET /admin/login` - Admin login page
- `POST /admin/login` - Admin login
- `GET /admin/dashboard` - Admin dashboard

### Payment Routes (`/payment`)
- `GET /payment/test` - Payment test page
- `POST /payment/initiate` - Start payment (requires token)
- `POST /payment/complete` - Complete payment (requires token)
- `GET /payment/verify` - Verify payment (requires token)
- `GET /payment/history` - Get payment history (requires token)

### Contact Routes (`/api/contact`)
- `POST /` - Send contact message

### AI Chat
- `POST /chat` - Chat with AI assistant

## How the App Works

### User Journey
1. **Visit Homepage**: See hero section with categories and deals
2. **Sign Up/Sign In**: Create account or login
3. **Browse Products**: Click on categories (skincare, gaming, ebooks)
4. **Add to Cart**: Select items and add to shopping cart
5. **Checkout**: Enter shipping details and choose payment method
6. **Pay**: Use Flutterwave for cards/mobile money or MetaMask for crypto
7. **Confirmation**: Get order confirmation and shipping details

### Authentication Flow
- Users can sign up with email/password or Google OAuth
- JWT tokens are created and stored in localStorage
- Protected routes check for valid tokens
- Different roles (user, seller, admin) have different permissions

### Payment Flow
- User enters shipping information
- Chooses payment method (Flutterwave or MetaMask)
- For Flutterwave: Redirects to payment gateway
- For MetaMask: Initiates crypto transaction
- After payment, order is confirmed and user gets receipt

### AI Chat System
- Chat widget appears on all pages
- Connects to backend `/chat` endpoint
- Uses Google Gemini AI for responses
- Maintains conversation history

## Database Models

### User Model
- firstName, lastName, email, password
- googleId (for Google login)
- picture (profile picture)
- paymentHistory (array of transactions)

### Seller Model
- firstName, lastName, email, password
- googleId, picture
- role (defaults to 'seller')

### Admin Model
- firstName, lastName, email, password
- googleId, picture
- role (defaults to 'admin')

## Security Features

- **Password Hashing**: Uses bcrypt to encrypt passwords
- **JWT Authentication**: Secure token-based authentication
- **CORS**: Controls which domains can access the API
- **Input Validation**: Checks user inputs on frontend and backend
- **Protected Routes**: Certain pages require login

## Future Plans

- Product management system for sellers
- Order tracking and management
- Review and rating system
- Wishlist functionality
- Multi-language support
- Mobile app version

## Troubleshooting

### Common Issues

1. **"MongoDB connection error"**
   - Make sure MongoDB is running
   - Check the URI in your .env file

2. **"Gemini API key not configured"**
   - Add GEMINI_API_KEY to your .env file
   - Get API key from Google AI Studio

3. **Payment not working**
   - Check Flutterwave keys in .env
   - Make sure you're using test keys for development

4. **Frontend not loading**
   - Run `npm install` in the src folder
   - Make sure backend is running on port 7145

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For questions or issues, please use the contact form on the website or email support@triora.com.
