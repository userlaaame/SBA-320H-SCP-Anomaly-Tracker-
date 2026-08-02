# SCP Anomaly Tracker

A React single-page application for browsing SCP Foundation anomalies, filtering
them by object class, and viewing containment files with last-known sighting
coordinates.

**Live site:** https://scp-anom-tracker.netlify.app/  
**API:** https://sba-319-mongodb-database-application-scp.onrender.com/scps  
**API repository:** https://github.com/userlaaame/SBA-319-MongoDB-Database-Application-SCP-Foundation

## Technologies

- **React 19 + Vite** - component-based UI with fast dev builds
- **Context API + useReducer** - centralized state without prop drilling
  (approved by instructor in place of Redux Toolkit)
- **React Router** - client-side routing
- **Leaflet / react-leaflet** - OpenStreetMap tiles for sighting markers
- **Fetch API** - AJAX requests to the external data source
- **Netlify** - hosting, with an SPA redirect rule
- **Backend (separate project):** - Node, Express 5, Mongoose, MongoDB Atlas, deployed on Render

## Approach

The data source is a REST API I built and deployed for SBA 319. No backend code is shared with this project; the React app consumes it over HTTP exactly as it would any third-party API.

**State management.** All application state lives in a single reducer inside
`AnomalyContext`: the fetched anomaly list, request status, the selected
anomaly's id, and the two filter values. Components read state and dispatch
actions through a `useAnomalies()` hook rather than receiving props through
intermediate layers.

**Computed, not stored.** The filtered list is never held in state. It is derived on each render from the raw list plus the search text and class filter. Storing it would mean keeping three values in sync instead of one.

**Data fetching.** A single fetch runs in `useEffect` with an empty dependency array, so it fires once on mount. Because `fetch` only rejects on network failure, the response is explicitly checked with `res.ok` before parsing otherwise a 500 would be treated as valid data.

**Loading states matter here.** The API is on Render's free tier, which sleeps after inactivity. The first request can take roughly 50 seconds, so the reducer tracks a `status` field and the UI shows a connection message instead of appearing broken.

**Object class filters are derived from the data** rather than hardcoded, using a `Set` over the fetched anomalies. The filter list can never drift out of sync with what the database actually contains.

## Usage

Click any anomaly in the sidebar to load its containment file. Use the search field to filter by item number or title, and the class chips to filter by object class. The first load may take up to a minute while the API instance wakes.

Local development:

```
npm install
npm run dev
```

Create a `.env` file with `VITE_API_URL` set to the API base URL (see `.env.example`).

## Unsolved Problems and Roadmap

- **Cold starts are visible to users.** The free-tier API sleeps; a paid instance or a keep-alive ping would remove the delay.

- **No detail route.** Anomaly details render in a card rather than at `/scps/:id`, so a specific anomaly can't be linked to directly. The router is installed and ready for this.

- **No error boundary.** A failed fetch shows a message, but a render-time error would blank the page.

- **Images are unpopulated.** The `imageUrl` field exists in the schema but is empty; wiki images are served over HTTP and would be blocked as mixed content on an HTTPS site. Anomalies without images render a `[data expunged]` placeholder.

- **Planned for the Cornerstone project:** user-submitted sighting reports that increment each anomaly's encounter count, proximity search using the `2dsphere` index already present on the API, and a wildcard "access denied" 404 route.

## Attribution

SCP names, object classes, and containment concepts are adapted from the [SCP Foundation wiki](https://scp-wiki.wikidot.com/), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

Incident records and personnel are original to this project. Map tiles © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.

This is unofficial fan work.