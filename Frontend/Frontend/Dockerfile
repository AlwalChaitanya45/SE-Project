# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose the port for frontend
EXPOSE 3000

# Start the React app with serve
CMD ["serve", "-s", "build", "-l", "3000"]
