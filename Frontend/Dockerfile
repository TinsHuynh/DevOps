# ===== STAGE 1: Build =====
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build Vite
RUN npm run build

# ===== STAGE 2: Production (Nginx) =====
FROM nginx:1.27-alpine

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files từ stage 1
COPY --from=builder /app/build /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
