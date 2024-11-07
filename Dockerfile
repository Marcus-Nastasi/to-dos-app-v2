# Dockerfile
FROM node:latest

# Creating workdir
WORKDIR /app

# Copy files to container
COPY . /app

# Install application dependencies
RUN npm install

# Expose port 3000 
EXPOSE 3000

# Run application
CMD ["npm", "run", "dev"]
