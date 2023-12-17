FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

EXPOSE 3100

# Start application
CMD ["npm", "start"]