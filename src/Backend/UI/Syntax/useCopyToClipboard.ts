import { useState } from "react";

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        fallbackCopyText(text);
      }
    } else {
      fallbackCopyText(text);
    }
  };

  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (!successful) {
        throw new Error("Fallback: Copy command was unsuccessful");
      }
    } catch (err) {
      console.error("Fallback: Copy failed", err);
      alert("❌ Failed to copy text to clipboard.");
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    document.body.removeChild(textArea);
  };

  return { copied, copy: handleCopy };
};
