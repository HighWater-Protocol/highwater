# Build stage
FROM node:24.0.1-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

# Set up working directory
WORKDIR /app

# Copy and build shared package
COPY shared/ts/package.json shared/ts/pnpm-lock.yaml ./shared/ts/
RUN cd shared/ts && pnpm install

# Copy and build frontend
COPY frontend/package.json frontend/pnpm-lock.yaml ./frontend/
RUN cd frontend && pnpm install

# Copy remaining source files
COPY shared/ts ./shared/ts
COPY frontend ./frontend

# Build shared package
RUN cd shared/ts && pnpm run build

# Build frontend
WORKDIR /app/frontend
RUN pnpm build

# Runtime Image
FROM node:24.0.1-alpine AS runner

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --chown=nextjs:nodejs --from=builder /app/frontend/.next ./.next
COPY --chown=nextjs:nodejs --from=builder /app/frontend/public ./public
COPY --chown=nextjs:nodejs --from=builder /app/frontend/package.json ./package.json
COPY --chown=nextjs:nodejs --from=builder /app/frontend/next.config.ts ./next.config.ts

# Install production dependencies
RUN npm install next
# Install Turbo globally
# RUN npm install -g turbo

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

USER nextjs

# production command
CMD ["pnpm", "start"]
