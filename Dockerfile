# Use official Node.js image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile || npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3500
EXPOSE 3000

# Start the app
CMD ["npm", "start"] 