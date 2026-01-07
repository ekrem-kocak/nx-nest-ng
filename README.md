# Nx Nest Angular Store

A full-stack monorepo application built with Nx, NestJS, and Angular.

## Tech Stack

- **Monorepo**: Nx
- **Backend**: NestJS
- **Frontend**: Angular
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **State Management**: NGXS
- **Styling**: Tailwind CSS & Angular Material

## Links

- **Frontend**: [https://nx-nest-ng.vercel.app](https://nx-nest-ng.vercel.app)
- **API Swagger**: [https://nx-nest-store.vercel.app/api](https://nx-nest-store.vercel.app/api)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- PostgreSQL database

### Installation

```bash
# Install dependencies
pnpm install

# Setup Prisma
pnpm prisma generate
pnpm prisma migrate dev
```

### Environment Variables

Create `.env` file in the root directory with:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
```

## Development

### Run Applications

```bash
# Start frontend
pnpm start:eku-store
# or
nx serve eku-store

# Start backend API
pnpm start:api
# or
nx serve api
```

### Build

```bash
# Build frontend
pnpm build:eku-store

# Build backend
pnpm build:api
```

### Lint

```bash
# Lint all projects
pnpm lint:all

# Fix linting issues
pnpm lint:all:fix
```

### Visualize Project Graph

```bash
pnpm graph
# or
nx graph
```
