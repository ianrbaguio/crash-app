**Please Update your Environment variables as follows:
**
export const environment = {
    production: false,
    WEATHER_API_KEY :"",
    GOOGLE_API_KEY:"",
    GOOGLE_NEARBY_Endpoint : "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
    GOOGLE_NEARBY_PLACES_Endpoint : "https://places.googleapis.com/v1/places:searchNearby",
    WEATHER_Endpoint : "https://api.openweathermap.org/data/2.5/weather?units=metric",
    PLACES_Endpoint: "https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Cformatted_phone_number%2Cicon",
    ROAD_Endpoint: "https://roads.googleapis.com/v1/speedLimits?",
    Crash_API_Endpoint: "https://localhost:44324",
    CarVIN_API_Endpoint: "https://carapi.app/api/vin/",
    Geoapify_API_Endpoint: "https://api.geoapify.com/",
    Geoapify_API_KEY: ""
  };
  



# Crash

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


As of February 21st, 2024, google.maps.Marker is deprecated. Please use google.maps.marker.AdvancedMarkerElement instead. At this time, google.maps.Marker is not scheduled to be discontinued, but google.maps.marker.AdvancedMarkerElement is recommended over google.maps.Marker. While google.maps.Marker will continue to receive bug fixes for any major regressions, existing bugs in google.maps.Marker will not be addressed. At least 12 months notice will be given before support is discontinued. Please see https://developers.google.com/maps/deprecations for additional details and https://developers.google.com/maps/documentation/javascript/advanced-markers/migration for the migration guide.

Bringing in in https://www.npmjs.com/package/@angular/google-maps/v/17.3.0-rc.0 
to implement AdvancedMarkerElement as previous version is using Map.Marker element which is now deprecated 


Add a key-value pair in environment.ts file as

Crash_API_Endpoint: "http://localhost:5119"

This is the API endpoint for CRUD operations to Crash Database

