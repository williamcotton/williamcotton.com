# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Install make and other build essentials
RUN apt-get update && \
  apt-get install -y build-essential

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
  apt-get install -y nodejs

# Copy necessary files for build
COPY . ./

# Restore and build .NET dependencies
RUN dotnet new tool-manifest
RUN dotnet tool install fable
RUN dotnet tool restore
RUN dotnet restore

# Install npm dependencies and run the build script which includes Fable compilation
RUN npm install
RUN npm run build

# Runtime stage
FROM node:22-alpine
WORKDIR /app

# Copy the built assets from the previous stage
COPY --from=build-env /app/build ./build

# Additionally, copy all JavaScript files from /src to the runtime container
COPY --from=build-env /app/src ./src

# Remove .fs files from the src directory
RUN find ./src -type f -name "*.fs" -exec rm -f {} +

# Copy other necessary files
COPY --from=build-env /app/package.json ./
COPY --from=build-env /app/node_modules ./node_modules
COPY --from=build-env /app/fable_modules ./fable_modules

# Start the application
CMD ["npm", "start"]
