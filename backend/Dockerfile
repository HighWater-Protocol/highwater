# Use an official Node.js image as the base
FROM node:24.0.1-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Create directory for shared types
RUN mkdir -p node_modules/@highwater

# Copy shared types
COPY shared/ts/ ./node_modules/@highwater/

# Install dependencies first for better caching
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .


# Build the application
RUN pnpm build

# Use a lighter image for the final build
FROM node:24.0.1-alpine AS runner

# Create app directory and set proper permissions
RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app

# Switch to node user early to avoid permission issues
USER node

# Copy built files and node_modules
COPY --chown=node:node --from=base /app/node_modules ./node_modules
COPY --chown=node:node --from=base /app/package.json .
COPY --chown=node:node --from=base /app/pnpm-lock.yaml .
COPY --chown=node:node --from=base /app/dist ./dist

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["node", "dist/server.js"]
