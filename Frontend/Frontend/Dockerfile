# Use a lighter node image for faster builds
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies only when package.json or package-lock.json changes
RUN npm install --legacy-peer-deps

# Copy the rest of your application code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Define the default command
CMD ["npm", "start"]
