FROM node:20-alpine

# Set root workspace as working directory
WORKDIR /app

# Copy root package.json and lock file
COPY package.json package-lock.json ./

# Copy backend workspace package definition
COPY server/package.json ./server/

# Install all workspace dependencies
RUN npm install

# Copy server source code
COPY server ./server

# Set working dir to server
WORKDIR /app/server

# Copy and set entrypoint script (if needed for DB seeding)
COPY server/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
