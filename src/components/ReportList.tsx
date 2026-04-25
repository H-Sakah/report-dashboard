// ReportList.tsx
import type { Report } from "../services/apiService";

interface ReportListProps {
  reports: Report[];
  selectedReportId: string | null;
  onSelectReport: (report: Report) => void;
  loading: boolean;
}

const ReportList = ({
  reports,
  selectedReportId,
  onSelectReport,
  loading,
}: ReportListProps) => {
  return (
    <div className="fflex flex-col border border-gray-200 rounded-xl bg-white shadow-md flex-1 overflow-hidden">
      <div className="bg-blue-600 px-4 py-3 font-semibold text-sm text-white tracking-wide">
        Reportliste
      </div>

      <div className="overflow-y-auto h-72">
        {loading ? (
          <div className="px-4 py-6 text-sm text-gray-400 text-center">
            Lädt...
          </div>
        ) : reports.length === 0 ? (
          <div className="px-4 py-6 text-sm text-gray-400 text-center">
            Keine Reports vorhanden
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className={`px-4 py-3 text-sm cursor-pointer border-b border-gray-100 transition-colors duration-150
              ${
                selectedReportId === report.id
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-l-blue-600"
                  : "hover:bg-gray-50 text-gray-700"
              }
            `}
            >
              {report.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportList;
