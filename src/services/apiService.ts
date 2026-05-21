// const BASE_URL = "http://localhost:8080/api/v1";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

// ── Types ────────────────────────────────────────────────────────────────────

export interface Report {
  id: string;
  name: string;
  reportType: string;
  createdAt: string;
}

export interface CsvFile {
  id: string;
  name: string;
}

// ── API Calls ────────────────────────────────────────────────────────────────

export async function fetchReports(
  reportType: string,
  from: string,
  to: string,
): Promise<Report[]> {
  const params = new URLSearchParams({ reportType, from, to });
  const response = await fetch(`${BASE_URL}/reports?${params}`);

  if (!response.ok) {
    throw new Error(`Fehler beim Laden der Reports: ${response.status}`);
  }

  return response.json();
}

export async function fetchCsvFiles(reportId: string): Promise<CsvFile[]> {
  const response = await fetch(`${BASE_URL}/reports/${reportId}/files`);

  if (!response.ok) {
    throw new Error(`Fehler beim Laden der Dateien: ${response.status}`);
  }

  return response.json();
}

export async function downloadCsvFile(
  reportId: string,
  fileId: string,
  fileName: string,
): Promise<void> {
  const response = await fetch(
    `${BASE_URL}/reports/${reportId}/files/${fileId}/download`,
  );

  if (!response.ok) {
    throw new Error(`Fehler beim Download: ${response.status}`);
  }

  // Blob erzeugen und als Datei öffnen
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(url);
}
