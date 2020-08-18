# Waypoints Viewer

Please find the demo on heroku : [https://waypoints-viewer.herokuapp.com/](https://waypoints-viewer.herokuapp.com/)

# Additional Feature

- places autocomplete
- reverse button swap between start and end location
- use current location
- local storage on browser to save perviously searched locations
- a checkbox to toggle the display of driving route

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

- Add your google api key to the variable `REACT_APP_GOOGLE_MAP_KEY` inside the `.env` file that you have created.
- Add your API Base url to the variable `REACT_APP_API_BASE_URL` (e.g. https://yourdomain.com)
- Add your API endpoint to the variable `REACT_APP_ROUTE_API_ENDPOINT` (e.g. route)

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
