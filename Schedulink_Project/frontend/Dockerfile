# Use an official Node.js image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Use a simple server to serve static files
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Serve the build folder
CMD ["serve", "-s", "dist"]

