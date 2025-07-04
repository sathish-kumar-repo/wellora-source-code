import React from "react";
import styles from "./PreviewCard.module.scss";
import { myCodeDomain, myLiveDomain } from "../../utils/domain";

interface PreviewCardProps {
  banner: string;
  title: string;
  tags?: string[];
  description?: string;
  liveLink?: string;
  codeLink?: string;
  repo?: string;
  codeDomain?: string;
  liveDomain?: string;
}

const PreviewCard: React.FC<PreviewCardProps> = ({
  banner,
  title,
  tags = [],
  description = "Explore the live version and source code of this tutorial project below.",
  liveLink,
  codeLink,
  repo,
  codeDomain = myCodeDomain,
  liveDomain = myLiveDomain,
}) => {
  // Fallback logic using repo
  const resolvedLiveLink =
    liveLink || (repo ? `${liveDomain}/${repo}` : undefined);

  const resolvedCodeLink =
    codeLink || (repo ? `${codeDomain}/${repo}` : undefined);

  if (!resolvedLiveLink || !resolvedCodeLink) {
    throw new Error(
      `PreviewCard: Please provide either 'repo' or both 'liveLink' and 'codeLink'.`
    );
  }

  return (
    <div className={styles.card}>
      <img src={banner} alt="Project banner" className={styles.banner} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className={styles.description}>{description}</p>

        <div className={styles.buttons}>
          <a
            href={resolvedLiveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            🔗 Live Preview
          </a>
          <a
            href={resolvedCodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buttonOutline}
          >
            💻 Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
