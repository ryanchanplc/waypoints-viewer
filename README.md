# Waypoints Viewer

This is a waypoints viewer that

- will take a start and a end location as input
- get a set of waypoints, total travel distance and total time that can travel from A to B from a mock API
- The waypoints are shown on the google map in their order

# Additional Feature

- a reverse button swap between start and end location
- can directly use current location
- local storage on browser to save perviously searched locations and let user to select
- a checkbox to toggle the display of driving route through all the waypoints

# Getting Started

### Google API Key

Prepare you google api key and enusre the api services below are activated with your key

- Places API
- Maps JavaScript API
- Directions API
- Geocoding API

### Environment Variable

Copy the `.env.example` and rename to `.env`

```
cd waypoints-viewer
cp .env.example .env
```

Add your google api key to the variable `REACT_APP_GOOGLE_MAP_KEY` inside the `.env` file that you have created.
You can also edit other variables or create other dotenv file depending on the environment. (`env.development`, `env.local`,`env.test`)

```
REACT_APP_GOOGLE_MAP_KEY=<<YOUR GOOGLE API KEY>>
REACT_APP_API_BASE_URL=<<API URL>>
REACT_APP_ROUTE_API_ENDPOINT=<<API ENDPOINT>>
```

# Install dependencies

```
cd waypoints-viewer
yarn
```

# Run Locally

```
yarn start
```

visit `http://localhost:3000` on the browser

# Test

```
yarn test
```

# Build Production

```
yarn build
```
