import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
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
      <div className={styles.pdf_glass_item}>
        ❌ Error: Use only one of `customDomain` or a domain key (`a`, `b`,
        etc.)
      </div>
    );
  }

  const baseDomain = getDomainUrl(resolvedKey, customDomain);
  const fileUrl = normalizeUrl(file, baseDomain);

  const openViewer = () => {
    navigate(`/pdf-viewer?file=${encodeURIComponent(fileUrl)}`);
  };

  return (
    <div className={styles.pdf_glass_item}>
      {(name || heading) && (
        <p className={styles.name}>{name || "Reference"}</p>
      )}
      <div className={styles.pdf_info} onClick={openViewer}>
        <img
          className={styles.icon}
          src="/wellora/web-images/pdf.png"
          alt="pdf icon"
        />
        <p className={styles.url}>
          {file.substring(file.lastIndexOf("/") + 1)}
        </p>
      </div>
    </div>
  );
};

export default PDF;
