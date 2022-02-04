# common base image for development and production
FROM node:14.18.0-alpine AS base
WORKDIR /app


# dev image contains everything needed for testing, development and building
FROM base AS development
COPY package.json yarn.lock ./

COPY ./config ./config

# first set aside prod dependencies so we can copy in to the prod image
RUN yarn install --pure-lockfile --production
RUN cp -R node_modules /tmp/node_modules

# install all dependencies and add source code
RUN yarn install --pure-lockfile
COPY . .


# builder runs unit tests and linter, then builds production code
FROM development as builder
RUN yarn lint
#RUN yarn test:unit --colors
RUN yarn babel ./src --out-dir ./dist --copy-files


# release includes bare minimum required to run the app, copied from builder
FROM base AS release
COPY --from=builder /tmp/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/config ./config
CMD ["node", "dist/src/server.js"]