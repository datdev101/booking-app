FROM node:20-slim AS base
WORKDIR /app

###### LIB BUILDER ######
FROM base AS lib-builder
COPY package.json yarn.lock ./
RUN yarn install --prod --frozen-lockfile --ignore-scripts \
    && cp -RL node_modules/ /tmp/node_modules
#########################

###### SERVICE BUILDER ######
FROM base AS service-builder
WORKDIR /app
ARG SERVICE_NAME
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build $SERVICE_NAME
############################

######## LOCAL DEV ########
FROM lib-builder AS local
WORKDIR /app
ARG SERVICE_NAME
ENV SERVICE_NAME=$SERVICE_NAME
CMD yarn start:dev $SERVICE_NAME
##########################

### SERVICE RUNNER ###
FROM base AS production
COPY --from=lib-builder /tmp/node_modules/ ./node_modules
COPY --from=service-builder /app/dist ./src
ARG SERVICE_NAME
ENV APP_MAIN_FILE=src/apps/$SERVICE_NAME/main
CMD node $APP_MAIN_FILE
#######################