# Highwater Protocol

Highwater Protocol is a comprehensive financial management platform with a modern web frontend and a robust backend API.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (v8 or later)
- [Docker](https://www.docker.com/) (optional, for containerized development)
- [Git](https://git-scm.com/)

## Project Structure

```
highwater/
├── backend/         # Backend API server (Express + TypeScript)
├── frontend/        # Frontend application (Next.js)
└── shared/          # Shared TypeScript types and utilities
```

## Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/highwater-protocol.git
cd highwater-protocol/highwater
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
pnpm install
```

#### Frontend

```bash
cd ../frontend
pnpm install
```

### 3. Environment Variables

#### Backend

Create a `.env` file in the `backend` directory:

```bash
cp backend/.env.example backend/.env
```

Update the environment variables as needed.

### 4. Start Development Servers

#### Option A: Run Services Individually

1. Start the backend:

```bash
cd backend
pnpm dev
```

The backend will be available at `http://localhost:4000`

2. In a new terminal, start the frontend:

```bash
cd frontend
pnpm dev
```

The frontend will be available at `http://localhost:3000`

#### Option B: Using Docker Compose

```bash
docker-compose up --build
```

This will start both the frontend and backend services in containers.

## Available Scripts

### Backend

- `pnpm dev` - Start development server with hot-reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests

### Frontend

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linter

## API Documentation

Once the backend is running, you can access the API documentation at:

- Swagger UI: `http://localhost:4000/api/docs`
- OpenAPI JSON: `http://localhost:4000/api-docs.json`

## Testing

### Backend Tests

```bash
cd backend
pnpm test
```

### Frontend Tests

```bash
cd frontend
pnpm test
```

## Deployment

### Backend

1. Build the Docker image:

```bash
docker build -t highwater-backend -f backend/Dockerfile .
```

2. Run the container:

```bash
docker run -p 4000:4000 highwater-backend
```

### Frontend

1. Build the Docker image:

```bash
docker build -t highwater-frontend -f frontend/Dockerfile .
```

2. Run the container:

```bash
docker run -p 3000:3000 highwater-frontend
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
