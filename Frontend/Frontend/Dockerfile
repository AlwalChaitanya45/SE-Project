# Step 1: Use an official Node.js runtime as the base image
FROM node:14

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project folder to the container
COPY . .

# Step 6: Expose the port the app will run on
EXPOSE 3000

# Step 7: Start the app
CMD ["npm", "start"]
