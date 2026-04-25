// DashboardPage.tsx
import { useState } from "react";
import ReportFilter from "../components/ReportFilter";
import ReportList from "../components/ReportList";
import FileList from "../components/FileList";
import {
  fetchReports,
  fetchCsvFiles,
  downloadCsvFile,
} from "../services/apiService";

import type { Report, CsvFile } from "../services/apiService";

export default function DashboardPage() {
  const [reportType, setReportType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [files, setFiles] = useState<CsvFile[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleHolen = async () => {
    if (!reportType || !from || !to) {
      setError("Bitte alle Felder ausfüllen.");
      return;
    }
    try {
      setError(null);
      setSelectedReport(null);
      setFiles([]);
      setLoadingReports(true);
      const data = await fetchReports(reportType, from, to);
      setReports(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingReports(false);
    }
  };

  const handleSelectReport = async (report: Report) => {
    try {
      setError(null);
      setSelectedReport(report);
      setFiles([]);
      setLoadingFiles(true);
      const data = await fetchCsvFiles(report.id);
      setFiles(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleSelectFile = async (file: CsvFile) => {
    try {
      setError(null);
      await downloadCsvFile(selectedReport!.id, file.id, file.name);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between relative h-16 shadow-md">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold tracking-wide">
          Report Dashboard
        </h1>
      </header>

      {/* Obere Filterleiste */}
      <div className="flex justify-center mt-8">
        <div className="bg-white rounded-xl shadow-md px-8 py-5 w-fit">
          <ReportFilter
            reportType={reportType}
            setReportType={setReportType}
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
            onHolen={handleHolen}
          />
        </div>
      </div>

      {/* Fehlermeldung */}
      {error && (
        <div className="flex justify-center mt-4">
          <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded text-sm">
            {error}
          </div>
        </div>
      )}

      {/* Listen */}
      <div className="flex justify-center gap-6 mt-6 px-4 w-full max-w-5xl mx-auto">
        <ReportList
          reports={reports}
          selectedReportId={selectedReport?.id ?? null}
          onSelectReport={handleSelectReport}
          loading={loadingReports}
        />
        <FileList
          files={files}
          onSelectFile={handleSelectFile}
          loading={loadingFiles}
        />
      </div>
    </div>
  );
}
