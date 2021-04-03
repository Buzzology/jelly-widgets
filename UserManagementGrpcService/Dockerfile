#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 5005

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["UserManagementGrpcService/UserManagementGrpcService.csproj", "UserManagementGrpcService/"]
COPY ["UserManagementIntegrationEvents/UserManagementIntegrationEvents.csproj", "UserManagementIntegrationEvents/"]
COPY ["MicroservicesProjectLibrary/MicroservicesProjectLibrary.csproj", "MicroservicesProjectLibrary/"]
COPY ["UserManagementData/UserManagementData.csproj", "UserManagementData/"]
RUN dotnet restore "UserManagementGrpcService/UserManagementGrpcService.csproj"
COPY . .
WORKDIR "/src/UserManagementGrpcService"
RUN dotnet build "UserManagementGrpcService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "UserManagementGrpcService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "UserManagementGrpcService.dll"]