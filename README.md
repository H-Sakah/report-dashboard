# Report Dashboard

> Dieses Projekt dient als öffentliches Beispiel eines Reporting-Dashboards,
> das ich in ähnlicher Form während meiner Tätigkeit bei der **R+V Versicherung** entwickelt habe.
> Es zeigt den grundlegenden Aufbau, die Komponentenstruktur und die REST-Anbindung —
> ohne interne oder vertrauliche Daten des Unternehmens.

## Features

- Reporttyp und Zeitraum über eine Filterleiste auswählen
- Reports dynamisch von einer REST-Schnittstelle abrufen
- CSV-Dateien eines Reports anzeigen
- CSV-Dateien direkt herunterladen

## Tech Stack

- **React** mit TypeScript
- **Tailwind CSS** für das Styling
- **MSW (Mock Service Worker)** für die API-Simulation im Browser ohne Backend
- **Vite** als schnelles Build-Tool und Dev-Server
- **OpenAPI 3.0** zur API-Dokumentation

## Installation

```bash
# 1. Repository klonen
git clone https://github.com/H-Sakah/report-dashboard.git
cd report-dashboard

# 2. Abhängigkeiten installieren
npm install

# 3. MSW Service Worker generieren
npx msw init public/ --save

# 4. Entwicklungsserver starten
npm run dev
```

## Migration zum echten Backend

Sobald das Backend [report-backend](https://github.com/H-Sakah/report-backend) geklont wurde, sind nur drei Schritte nötig:

### 1. MSW deaktivieren in `src/main.tsx`

```typescript
// ALT — MSW aktiv
async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }
  const { worker } = await import("./mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

// NEU — MSW deaktiviert
async function enableMocking() {
  return;
}
```

### 2. Backend URL prüfen in `src/services/apiService.ts`

```typescript
const BASE_URL = "http://localhost:8080/api/v1";
```

### 3. Backend starten

```bash
./gradlew bootRun
```
