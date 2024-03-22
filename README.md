# Crash MounikaNukala

A collision tracking app

## Installations

### Angular 17 (Front end)

- Angular installation: https://angular.io/docs

Run the following code:
`cd crash`

`npm i`

Once you have installed and build the app, run the command to start the app:

`ng serve`

### PostgreSQL Database

• Run pgAdmin app or run your PostgreSQL locally through a command line
• Create a new Database and name it "Crash"
• Change the connection string values to `init.js` and `appsettings.json` files
to your db connection properties for:

- user
- password
- host
- port
- database

  • Once you have created the database, open up a terminal and from the project's path, run the following commands:

`cd crash`
`npm run postgres-init`

### .NET Core API (Backend)

- .NET SDK 8.0 required

Run the following code:
`cd ./api/crash`

`dotnet ef migrations add InitialCreate`

`dotnet ef database update`

`dotnet build`

Once you have build the backend api, run the command to start the api:

`dotnet run`

### Completed above steps in my location machine (MARIO)

### Second commit testing the person token (MARIO)

**ACCIDENT REPORT CODE:**

- For testing this branch for the crash app, you need to run the "ng g environments"
- Enter the following key pairs:
- export const environment = {
  production: false,
  WEATHER_API_KEY :"",
  GOOGLE_API_KEY:"",
  GOOGLE_NEARBY_Endpoint : "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
  WEATHER_Endpoint : "https://api.openweathermap.org/data/2.5/weather?units=metric",
  PLACES_Endpoint: "https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Cformatted_phone_number%2Cicon"
  };
- modify index.hmtl and replace YOUR_API_KEY with a valid google API key
- run NPM install

=======

### Completed above steps in my local machine (MARIO)

### Second commit testing the personal token (MARIO)

=======
Task Completed - Viji
