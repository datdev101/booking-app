FROM node:20-slim AS base

WORKDIR /app

### BUILDER PRODUCTION ###
FROM base AS builder-production

# Install production dependencies
COPY package.json yarn.lock ./

RUN yarn install --prod --frozen-lockfile --ignore-scripts \
  && cp -RL node_modules/ /tmp/node_modules

### BUILDER APP ###
FROM base AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

### RUNNER ###
FROM base

RUN apt-get update -y && apt-get upgrade -y 
RUN apt-get install -y openssl

# Copy runtime dependencies
COPY --from=builder-production /tmp/node_modules/ ./node_modules
# Copy runtime project
COPY --from=builder /app/dist ./src

CMD ["node", "src/main"]
