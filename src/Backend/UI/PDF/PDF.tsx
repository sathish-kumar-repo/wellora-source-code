import { useNavigate } from "react-router-dom";
import {
  DomainKey,
  resolveDomainKeyFromProps,
  getDomainUrl,
  normalizeUrl,
} from "../../utils/domain";

interface PDFViewProps extends Record<string, any> {
  file: string;
  name?: string;
  customDomain?: string;
  domainKey?: DomainKey;
  heading?: boolean;
}

const PDF: React.FC<PDFViewProps> = (props) => {
  const { file, name, heading, customDomain, domainKey: directKey } = props;
  const navigate = useNavigate();

  const resolvedKey = resolveDomainKeyFromProps(props) || directKey;

  // ❌ Prevent misuse
  if (file && customDomain && resolvedKey) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
        ❌ Error: Use only one of `customDomain` or a domain key (`a`, `b`, etc.)
      </div>
    );
  }

  const baseDomain = getDomainUrl(resolvedKey, customDomain);
  const fileUrl = normalizeUrl(file, baseDomain);

  const openViewer = () => {
    navigate(`/pdf-viewer?file=${encodeURIComponent(fileUrl)}`);
  };

  return (
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-4 mb-4">
      {(name || heading) && (
        <p className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-3">
          {name || "Reference"}
        </p>
      )}
      <div 
        className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 dark:hover:bg-secondary-800 p-3 rounded-lg transition-colors duration-200"
        onClick={openViewer}
      >
        <img
          className="w-10 h-10 flex-shrink-0"
          src="/wellora/web-images/pdf.png"
          alt="pdf icon"
        />
        <p className="text-secondary-700 dark:text-secondary-300 font-medium truncate">
          {file.substring(file.lastIndexOf("/") + 1)}
        </p>
      </div>
    </div>
  );
};

export default PDF;