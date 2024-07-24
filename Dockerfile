# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the .env file to the working directory
COPY .env .env

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD ["node", "server.js"]
