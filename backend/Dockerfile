FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY . .
RUN dotnet restore "EmprestimoLivrosAPI.csproj"

RUN dotnet build "EmprestimoLivrosAPI.csproj" -c Release --no-restore

RUN dotnet publish "EmprestimoLivrosAPI.csproj" -c Release -o /app/publish --no-build

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 5103 

ENTRYPOINT ["dotnet", "EmprestimoLivrosAPI.dll"]