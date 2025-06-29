# Perception Labs - Perception Systems Modeling Platform

## Overview

This is a full-stack web application for a research organization called "Perception Labs". The platform serves as an academic website showcasing research and work focused on modeling perception systems and understanding how ideas move through networks of belief, identity, and influence. The application follows a modern React frontend with Express backend architecture, utilizing PostgreSQL for data persistence and featuring a comprehensive UI component library.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom academic-themed color scheme
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)
- **Development**: Hot reload with tsx for TypeScript execution

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Migrations**: Drizzle Kit for schema migrations
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

## Key Components

### Frontend Components
- **Home Page**: Academic-style landing page with publication listings and research focus
- **UI Library**: Comprehensive set of accessible components (buttons, forms, dialogs, etc.)
- **Routing**: Simple route structure with home page and 404 handling
- **Error Handling**: Custom error boundaries and toast notifications

### Backend Services
- **API Routes**: RESTful API structure (currently minimal, ready for expansion)
- **Storage Interface**: Abstracted storage layer with both memory and database implementations
- **Authentication**: Session-based authentication infrastructure (ready for implementation)
- **Middleware**: Request logging, JSON parsing, and error handling

### Shared Resources
- **Schema Definitions**: Type-safe database schema with Zod validation
- **Type Definitions**: Shared TypeScript types between frontend and backend

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **API Layer**: Express routes handle HTTP requests with middleware processing
3. **Business Logic**: Route handlers interact with storage interface
4. **Data Access**: Storage layer abstracts database operations using Drizzle ORM
5. **Database**: PostgreSQL stores persistent data with proper schema validation
6. **Response**: JSON responses flow back through the middleware chain to client

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Query for frontend state management
- **Backend Framework**: Express.js with TypeScript support
- **Database**: Neon PostgreSQL serverless database with Drizzle ORM
- **UI Framework**: Radix UI primitives with Shadcn/ui component library

### Development Tools
- **Build Tools**: Vite for frontend builds, esbuild for backend bundling
- **Type Checking**: TypeScript with strict configuration
- **Styling**: Tailwind CSS with PostCSS processing
- **Development**: tsx for TypeScript execution, nodemon-like hot reload

### Replit Integration
- **Cartographer**: Replit's development tooling integration
- **Runtime Error Modal**: Development error overlay
- **Environment**: Configured for Replit deployment and development

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx with file watching for automatic restarts
- **Database**: Neon PostgreSQL with environment-based connection
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
- **Frontend**: Vite production build to `/dist/public`
- **Backend**: esbuild bundle to `/dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Process**: Single Node.js process serving both API and static files

### Database Management
- **Schema Migrations**: Drizzle Kit push command for schema updates
- **Connection Pooling**: Neon serverless handles connection management
- **Environment Configuration**: Production/development database separation

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 29, 2025. Initial setup