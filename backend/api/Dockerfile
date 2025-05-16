# Build stage
FROM node:24.0.1-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

# Build local dependencies
WORKDIR /app
COPY shared/ts ./shared/ts
RUN cd /app/shared/ts && pnpm install && pnpm build
RUN pnpm add /app/shared/ts

# Set the working directory
WORKDIR /app/backend/api

# Build backend dependencies
COPY backend/api/ .
RUN pnpm install

# Build backend src
RUN pnpm build

# Build stage
FROM node:24.0.1-alpine AS runner

RUN corepack enable && corepack prepare pnpm@latest --activate

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 && \
    mkdir -p /app && \
    chown -R nodeuser:nodejs /app

# Set the working directory
WORKDIR /app/backend/api

# Copy necessary files from builder
COPY --from=builder --chown=nodeuser:nodejs /app/backend/api/package.json .
COPY --from=builder --chown=nodeuser:nodejs /app/shared/ts/dist ./node_modules/@highwater/types
COPY --from=builder --chown=nodeuser:nodejs /app/backend/api/dist ./dist

# Install only production dependencies
RUN npm install --production

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Expose the port the app runs on
EXPOSE 4000

# Switch to non-root user
USER nodeuser

# Start the application
CMD ["pnpm", "start"]
