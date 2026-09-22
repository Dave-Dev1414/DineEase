# DineEase

A smart restaurant platform for discovering, reserving, ordering, and reducing food waste.

## About

DineEase is a restaurant technology platform designed to connect customers, restaurants, approved food-rescue organizations, and platform administrators in one ecosystem.

Customers can discover restaurants, view menus, reserve tables, order food, track orders, and eventually receive personalized recommendations powered by AI.

Restaurants can manage their menus, reservations, orders, customers, and surplus food while reaching more diners and recovering value from food that would otherwise go to waste.

Through **DineEase Surplus**, restaurants can identify food approaching expiry and choose to discount it for customers or donate it to approved food-rescue organizations.

DineEase is being developed with a partnership-first approach. Restaurants do not simply list their businesses on the platform. They can become DineEase partners and use the platform to manage operations, reach customers, increase revenue, and reduce food waste.

## Core Platform

### Customer Experience

- Restaurant discovery and search
- Restaurant profiles
- Menus and food listings
- Table reservations
- Online food ordering
- Order tracking
- Customer accounts
- Booking history
- Order history
- Favorites
- WhatsApp notifications
- Personalized recommendations
- AI-powered dining assistance

### Restaurant Management

- Restaurant profiles
- Menu management
- Reservation management
- Order management
- Customer management
- Restaurant dashboard
- Staff management
- Business verification
- Sales and activity reports
- WhatsApp communication
- Surplus food management

### DineEase Surplus

DineEase Surplus is the food-rescue system built into the platform.

Restaurants can manage food approaching expiry and decide whether to:

1. Discount it for customers
2. Donate it to an approved food-rescue organization

Surplus food can be tracked through statuses such as:

- Available
- Reserved
- Sold
- Donated

Planned surplus features include:

- Food item registration
- Categories and quantities
- Production and expiry dates
- Expiry tracking and alerts
- Discounted surplus listings
- Donation requests
- Collection and delivery tracking
- Donation history
- Waste reduction reports
- Surplus analytics

## Partnerships

DineEase is built around partnerships with restaurants and food-related businesses.

Potential partners include:

- Restaurants
- Bakeries
- Supermarkets
- Caterers
- Food businesses
- Approved food-rescue organizations
- Collection and logistics partners

Partner restaurants can use DineEase to manage their restaurant operations while gaining access to customers and additional ways to recover value from surplus food.

## User Roles

- Customers
- Restaurant owners
- Restaurant managers
- Restaurant staff
- Approved food-donation organizations
- Administrators
- Platform owner

## AI

AI will act as an intelligence layer across DineEase rather than as a standalone chatbot.

Planned AI capabilities include:

- Restaurant discovery assistance
- Personalized restaurant recommendations
- Menu and meal recommendations
- Dining planning
- Surplus food insights
- Restaurant analytics assistance
- Smart customer support
- Personalized dining experiences

AI functionality will be handled through the DineEase backend so API credentials and sensitive application data are not exposed to the frontend.

## Payments

Planned payment functionality includes:

- Online food payments
- Reservation-related payments where applicable
- Secure payment processing
- Payment history
- Refund handling
- Transaction records

A future **DineEase Wallet** may allow customers to deposit funds into their DineEase account and use their balance for eligible orders and scheduled purchases.

## Notifications

DineEase is planned to integrate with the WhatsApp Business Platform for transactional communication.

Possible notifications include:

- Reservation confirmations
- Order confirmations
- Order status updates
- Delivery updates
- Collection reminders
- Cancellations
- Payment confirmations
- Surplus availability
- Customer support communication

## Business Verification

DineEase will use business verification to improve trust across the platform.

Verification may include:

- Business information
- Contact verification
- Business registration information
- Representative verification
- Manual review
- Partner verification

Different verification levels may apply depending on what a business is allowed to do on the platform.

## Subscription Tiers & Feature Access

DineEase will have three platform tiers:

- **DineEase** — MVP tier
- **DineEase Pro** — MVP tier
- **DineEase Premium** — post-launch tier

The **DineEase** and **DineEase Pro** tiers will form the initial MVP offering at launch. **DineEase Premium** is planned for release approximately **5–8 months after launch**, after DineEase has had time to secure users and business partners, validate usage patterns, and establish the platform's initial operating base.

Some functionality will remain unavailable until the user's subscription or payment has been successfully confirmed.

Feature access will be handled through a centralized entitlement system rather than scattering subscription checks throughout the application. The application should ask whether an account has access to a specific feature, while the entitlement system determines the answer.

The exact features included in each tier will be finalized as the MVP and post-launch product develop.

### Payment Verification

Paid functionality must not be unlocked solely because the frontend reports that a payment succeeded.

The intended production flow is:

Customer
→ Payment provider
→ Payment completed
→ Payment-provider webhook
→ DineEase backend
→ Transaction verification
→ Subscription/entitlement update
→ Feature unlocked

Payment states such as successful, failed, cancelled, abandoned, pending, refunded, and expired transactions should be handled explicitly where relevant.

### Development & Testing

DineEase must be testable without requiring real-money transactions during development.

Development will use controlled test accounts and/or development-only membership controls to test different tiers and feature permissions. Payment integrations will use the provider's sandbox/test environment where available.

For example, a development test account should be able to switch between DineEase, DineEase Pro, and DineEase Premium so developers can verify both restricted and unlocked functionality.

Development-only controls must never be exposed as a way for production users to grant themselves paid access.

## Error Logging & Observability

DineEase will include a centralized **private developer error monitoring system** for authorized developers and platform administrators, with the primary operational purpose of allowing the DineEase platform owner to monitor production failures even when away from the development system.

The system is **not a customer-facing feature**. Customers and ordinary users will never have access to raw error logs, stack traces, internal technical details, or the developer error dashboard.

### What Gets Logged

The system is intended to capture failures that originate from DineEase itself, including:

- Frontend application/runtime errors
- Authentication and sign-in failures caused by DineEase
- API failures
- PHP/server-side exceptions and failures
- Database/PDO errors
- External service failures such as Brevo/email integration failures
- Other application, backend, infrastructure, or integration failures originating from DineEase

Failures primarily caused by an individual user's local environment or network should generally **not** be treated as DineEase platform errors. For example, an image failing to load because a user's internet connection is too poor should not create a platform error log unless there is evidence that the failure originated from DineEase.

### Automatic Error Classification

Captured errors will be automatically grouped into:

- **Frontend Errors**
- **Backend Errors**

Additional metadata can identify the specific source, such as authentication, API, database, external service, or other application components.

Planned diagnostic information includes:

- Timestamp
- Frontend or backend classification
- Error type
- Severity
- Source/component
- Page or endpoint
- HTTP status code where applicable
- Safe technical details
- Occurrence count and related grouping information

### Private Developer Error Dashboard

A future **Error Logs** dashboard will be restricted to authorized developers/platform administrators, with the platform owner as the primary intended user.

The dashboard will allow production failures to be reviewed remotely, including when the developer is away from the development system. Repeated occurrences of the same underlying error should be grouped together rather than appearing as unrelated individual records.

Normal users will receive only safe, user-friendly DineEase error notifications when appropriate.

### AI Error Explanation

DineEase will eventually include an AI layer that analyzes **sanitized** error records and provides a short plain-language explanation of what the technical error means, with useful investigation guidance where appropriate.

AI will **not** be responsible for detecting or recording errors. Error capture and logging must continue to function even when the AI service is unavailable.

Sensitive information such as passwords, API keys, access tokens, verification tokens, session credentials, and other secrets must never be stored in error logs or sent to the AI service.

## Platform Administration

The DineEase platform owner and administrators will manage:

- Users
- Restaurants
- Business verification
- Donation organizations
- Orders
- Reservations
- Surplus food
- Transactions
- Reports
- Platform settings
- Staff and administrator accounts
- Activity and audit logs
- AI configuration

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- JavaScript

### Backend

- PHP
- MySQL
- Object-oriented PHP
- REST-style API architecture

### Planned Integrations

- Restaurant and Places APIs
- WhatsApp Business Platform
- AI API
- Payment gateway
- Email services
- Maps and location services

## Architecture

DineEase is planned around a separated frontend and backend architecture.


DineEase/

├── React Frontend

├── PHP Backend API

├── MySQL Database

├── External Services/

   ├── Places / Restaurant APIs

   ├── WhatsApp Business Platform

   ├── AI Provider

   ├── Payment Gateway

   └── Maps / Location Services


└── Administration & Management