
# Crash App - Collision Tracking

This application allows tracking of vehicle collisions. It consists of an Angular frontend, a .NET Core backend API, and a PostgreSQL database.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

1.  **Git:** For cloning the repository. ([Download](https://git-scm.com/download/win))
    *   Verify: `git --version`
2.  **Node.js and npm:** LTS version recommended (includes npm). ([Download](https://nodejs.org/))
    *   Verify: `node -v` and `npm -v`
3.  **Angular CLI:** Command Line Interface for Angular.
    *   Install: `npm install -g @angular/cli`
    *   Verify: `ng version`
4.  **.NET SDK 8.0:** Required for the backend API. ([Download SDK](https://dotnet.microsoft.com/download/dotnet/8.0))
    *   Verify: `dotnet --version`
5.  **Entity Framework Core Tools:** For .NET database migrations.
    *   Install: `dotnet tool install --global dotnet-ef`
    *   Verify: `dotnet ef --version` (May require terminal restart)
6.  **PostgreSQL:** Database server. ([Download](https://www.postgresql.org/download/windows/))
    *   During installation, remember the password you set for the `postgres` user.
    *   Install **pgAdmin 4** (usually included with the PostgreSQL installer) for database management.

## Required API Keys

You will need API keys from the following services:

1.  **Google Maps Platform:**
    *   Go to [Google Cloud Console](https://console.cloud.google.com/).
    *   Enable **Maps JavaScript API** and **Places API**.
    *   Create an API Key under "Credentials".
    *   **Important:** Restrict the key (e.g., HTTP referrers `http://localhost:4200/*`, API restrictions).
    *   Copy the key.
2.  **OpenWeatherMap:**
    *   Sign up at [https://openweathermap.org/](https://openweathermap.org/).
    *   Find your API key under the "API keys" tab.
    *   Copy the key. (May take a few minutes to become active after signup).
3.  **Geoapify:** (Used for additional geospatial features)
    *   Sign up at [https://www.geoapify.com/](https://www.geoapify.com/).
    *   Find your API key in your account settings.
    *   Copy the key.

## Setup Instructions

Follow these steps sequentially:

**1. Clone the Repository**


git clone https://github.com/ianrbaguio/crash-app.git
cd crash-app


2. Setup PostgreSQL Database

a. Create Database:
* Open pgAdmin 4 and connect to your local PostgreSQL server (using the password you set).
* Right-click "Databases" -> "Create" -> "Database...".
* Name the database exactly: Crash
* Save.

b. Prepare Database Initialization Script:
* Edit Root package.json: Open the package.json file located directly in the crash-app root directory. It might be minimal. Modify it to include the pg dependency and the postgres-init script:
json { "dependencies": { "guid-typescript": "^1.0.9", "pg": "^8.11.3" // Or latest version }, "scripts": { "postgres-init": "node init.js" } }
* Install Root Dependencies: Run this command in the root crash-app directory:
bash npm install
* Locate and Edit init.js: The init.js file is likely located at crash-app/crash/.data/init.js. Copy this file to the root crash-app/ directory. Then, edit the copied init.js in the root directory:
* Update the dbConfig section with your PostgreSQL connection details (user, password, host, port, database).
* Find the line starting with const query = readFileSync(...). Correct the path to the SQL file to point to its original location relative to the root:
javascript // Change this line: const query = readFileSync("crash/.data/scripts/crash-migration.sql", "utf-8");
* Clean crash-migration.sql: Open the file crash-app/crash/.data/scripts/crash-migration.sql. Remove any non-SQL text (like ======= or comments like Task Completed - Viji) and ensure the SQL syntax is correct. (Refer to the corrected version provided during troubleshooting if needed). Save the file.

c. Run Initialization Script:
* Make sure you are in the root crash-app directory in your terminal.
* Run the script:
bash npm run postgres-init
* Look for success messages ("Connected...", "Database migration script executed successfully.").

3. Setup .NET Core Backend API

a. Navigate to API Directory:
bash cd api/crash
(You should be in crash-app/api/crash)

b. Configure Connection String:
* Open appsettings.json.
* Locate the ConnectionStrings.DefaultConnection value.
* Update it with your PostgreSQL details (User ID, Password, Host, Port, Database=Crash). Example:
json "DefaultConnection": "User ID=postgres;Password=YOUR_POSTGRES_PASSWORD;Host=localhost;Port=5432;Database=Crash;"
* Save the file.

c. Apply Database Migrations:
* Run database update first to apply existing migrations:
bash dotnet ef database update
* If the above command fails or indicates model changes, you might need to create an initial migration (only if the Migrations folder is empty or doesn't exist):
bash dotnet ef migrations add InitialCreate dotnet ef database update

d. Build the API:
bash dotnet build

e. Run the API:
bash dotnet run
* Note the URLs the API is listening on (e.g., http://localhost:5000 or https://localhost:7123). Keep this terminal window open!

4. Setup Angular Frontend

a. Open a New Terminal: Leave the backend API terminal running.
b. Navigate to Frontend Directory:
bash cd C:\path\to\crash-app\crash
(Navigate back to your project root and then into the crash subfolder)

c. Configure Environment:
* Create the folder src/environments if it doesn't exist.
* Based on angular.json, the development server uses environment.development.ts. Create/Edit the file src/environments/environment.development.ts:
typescript export const environment = { production: false, WEATHER_API_KEY: "YOUR_OPENWEATHERMAP_API_KEY", GOOGLE_API_KEY: "YOUR_GOOGLE_MAPS_API_KEY", GOOGLE_NEARBY_Endpoint: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?", WEATHER_Endpoint: "https://api.openweathermap.org/data/2.5/weather?units=metric", PLACES_Endpoint: "https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Cformatted_phone_number%2Cicon", Geoapify_API_KEY: "YOUR_GEOAPIFY_API_KEY", Geoapify_API_Endpoint: "https://api.geoapify.com/", Crash_API_Endpoint: "http://localhost:5000", // IMPORTANT: Use the actual URL your backend is running on (from step 3e) CarVIN_API_Endpoint: "" // Leave empty unless configured };
* Replace the placeholder API keys and verify/update Crash_API_Endpoint.
* Save the file.
* (Recommended) Create/Edit src/environments/environment.ts with the same keys but set production: true.


d. Install Frontend Dependencies:
bash npm install

e. Serve the Frontend:
bash ng serve
* Wait for compilation. Keep this terminal window open!

🆕 OCR Auto-Fill Integration (Driver's License via Azure AI)
This feature allows users to upload a driver's license image in the Party Details form, and automatically extracts key fields using Azure Document Intelligence (OCR).

🔍 Extracted Fields
First Name

Last Name

Driver License Number

Address (formatted: Street, City, State PostalCode)

🛠️ Setup Instructions
1. 📁 Python Script Location
Make sure the OCR script exists at:

bash
Copy
Edit
crash-app/api/ocr/ocr.py
This script uses the Azure AI Document Intelligence API.

2. 🐍 Python Environment Setup
Navigate to the ocr/ folder and create a virtual environment:

bash
Copy
Edit
cd crash-app/api/ocr
python -m venv venv
venv\Scripts\activate  # For Windows
Then install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
If requirements.txt doesn’t exist, install directly:

bash
Copy
Edit
pip install azure-ai-documentintelligence azure-core
pip freeze > requirements.txt
3. 🔧 .NET Backend Changes
The backend exposes a new endpoint:

bash
Copy
Edit
POST /api/accidents/upload-license
Accepts a file upload (image of license)

Saves image to ocr/temp/

Calls ocr.py and returns extracted values as JSON

📄 File changed: AccidentsController.cs

4. 🧪 Angular Frontend Changes
Component:
crash-app/crash/src/app/accident-report-container/partydialog.component.ts

What’s Added:

A file input to upload license image

Spinner shown during OCR processing

Fields auto-filled via setValue(...) using API response

5. 🌐 API Configuration
Ensure your Angular app points to the correct backend port.

In partydialog.component.ts:

ts
Copy
Edit
fetch('http://localhost:5119/api/accidents/upload-license', { ... });
(Adjust port if needed.)

✅ Example Flow
User clicks Add Party Details

Uploads a license image

Azure AI reads the image

Form auto-fills with extracted details

Running the Application
Ensure both terminal windows (dotnet run for backend, ng serve for frontend) are running without errors.

Open your web browser and navigate to the URL provided by ng serve, usually:
http://localhost:4200/

The Crash App should now be running.
