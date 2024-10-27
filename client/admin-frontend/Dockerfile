# Dockerfile

# Stage 1: Build the Angular application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of the application source code
COPY . .

# Expose the necessary port
EXPOSE 4200

# Serve Angular app, binding to all network interfaces
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
