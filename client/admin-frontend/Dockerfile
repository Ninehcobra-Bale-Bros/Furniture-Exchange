# Stage 1: Build the Angular application
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/dist/Modernize /usr/share/nginx/html

# Copy custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

# lệnh chạy docker
# docker build -t your-angular-app .
# docker run -d -p 80:80 your-angular-app

