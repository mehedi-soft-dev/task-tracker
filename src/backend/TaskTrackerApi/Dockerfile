# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY TaskTrackerApi/*.csproj ./TaskTrackerApi/
RUN dotnet restore TaskTrackerApi/TaskTrackerApi.csproj

# Copy everything else and build
COPY . .
WORKDIR /src/TaskTrackerApi
RUN dotnet build TaskTrackerApi.csproj -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish TaskTrackerApi.csproj -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "TaskTrackerApi.dll"]