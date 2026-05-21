# Report Dashboard

Frontend dashboard for retrieving and downloading reports through REST APIs.

This project is a public showcase inspired by a similar reporting dashboard I worked on during my time at R+V Versicherung.  
It demonstrates the overall architecture, frontend structure and REST integration without exposing any internal or confidential company data.

---

## Features

- Filter reports by report type and date range
- Dynamically retrieve reports from a REST API
- Display CSV files belonging to a report
- Download CSV files directly
- Mock API integration using MSW
- OpenAPI-based API documentation

---

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- MSW (Mock Service Worker)
- OpenAPI 3.0

---

## Project Structure

```txt
src/
 ├── components/
 ├── services/
 ├── mocks/
 └── pages/
```

---

## Local Setup

### 1. Clone repository

```bash
git clone https://github.com/H-Sakah/report-dashboard.git
cd report-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Generate MSW service worker

```bash
npx msw init public/ --save
```

### 4. Start development server

```bash
npm run dev
```

---

## Backend Integration

After cloning the `report-backend` repository:

### 1. Disable MSW in `src/main.tsx`

```ts
async function enableMocking() {
  return;
}
```

### 2. Verify backend URL in `src/services/apiService.ts`

```ts
const BASE_URL = "http://localhost:8080/api/v1";
```

### 3. Start backend

```bash
./gradlew bootRun
```
