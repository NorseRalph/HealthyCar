# Step 1: Use an official Node.js runtime as a parent image
FROM node:latest

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the project files into the container
COPY . .

# Step 5: Build the app for production
RUN npm run build

# Step 6: Install a simple http server for serving static content
RUN npm install -g serve

# Step 7: Set the command to start the server
CMD ["serve", "-s", "build"]

# Step 8: Expose the port the app runs on
EXPOSE 5000
