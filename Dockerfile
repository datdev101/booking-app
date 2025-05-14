FROM node:20-slim AS base
WORKDIR /app

# Dev only
FROM base AS dev
COPY package.json yarn.lock ./
RUN yarn

### BUILDER PRODUCTION ###
FROM base AS builder-production

# Install production dependencies
COPY package.json yarn.lock ./

RUN yarn install --prod --frozen-lockfile --ignore-scripts \
    && cp -RL node_modules/ /tmp/node_modules

### BUILDER APP ###
FROM base AS builder
ARG SERVICE_NAME
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .
RUN yarn build $SERVICE_NAME

### RUNNER ###
FROM base

# Copy runtime dependencies
COPY --from=builder-production /tmp/node_modules/ ./node_modules
# Copy runtime project
COPY --from=builder /app/dist ./src
ARG SERVICE_NAME
ENV APP_MAIN_FILE=src/apps/$SERVICE_NAME/main

CMD node $APP_MAIN_FILE