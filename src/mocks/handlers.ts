import { http, HttpResponse } from "msw";

const BASE_URL = "*/api/v1";

export const handlers = [
  // GET /reports
  http.get(`${BASE_URL}/reports`, ({ request }) => {
    const url = new URL(request.url);
    const reportType = url.searchParams.get("reportType");

    return HttpResponse.json([
      {
        id: "RPT-001",
        name: `${reportType} Bericht Januar 2024`,
        reportType: reportType,
        createdAt: "2024-01-31",
      },
      {
        id: "RPT-002",
        name: `${reportType} Bericht Februar 2024`,
        reportType: reportType,
        createdAt: "2024-02-29",
      },
      {
        id: "RPT-003",
        name: `${reportType} Bericht März 2024`,
        reportType: reportType,
        createdAt: "2024-03-31",
      },
    ]);
  }),

  // GET /reports/:reportId/files
  http.get(`${BASE_URL}/reports/:reportId/files`, ({ params }) => {
    const { reportId } = params;

    return HttpResponse.json([
      { id: "FILE-001", name: `${reportId}_details.csv` },
      { id: "FILE-002", name: `${reportId}_zusammenfassung.csv` },
      { id: "FILE-003", name: `${reportId}_rohdaten.csv` },
    ]);
  }),

  // GET /reports/:reportId/files/:fileId/download
  http.get(
    `${BASE_URL}/reports/:reportId/files/:fileId/download`,
    ({ params }) => {
      const { fileId } = params;

      const csvContent = `id,name,wert\n1,Eintrag A,100\n2,Eintrag B,200\n3,Eintrag C,300`;

      return new HttpResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${fileId}.csv"`,
        },
      });
    },
  ),
];
