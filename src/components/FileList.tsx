// FileList.tsx
import type { CsvFile } from "../services/apiService";

interface FileListProps {
  files: CsvFile[];
  onSelectFile: (file: CsvFile) => void;
  loading: boolean;
}

const FileList = ({ files, onSelectFile, loading }: FileListProps) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-xl bg-white shadow-md flex-1 overflow-hidden">
      <div className="bg-blue-600 px-4 py-3 font-semibold text-sm text-white tracking-wide">
        Dateiliste
      </div>
      <div className="overflow-y-auto h-72">
        {loading ? (
          <div className="px-4 py-6 text-sm text-gray-400 text-center">
            Lädt...
          </div>
        ) : files.length === 0 ? (
          <div className="px-4 py-6 text-sm text-gray-400 text-center">
            Report auswählen um Dateien zu laden
          </div>
        ) : (
          files.map((file) => (
            <div
              key={file.id}
              onClick={() => onSelectFile(file)}
              className="px-4 py-3 text-sm cursor-pointer border-b border-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {file.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FileList;
