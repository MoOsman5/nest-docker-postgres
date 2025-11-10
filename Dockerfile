# -------------------- BUILDER --------------------
FROM node:24-alpine AS builder

# Install build tools required for node modules with native bindings
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package file first (enables caching)
COPY package*.json ./

# Install ALL dependencies (including dev dependencies needed for build)
RUN npm install

# Copy the rest of your code
COPY . .

# Build NestJS into dist/
RUN npm run build


# -------------------- RUNNER --------------------
FROM node:24-alpine AS runner

WORKDIR /app

# Copy ONLY package.json
COPY package*.json ./

# Install ONLY prod dependencies
RUN npm install --omit=dev

# Copy compiled output from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
