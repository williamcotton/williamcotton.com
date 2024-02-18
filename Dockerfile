# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Install make and other build essentials
RUN apt-get update && \
  apt-get install -y build-essential

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash - && \
  apt-get install -y nodejs

# Copy necessary files for build
COPY . ./

# Restore and build .NET dependencies
RUN dotnet tool restore
RUN dotnet restore

# Install npm dependencies, build the project using Fable, and run the npm build script
RUN npm install

# Start the application
CMD ["npm", "start"]