# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file first to maximize restore layer caching.
COPY src/Snowboard.Calculator.Api/Snowboard.Calculator.Api.csproj ./src/Snowboard.Calculator.Api/

# Restore dependencies
RUN dotnet restore src/Snowboard.Calculator.Api/Snowboard.Calculator.Api.csproj

# Copy source code
COPY . .

# Build and publish
RUN dotnet publish src/Snowboard.Calculator.Api/Snowboard.Calculator.Api.csproj -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy published app
COPY --from=build /app/publish .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Run the app
ENTRYPOINT ["dotnet", "Snowboard.Calculator.Api.dll"]
