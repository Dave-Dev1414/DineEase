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