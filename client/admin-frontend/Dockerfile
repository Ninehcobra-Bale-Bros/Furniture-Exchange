# Dockerfile for fe-admin

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

# Build the Angular application
RUN ng build --configuration production

# Stage 2: Copy build files to Nginx
FROM nginx:alpine

# Copy the custom nginx.conf to the Nginx configuration directory
# COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy build files to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the necessary port for Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
