
# Use the official Node.js image as the base image
FROM node:18-buster-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY ui/package*.json ./

# Install the dependencies
RUN npm install
RUN npm install -g serve
# Copy the entire "ui" folder to the working directory
COPY ui/ ./

# Build the UI
RUN npm run build

# Expose the desired port (replace 3000 with the actual port used by your service)
EXPOSE 3000

WORKDIR /app/build
# Start the service
CMD ["serve", "."]
