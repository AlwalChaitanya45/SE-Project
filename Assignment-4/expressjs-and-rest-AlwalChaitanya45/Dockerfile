FROM node:14

WORKDIR /app

# Copy only package files first for better layer caching
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your backend listens on (if needed)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
