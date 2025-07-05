import { JSX, useEffect, useRef, useState } from "react";
import mainData from "../../../Main/data";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { Trans, useTranslation } from "react-i18next";
import HighlightMatch from "../HighlightMatch";
import privateTabs from "../../../Main/private_tabs";
import { usePrivateTab } from "../../context/PrivateTabContext";

interface SearchProps {
  showSearch: boolean;
  ref: React.Ref<HTMLDivElement>;
  onClose: () => void;
}

interface Route {
  topic: string;
  page: JSX.Element;
}

interface Course {
  about: { name: string };
  route?: Route[];
}

interface CourseResult {
  category: string;
  name: string;
  routes: Route[];
}

const Search = ({ showSearch, ref, onClose }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { t } = useTranslation();
  const { isPrivate } = usePrivateTab();

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
      setTimeout(() => {
        inputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [showSearch]);

  const seenCourseNames = new Set<string>();

  // 🔐 Filter based on private toggle
  const filteredMainData = Object.fromEntries(
    Object.entries(mainData).filter(
      ([key]) => isPrivate || !privateTabs.includes(key)
    )
  );

  const filteredResults: CourseResult[] = Object.entries(filteredMainData)
    .flatMap(([category, courses]) =>
      courses.map((course: Course) => {
        if ("link" in course.about) return null;

        const matchingRoutes =
          course.route?.filter((route) =>
            route.topic.toLowerCase().includes(searchTerm.toLowerCase())
          ) || [];

        if (
          matchingRoutes.length > 0 &&
          !seenCourseNames.has(course.about.name)
        ) {
          seenCourseNames.add(course.about.name);
          return {
            category,
            name: course.about.name,
            routes: matchingRoutes,
          };
        }

        return null;
      })
    )
    .filter((course): course is CourseResult => course !== null);

  const handleScroll = () => {
    inputRef.current?.blur();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300 ${showSearch ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden" ref={ref}>
        <div className="flex items-center gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            inputRef={inputRef}
            placeholder={t("general.topicSearchPlaceholder")}
          />
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
          >
            {t("general.cancel")}
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-6" onScroll={handleScroll}>
          {filteredResults.length > 0 ? (
            <div className="space-y-4">
              {filteredResults.map((result, index) => (
                <div className="card p-4" key={index}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{result.name}</h3>
                  <ul className="space-y-2">
                    {result.routes.map((route, idx) => (
                      <li key={idx}>
                        <Link
                          onClick={onClose}
                          to={`/${result.category}/${result.name}/${route.topic}`}
                          className="block p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors duration-200 no-underline"
                        >
                          <HighlightMatch
                            text={route.topic}
                            query={searchTerm}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                <Trans
                  i18nKey="general.noResults"
                  values={{ searchTerm }}
                  components={{ strong: <strong /> }}
                />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;