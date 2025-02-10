# TODO - Not added environment url for now, will add once the stage setup is done.
FROM node:14 AS builder
ENV NODE_ENV production

# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy app files
COPY . .
# Build the app
CMD ["npm", "build"]
