
# Step 1: Use a base image with Go and other dependencies
FROM golang:1.21-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the source code from the host machine to the container
COPY backend .

# Step 4: Build the Go application inside the container
RUN go build -o backend .

# Step 5: Set the entry point to run the built application
CMD ["./backend"]
