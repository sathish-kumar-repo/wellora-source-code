import React from "react";
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
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img 
        src={banner} 
        alt="Project banner" 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-3">
          {title}
        </h3>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-secondary-600 dark:text-secondary-300 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex gap-3">
          <a
            href={resolvedLiveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            🔗 Live Preview
          </a>
          <a
            href={resolvedCodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium rounded-lg transition-colors duration-200"
          >
            💻 Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;