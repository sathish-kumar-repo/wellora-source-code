import { FC, useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  DomainKey,
  getDomainUrl,
  normalizeUrl,
  resolveDomainKeyFromProps,
} from "../../utils/domain";
import { Language } from "./Language";
import ShareIcon from "@mui/icons-material/Share";
import DoneIcon from "@mui/icons-material/Done";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "./Syntax.css";
import { useCopyToClipboard } from "./useCopyToClipboard";

interface SyntaxProps extends Record<string, any> {
  src?: string;
  code?: string;
  title?: string;
  language?: Language;
  showLineNumbers?: boolean;
  customDomain?: string;
  domainKey?: DomainKey;
}

const Syntax: FC<SyntaxProps> = (props) => {
  const {
    src,
    code: codeProp,
    title = "Code Snippet",
    language = "typescript",
    showLineNumbers = true,
    customDomain,
    domainKey: directKey,
  } = props;

  const [code, setCode] = useState<string>(codeProp || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { copied, copy } = useCopyToClipboard();
  const resolvedKey = resolveDomainKeyFromProps(props) || directKey;

  // Error if both code and src given
  if (codeProp !== undefined && src !== undefined) {
    return (
      <pre className="glass-table error-message">
        ❌ Error: Provide either `code` (inline) or `src` (URL), but not both.
      </pre>
    );
  }

  if (src && customDomain && resolvedKey) {
    return (
      <pre className="glass-table error-message">
        ❌ Error: Use only one of `customDomain` or a boolean domain flag (like
        `a`, `b`, `c`).
      </pre>
    );
  }

  // If codeProp changes, update code state
  useEffect(() => {
    if (codeProp !== undefined) {
      setCode(codeProp);
      setLoading(false);
      setError(null);
    }
  }, [codeProp]);

  useEffect(() => {
    // If inline code given, skip fetch
    if (codeProp !== undefined) return;
    if (!src) return;

    const baseDomain = getDomainUrl(resolvedKey, customDomain);
    const fullUrl = normalizeUrl(src, baseDomain);

    const fetchCode = async () => {
      console.log(fullUrl);

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(fullUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        setCode(text);
      } catch (err) {
        console.error("Error loading code:", err);
        setError("❌ Failed to load code.");
        setCode("");
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [src, resolvedKey, customDomain, codeProp]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: code,
      });
    } catch (error) {
      alert(error);
    }
  };

  // If no code and no src, render nothing
  if (!src && !code) return null;

  return (
    <div className={"syntax-container"}>
      {loading ? (
        <pre>⏳ Loading...</pre>
      ) : error ? (
        <pre>{error}</pre>
      ) : (
        <>
          <div className="syntax-header">
            <h3>{title}</h3>
            <div className="buttons">
              <span
                onClick={() => copy(code)}
                className={`toggle-button syntax-button ${
                  copied ? "copied" : ""
                }`}
              >
                {copied ? <DoneIcon /> : <ContentCopyIcon />}
              </span>
              <span
                className="toggle-button syntax-button share"
                onClick={handleShare}
              >
                <ShareIcon />
              </span>
            </div>
          </div>

          <SyntaxHighlighter
            className="syntax-highlighter"
            language={language}
            style={theme}
            showLineNumbers={showLineNumbers}
          >
            {code}
          </SyntaxHighlighter>
        </>
      )}
    </div>
  );
};

export default Syntax;
