// src/components/Table.tsx

import { FC, ReactNode, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  DomainKey,
  resolveDomainKeyFromProps,
  getDomainUrl,
  normalizeUrl,
} from "../../utils/domain";

interface TableProps extends Record<string, any> {
  children?: ReactNode;
  textAlign?: "left" | "center" | "right";
  file?: string;
  customDomain?: string;
  domainKey?: DomainKey;
}

interface RowData {
  [key: string]: string | number;
}

const Table: FC<TableProps> = (props) => {
  const {
    children,
    textAlign = "left",
    file,
    customDomain,
    domainKey: directKey,
  } = props;

  const [data, setData] = useState<RowData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resolvedKey = resolveDomainKeyFromProps(props) || directKey;

  // ❌ Error: if both are set
  if (file && customDomain && resolvedKey) {
    return (
      <div className="card p-4 border-error-200 bg-error-50 text-error-700">
        ❌ Error: Use only one of `customDomain` or a boolean domain flag (like
        `a`, `b`, `c`).
      </div>
    );
  }

  if (file && children) {
    return (
      <div className="card p-4 border-warning-200 bg-warning-50 text-warning-700">
        ⚠️ Error: Provide either `file` or `children`, not both.
      </div>
    );
  }

  const fetchExcelData = async (fullUrl: string) => {
    console.log(fullUrl);

    setError(null);
    try {
      const response = await fetch(fullUrl);
      const arrayBuffer = await response.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: "array" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (jsonData.length > 0) {
        const [headerRow, ...bodyRows] = jsonData as (string[] | any[])[];
        setHeaders(headerRow as string[]);
        const formattedData = bodyRows.map((row) =>
          Object.fromEntries(headerRow.map((h, i) => [h, row[i]]))
        );
        setData(formattedData);
      }
    } catch (err) {
      console.error("Error fetching or parsing Excel file:", err);
      setError("❌ Failed to load Excel data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (file && !children) {
      const baseDomain = getDomainUrl(resolvedKey, customDomain);
      // Automatically prefix with /wellora/excel/ if file path is simple (no slashes or only root slash)
      const normalizedFile =
        file.startsWith("/") && !file.startsWith("/wellora/")
          ? `/wellora/excel${file}`
          : file;

      const fullUrl = normalizeUrl(normalizedFile, baseDomain);

      fetchExcelData(fullUrl);
    }
  }, [file, children, resolvedKey, customDomain]);

  const alignmentClass = {
    left: "text-left",
    center: "text-center", 
    right: "text-right"
  }[textAlign];

  return (
    <div className="card overflow-x-auto mb-6">
      <table className={`w-full border-collapse min-w-full ${alignmentClass}`}>
        {file ? (
          <>
            {loading ? (
              <thead>
                <tr>
                  <td colSpan={headers.length} className={`p-4 ${alignmentClass}`}>
                    ⏳ Loading...
                  </td>
                </tr>
              </thead>
            ) : error ? (
              <thead>
                <tr>
                  <td colSpan={headers.length} className={`p-4 text-error-600 ${alignmentClass}`}>
                    {error}
                  </td>
                </tr>
              </thead>
            ) : (
              <>
                <thead>
                  <tr className="border-b border-secondary-200 dark:border-secondary-700">
                    {headers.map((header, index) => (
                      <th key={index} className="p-3 font-semibold text-secondary-900 dark:text-secondary-100 uppercase tracking-wider text-sm">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i} className="border-b border-secondary-100 dark:border-secondary-800 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
                      {headers.map((header, j) => (
                        <td key={j} className="p-3 text-secondary-700 dark:text-secondary-300">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </>
        ) : (
          <>{children}</>
        )}
      </table>
    </div>
  );
};

export default Table;