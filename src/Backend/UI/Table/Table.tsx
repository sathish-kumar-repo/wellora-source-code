// src/components/Table.tsx

import { FC, ReactNode, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./Table.css";
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
      <div className="glass-table error-message">
        ❌ Error: Use only one of `customDomain` or a boolean domain flag (like
        `a`, `b`, `c`).
      </div>
    );
  }

  if (file && children) {
    return (
      <div className="glass-table error-message">
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

      // if (jsonData.length > 0) {
      //   const [headerRow, ...bodyRows] = jsonData as (string[] | any[])[];
      //   setHeaders(headerRow as string[]);
      //   const formattedData = bodyRows
      //     .filter((row, idx) => {
      //       const isValid = Array.isArray(row) && row.length > 0;
      //       if (!isValid) {
      //         console.warn(`⚠️ Skipping invalid row at index ${idx + 1}:`, row);
      //       }
      //       return isValid;
      //     })
      //     .map((row, _) => {
      //       const entries = headerRow.map((header, i) => {
      //         const value = row[i] !== undefined ? row[i] : "";
      //         return [header, value];
      //       });

      //       // Ensure every entry is a valid [key, value] pair
      //       const validEntries = entries.filter(
      //         (entry) => Array.isArray(entry) && entry.length === 2
      //       );

      //       return Object.fromEntries(validEntries);
      //     });

      //   setData(formattedData);
      // }
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

  return (
    <div className={`glass-table text-align-${textAlign}`}>
      <table>
        {file ? (
          <>
            {loading ? (
              <thead>
                <tr>
                  <td colSpan={headers.length} style={{ textAlign }}>
                    ⏳ Loading...
                  </td>
                </tr>
              </thead>
            ) : error ? (
              <thead>
                <tr>
                  <td colSpan={headers.length} style={{ textAlign }}>
                    {error}
                  </td>
                </tr>
              </thead>
            ) : (
              <>
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index} className="table-header">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i}>
                      {headers.map((header, j) => (
                        <td key={j} className="table-cell">
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
