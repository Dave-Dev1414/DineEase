# DineEase

**DineEase** is a restaurant discovery, reservation, ordering, payments, and food-surplus platform built to connect customers with restaurants while giving restaurant partners the tools to manage their digital operations.

DineEase is being developed as a real full-stack product rather than only a restaurant listing website. The platform is designed around separate experiences for **customers, restaurant businesses, donation organizations, administrators, and the DineEase Platform Owner**.

## Product Vision

DineEase brings several parts of the dining ecosystem into one platform:

- Discover restaurants and dishes
- Search and explore menus
- Reserve tables
- Order food
- Track orders
- Manage bookings and order history
- Pay for orders and eligible reservations
- Use a DineEase Wallet for supported purchases
- Give restaurants operational tools
- Connect surplus food with customers or approved donation organizations
- Provide AI-assisted dining and platform intelligence
- Send transactional communication through WhatsApp
- Give the DineEase team private administration, monitoring, verification, and platform-management tools

The long-term goal is not simply to be a restaurant directory. DineEase is intended to become a platform through which restaurants can operate, customers can dine and order, and surplus food can be recovered instead of wasted.

---

# Current Development Status

DineEase is actively under development. The repository currently contains the foundation for authentication, email verification, the customer dashboard, restaurant/dish discovery data, and the PHP/MySQL API structure.

### Currently implemented

- React/Vite frontend
- Tailwind CSS frontend styling
- PHP backend
- MySQL database
- Object-oriented PHP models/controllers
- Session-based authentication
- Customer signup and login
- Password hashing
- Email verification flow
- Verification-email resend flow
- Authenticated customer dashboard
- Dashboard API endpoint
- Restaurant discovery query
- Dish discovery query
- Restaurant-to-dish database relationship
- Customer dashboard dish discovery/search UI
- Central DineEase notification component
- Database migrations for users, restaurants, and dishes

### In active development / next stages

- Real restaurant and dish data
- Restaurant-owner dashboard
- Restaurant management
- Reservations
- Ordering
- Payments
- DineEase Wallet
- WhatsApp Business integration
- Business verification workflow
- DineEase Surplus
- Subscription entitlements
- AI features
- Platform Owner Hub
- Private error monitoring
- Production deployment tooling

The README describes the intended product architecture and roadmap. A feature being listed here does **not** mean that feature is already implemented.

---

# Customer Experience

The customer side of DineEase is centered around discovering food and completing the entire dining journey.

## Discovery

Customers will be able to:

- Discover restaurants
- Search restaurants and dishes
- Browse restaurant profiles
- Browse menus
- View dish information and prices
- Discover newly added restaurants and dishes
- Filter and refine restaurant/food results
- Save favorite restaurants and dishes
- Receive personalized recommendations

The customer dashboard is intentionally separate from the restaurant-owner dashboard.

A customer should discover restaurants and dishes; a restaurant owner should manage the restaurant and its dishes.

## Reservations

Planned reservation functionality includes:

- Browse restaurant availability
- Select a date and time
- Reserve a table
- View upcoming reservations
- View reservation history
- Cancel eligible reservations
- Receive reservation confirmations and updates

## Ordering

Customers will eventually be able to:

- Add dishes to an order
- Review their cart
- Place orders
- Receive an order ID
- Track order status
- View order history
- Receive order notifications
- Receive delivery/collection updates where applicable

### DineEase Order IDs

DineEase will use a structured order ID format designed to make orders easy to identify while retaining a degree of uniqueness.

The planned format uses:

- The two-digit day
- A three-digit order number
- A three-character randomized customer-name component

The final generation and collision-handling logic will be implemented in the backend.

---

# Restaurant Partner Experience

Restaurants are not treated as simple listings. They are DineEase business partners.

A restaurant partner will eventually have its own dashboard and tools for managing its DineEase presence and operations.

## Restaurant Management

Planned capabilities include:

- Restaurant profile management
- Restaurant information
- Menu management
- Dish creation and editing
- Availability controls
- Pricing
- Restaurant imagery
- Reservation management
- Order management
- Customer activity
- Staff management
- Sales and operational insights
- WhatsApp communication
- Surplus food management

Restaurant creation and management are intentionally separate from the customer discovery experience.

---

# Business Verification

DineEase will have a business verification flow for businesses that want to operate as verified DineEase partners.

The verification process is intended to establish that a business is legitimate before granting the appropriate partner capabilities.

Potential verification information includes:

- Business details
- Business contact information
- Business registration information
- Representative information
- Business documentation
- Business scale
- Verification review
- Verification status

A business may have a status such as:

- Pending
- Under Review
- Verified
- Rejected

Verification status is separate from business size.

---

# Business Scale

DineEase will classify partner businesses by declared operational scale:

- **Micro**
- **Small**
- **Medium**
- **Large**
- **Enterprise**

Business scale describes the size and operational scope of a business. It is not the same thing as verification.

For example:

> Business Scale: Medium  
> Verification Status: Verified

Scale-aware features may eventually allow larger businesses to access tools such as:

- Multi-location management
- Advanced staff management
- Advanced analytics
- Organization-level reporting
- Larger operational workflows
- Additional integrations

---

# DineEase Surplus

**DineEase Surplus** is the food-waste reduction system integrated into DineEase.

The idea is to help restaurants recover value from food approaching expiry rather than automatically allowing that food to become waste.

A restaurant can make eligible surplus food available to:

1. Customers at a discounted price
2. Approved food-donation organizations

## Surplus Lifecycle

A surplus item may move through states such as:

- Available
- Reserved
- Sold
- Donated

Planned capabilities include:

- Surplus item registration
- Food categories
- Quantity tracking
- Production dates
- Expiry dates
- Expiry monitoring
- Discounted listings
- Donation requests
- Reservation/collection handling
- Delivery or collection tracking
- Donation history
- Waste-reduction statistics
- Surplus analytics

DineEase Surplus is intended to connect the commercial side of food recovery with the donation side rather than treating them as unrelated systems.

---

# DineEase Wallet

The **DineEase Wallet** is a planned customer payment feature.

Customers will be able to deposit funds into their DineEase Wallet and use their balance for supported transactions.

A major planned use case is allowing customers to:

- Deposit money before ordering
- Pay for eligible food orders
- Prepay for food
- Preorder food for later delivery or collection during the day
- Maintain a transaction history

The wallet will be implemented as a backend-controlled financial system. The frontend must never be treated as the authority for wallet balances or successful payments.

Wallet transactions will require proper server-side validation and transaction records.

---

# Payments

DineEase will eventually support secure online payments for eligible platform transactions.

Planned payment functionality includes:

- Food-order payments
- Eligible reservation payments
- Wallet deposits
- Payment history
- Transaction records
- Refunds
- Failed payments
- Pending payments
- Cancelled/abandoned transactions
- Payment verification

## Payment Verification

A frontend response must never be enough to unlock paid functionality.

The intended production flow is:

```
Customer
    ↓
Payment Provider
    ↓
Payment Completed
    ↓
Provider Webhook
    ↓
DineEase Backend
    ↓
Transaction Verification
    ↓
Subscription / Wallet / Order Update
    ↓
Feature or Transaction Confirmed
```

Payment-provider webhooks and backend verification will be the source of truth for production payment state.

---

# WhatsApp Integration

DineEase plans to use the **WhatsApp Business Platform** for transactional communication.

Potential messages include:

- Order confirmation
- Order status changes
- Reservation confirmation
- Reservation reminders
- Delivery updates
- Collection reminders
- Payment confirmation
- Surplus notifications
- Support communication

A key planned restaurant workflow is that after a successful customer purchase, DineEase can send the relevant purchase/order notification directly to the restaurant owner's WhatsApp Business contact.

The backend will handle this integration so API credentials and business secrets are not exposed to the frontend.

---

# AI

AI is planned as an intelligence layer across DineEase rather than as a standalone chatbot.

Planned customer-facing capabilities include:

- AI Dining Concierge
- Restaurant discovery assistance
- Personalized restaurant recommendations
- Menu and meal recommendations
- Taste-based recommendations
- Dining planning
- Special-occasion planning
- Personalized dining experiences

Planned platform/business capabilities include:

- Restaurant analytics assistance
- Surplus insights
- Operational assistance
- Smart customer support
- Internal error explanation using sanitized technical information

AI requests will be routed through the DineEase backend.

API keys, payment credentials, authentication secrets, and other sensitive information must never be exposed to the frontend.

---

# DineEase Membership & Premium

DineEase is planned around a free/basic experience and paid feature access.

The initial product launch will focus on the core DineEase experience and **DineEase Pro**. **DineEase Premium** is planned as a later post-launch offering rather than something the MVP depends on.

Premium is currently envisioned as a feature layer containing capabilities such as:

- AI Dining Concierge
- Personalized recommendations
- Advanced restaurant and food filters
- Priority reservations and waitlists
- Exclusive restaurant offers
- DineEase Surplus early access
- Personalized dining/taste profile
- Dining and spending insights
- Special-occasion planning
- Early access to selected restaurants
- Priority support

The exact commercial packaging can evolve as the MVP is validated.

## Entitlement System

Subscription access should be controlled through a centralized entitlement system.

Application code should ask:

> Does this user have access to feature X?

The entitlement system should determine the answer.

Subscription checks should not be scattered throughout unrelated frontend and backend components.

## Payment-to-Entitlement Flow

```
Customer
    ↓
Payment Provider
    ↓
Webhook
    ↓
Backend Verification
    ↓
Subscription Record
    ↓
Entitlement Update
    ↓
Feature Access
```

Development will use test accounts and payment-provider sandbox environments where available.

Development-only membership controls must never become a production method for users to grant themselves paid access.

---

# DineEase Error System

DineEase will use one consistent error-notification system across the application.

Customer-facing errors should use the branded **DineEase notification system** rather than browser `alert()` dialogs or unrelated one-off error components.

The notification system is intended to:

- Appear consistently across pages
- Animate into view from the top of the screen
- Present safe, user-friendly messages
- Be reusable throughout the application
- Keep technical implementation details away from normal users

---

# Private Error Monitoring

Separate from customer-facing notifications, DineEase will eventually have a private developer/platform-owner error monitoring system.

The purpose is to allow authorized personnel to understand production failures remotely.

## Error Sources

Potentially captured DineEase-originated failures include:

- Frontend runtime errors
- Authentication failures caused by DineEase
- API failures
- PHP exceptions
- Database/PDO failures
- Email service failures
- WhatsApp integration failures
- Payment integration failures
- Other backend, frontend, infrastructure, or external-service failures originating from the platform

Failures caused purely by a customer's local network or device should not automatically be treated as DineEase platform failures.

## Error Classification

Errors will be grouped into categories such as:

- Frontend
- Backend
- Authentication
- API
- Database
- External service
- Payment
- Infrastructure

Useful metadata may include:

- Timestamp
- Error type
- Severity
- Source/component
- Page or endpoint
- HTTP status
- Safe technical details
- Occurrence count
- Error grouping information

## AI Error Explanation

AI may later analyze sanitized error records and provide a short explanation of what a technical error means and where developers should investigate.

AI will **not** be responsible for detecting or recording errors.

Error logging must continue to work when the AI service is unavailable.

Secrets such as passwords, API keys, access tokens, session credentials, verification tokens, and payment secrets must never be stored in logs or sent to the AI service.

---

# Platform Owner Hub

DineEase will eventually include a private **Platform Owner Hub**.

This is separate from both the customer dashboard and restaurant-owner dashboard.

The Platform Owner Hub is intended to provide centralized platform-level control over:

- Users and accounts
- Restaurants and businesses
- Business verification
- Business scale
- Orders
- Reservations
- Payments
- Wallet activity
- Subscriptions
- Entitlements
- DineEase Surplus
- Donation organizations
- Reports and analytics
- Notifications
- Error logs
- System health
- External services
- Platform settings
- Audit history
- Deployment management

## Owner Authentication

The Platform Owner should not appear as a selectable role on the normal customer/business login page.

The owner area will use a separate private authentication entry point with backend authorization.

Knowing the owner URL must never be enough to gain access.

## Sensitive Owner Actions

Sensitive administrative actions will require an additional security challenge.

The planned system uses **seven owner-configured security questions**. For a sensitive action, one question is randomly selected and the owner must provide the corresponding answer.

The challenge is tied to the requested action rather than creating a permanently unlocked administrative state.

Security answers must be securely stored and never stored as plaintext.

The platform may later add stronger authentication such as multi-factor authentication.

---

# Platform Deployment Management

The Platform Owner Hub is intended to eventually provide a controlled interface around the production deployment pipeline.

Potential capabilities include:

- Current production version
- Frontend version
- Backend version
- Update availability
- Deployment history
- Deployment status
- Deployment logs
- Post-deployment verification
- Production health checks
- Rollback support

The Hub should control the deployment pipeline rather than allowing the browser to directly modify production application files.

Sensitive deployment actions will require the additional owner security challenge.

---

# User Roles

DineEase is designed around distinct role-based experiences.

### Customer

Can discover restaurants and dishes, make reservations, order food, manage their account, and use customer-facing platform features.

### Restaurant Owner

Owns a restaurant business on DineEase and manages its restaurant operations.

### Restaurant Manager

Manages delegated restaurant operations according to assigned permissions.

### Restaurant Staff

Handles assigned operational tasks such as orders, reservations, or other restaurant workflows.

### Donation Organization

Approved organizations that can participate in DineEase Surplus donation workflows.

### Administrator

Authorized DineEase personnel who manage platform operations according to their permissions.

### Platform Owner

The highest-level platform role with access to the private Platform Owner Hub and platform-wide controls.

Role authorization is enforced by the backend. A frontend role check must never be the only security boundary.

---

# Partnerships

DineEase is designed around partnerships with businesses rather than simply collecting public restaurant listings.

Potential partners include:

- Restaurants
- Bakeries
- Supermarkets
- Caterers
- Food businesses
- Approved food-donation organizations
- Logistics and collection partners

The partnership model is intended to give businesses access to customers while providing operational tools and additional ways to recover value from surplus food.

---

# Technology Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- JavaScript
- React Router
- Lucide React / icon libraries

## Backend

- PHP
- MySQL
- Object-oriented PHP
- REST-style API architecture
- PHP sessions for authentication
- PDO for database access

## Backend Packages / Services

- PHP dotenv
- Brevo PHP SDK
- Symfony HTTP Client
- Nyholm PSR-7

## Planned Integrations

- Payment provider
- WhatsApp Business Platform
- AI provider
- Email provider
- Restaurant / Places APIs
- Maps and location services

---

# Project Structure

The project is intentionally separated into frontend and backend applications.

```
DineEase/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── exceptions/
│   ├── migrations/
│   └── public/
│
├── composer.json
├── README.md
└── .gitignore
```

---

# Database Foundation

The current database foundation includes tables for:

- Users
- Restaurants
- Dishes

The user model supports roles including:

- CUSTOMER
- RESTAURANT_OWNER
- RESTAURANT_MANAGER
- RESTAURANT_STAFF
- DONATION_ORG
- ADMIN
- PLATFORM_OWNER

Restaurants are associated with their owners, while dishes belong to restaurants.

Restaurant discovery currently uses business-level conditions such as:

- Active restaurant
- Verified restaurant

Dish discovery uses conditions such as:

- Available dish
- Active restaurant
- Verified restaurant

This establishes the initial:

```
MySQL
  ↓
PHP Model
  ↓
Controller
  ↓
API Route
  ↓
React Service
  ↓
Customer Dashboard
```

pipeline that later features will build upon.

---

# Development Principles

DineEase development follows several important principles:

### Backend is the authority

Authentication, authorization, payment state, wallet balances, subscriptions, entitlements, verification, and other sensitive state must be controlled by the backend.

### Separate user experiences

Customer functionality, restaurant operations, administration, and platform-owner controls should not be mixed into one dashboard.

### Reusable systems

Shared functionality such as notifications, authentication, entitlement checks, error handling, and API patterns should be implemented as reusable systems rather than duplicated across pages.

### Security by design

Sensitive information should stay on the backend. Frontend controls are for user experience, not security enforcement.

### Mobile-ready UX

Customer-facing DineEase interfaces are intended to work properly on mobile, tablet, and desktop screens.

### Production-aware development

Features are designed with their eventual production behavior in mind, even when the current implementation is only an MVP or development version.

---

# Roadmap

The product roadmap is broadly organized around the following progression:

## Phase 1 — Foundation

- Authentication
- Email verification
- Customer dashboard
- Restaurant discovery
- Dish discovery
- Core database relationships
- Shared notification system

## Phase 2 — Core Dining Experience

- Restaurant profiles
- Full menus
- Search and filtering
- Reservations
- Ordering
- Order tracking
- Customer history
- Restaurant-owner dashboard
- Restaurant management

## Phase 3 — Business & Platform Operations

- Business registration
- Business verification
- Staff and role permissions
- Payments
- WhatsApp Business integration
- Restaurant analytics
- Platform administration

## Phase 4 — DineEase Surplus & Wallet

- Surplus food management
- Discounted surplus
- Donation workflows
- Collection/delivery workflows
- DineEase Wallet
- Prepaid orders
- Scheduled/preordered food

## Phase 5 — Intelligence & Premium

- AI Dining Concierge
- Personalized recommendations
- Advanced discovery
- Taste profiles
- Dining/spending insights
- Special-occasion planning
- Premium entitlements
- Priority reservations and support

## Phase 6 — Platform Owner Infrastructure

- Private Platform Owner Hub
- Error monitoring
- AI-assisted error explanation
- System health
- Audit history
- Deployment management
- Production update verification
- Rollback workflows

---

# Important Development Note

DineEase is a continuously evolving project. Product decisions may change as implementation, testing, user research, restaurant partnerships, and real-world requirements provide new information.

The codebase is the source of truth for what is currently implemented. This README describes the current product direction, architecture, and planned functionality without implying that every listed feature is already available.

---

## License

The project's licensing terms will be defined as the product and repository strategy are finalized.
