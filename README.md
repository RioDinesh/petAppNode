# Express.js Application

This is a basic Node.js application using Express.js framework.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Running the Application

### Development mode

```bash
npm run dev
```

This will start the server with nodemon, which automatically restarts when you make changes.

### Production mode

```bash
npm start
```

## Environment Variables

The application uses the following environment variables:

- `PORT`: The port number for the server (default: 3000)
- `NODE_ENV`: The environment mode (development/production)

These can be configured in the `.env` file.

## API Endpoints

- `GET /`: Welcome message
