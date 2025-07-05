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
      <div className="card p-4 border-error-200 bg-error-50 text-error-700 mb-6">
        ❌ Error: Provide either `code` (inline) or `src` (URL), but not both.
      </div>
    );
  }

  if (src && customDomain && resolvedKey) {
    return (
      <div className="card p-4 border-error-200 bg-error-50 text-error-700 mb-6">
        ❌ Error: Use only one of `customDomain` or a boolean domain flag (like
        `a`, `b`, `c`).
      </div>
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
    <div className="card overflow-hidden mb-6">
      {loading ? (
        <div className="p-4 text-center">⏳ Loading...</div>
      ) : error ? (
        <div className="p-4 text-error-600">{error}</div>
      ) : (
        <>
          <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copy(code)}
                className={`btn btn-ghost btn-sm transition-colors ${
                  copied ? "text-success-600" : ""
                }`}
              >
                {copied ? <DoneIcon /> : <ContentCopyIcon />}
              </button>
              <button
                className="btn btn-ghost btn-sm hidden sm:flex"
                onClick={handleShare}
              >
                <ShareIcon />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <SyntaxHighlighter
              language={language}
              style={theme}
              showLineNumbers={showLineNumbers}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                background: 'transparent'
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </>
      )}
    </div>
  );
};

export default Syntax;