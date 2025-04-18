# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the backend code
COPY . .

# Expose the port for backend
EXPOSE 5000

# Start the Express server
CMD ["node", "index.js"]
