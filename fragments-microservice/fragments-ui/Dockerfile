# Stage 0: Install alpine Linux + node + yarn + dependencies
FROM node:16.14-alpine AS dependencies

LABEL maintainer="Mohammad Fuhad Uddin <mohammedfuhad1@gmail.com>"
LABEL description="Fragments node.js microservice"

ENV NODE_ENV=production

# Reduce npm spam when installing within Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#loglevel
ENV NPM_CONFIG_LOGLEVEL=warn

# Disable colour when run inside Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#color
ENV NPM_CONFIG_COLOR=false

WORKDIR /app

# Copy the package.json and package-lock.json files into /app
COPY package*.json /app/

# Install node dependencies defined in package-lock.json
RUN npm ci

#######################################################################

# Stage 1: use dependencies to build the site
FROM node:16.14-alpine AS builder

WORKDIR /app

# Copy cached dependencies from previous stage
COPY --from=dependencies /app /app

# Copy source code into the image
COPY . .

# Build the site to build/
RUN npm run build

########################################################################

# Stage 2: nginx web server to host the built site
FROM nginx:stable-alpine AS deploy

# Put our build/ into /usr/share/nginx/html/ and host static files
COPY --from=builder /app/build/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl --fail localhost:80 || exit 1
