
# Booking App

A modular, scalable booking application built with NestJS and TypeScript. This project serves as a robust foundation for developing booking systems, featuring a microservices architecture and Docker support for seamless deployment.

## 🧰 Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Package Manager**: Yarn
- **Containerization**: Docker & Docker Compose
- **Linting & Formatting**: ESLint, Prettier
- **Configuration Management**: `.env` files

## 📁 Project Structure

```
booking-app/
├── apps/               # Microservice applications
├── libs/               # Shared libraries and utilities
├── .env.example        # Environment variable template
├── docker-compose.yml  # Docker Compose configuration
├── Dockerfile          # Dockerfile for containerization
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/datdev101/booking-app.git
   cd booking-app
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   - Copy the example environment file and configure it as needed:

     ```bash
     cp .env.example .env
     ```


4. **Run the Application:**

   - **Option 1: Run with Docker Compose (All Services)**

     ```bash
     docker-compose up --build
     ```

   - **Option 2: Local Development (Individual Services)**

     1. Start required infrastructure (RabbitMQ, MongoDB, Redis):

        ```bash
        docker compose up -d rabbitmq mongodb redis
        ```

     2. For each microservice you want to run, copy the example environment file:

        ```bash
        cp apps/<service>/.env.example apps/<service>/.env
        ```

     3. Start the microservice in development mode:

        ```bash
        yarn start:dev <SERVICE_NAME>
        ```

        **Examples:**

        ```bash
        yarn start:dev api-gateway
        yarn start:dev auth-service
        ```


### API Endpoints

The application exposes the following RESTful API endpoints:

| Method | Endpoint                      | Description                           |
|--------|-------------------------------|---------------------------------------|
| POST   | /api/auth/register            | Register user                         |
| POS    | /api/auth/login               | Login user                            |
| GET    | /api/concerts                 | Get all concerts                      |
| GET    | /api/concerts/:id             | Get concert detail by id              |
| POST   | /api/booking                  | Create booking                        |

## ✅ Completed Tasks
- Initialized project with microservices architecture  
- Implemented user registration API  
- Implemented user login API  
- API to fetch all available concerts  
- API to fetch concert details  
- API to book a seat for a concert  
- Support multiple bookings per user for the same concert  
- Prevent overbooking under high concurrency  

## 📌 Upcoming Tasks
- Implement booking cancellation API  
- Send booking confirmation emails  
- Perform stress testing with 1000 concurrent users  
- Disable booking when a concert starts  

