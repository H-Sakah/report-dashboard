interface ReportFilterProps {
  reportType: string;
  setReportType: (value: string) => void;
  from: string;
  setFrom: (value: string) => void;
  to: string;
  setTo: (value: string) => void;
  onHolen: () => void;
}

const ReportFilter = ({
  reportType,
  setReportType,
  from,
  setFrom,
  to,
  setTo,
  onHolen,
}: ReportFilterProps) => {
  return (
    <div className="flex gap-4 items-end">
      {/* Reporttyp Dropdown */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Reporttyp</label>
        <select
          className="border px-3 py-2 rounded"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="">Wählen...</option>
          <option value="report1">Report 1</option>
          <option value="report2">Report 2</option>
        </select>
      </div>

      {/* Zeitraum: Von */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Von</label>
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>

      {/* Zeitraum: Bis */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Bis</label>
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      {/* Holen Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded h-fit"
        onClick={onHolen}
      >
        Holen
      </button>
    </div>
  );
};

export default ReportFilter;
