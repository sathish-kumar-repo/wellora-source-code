import { NavLink, useParams } from "react-router-dom";
import NoResultFound from "../../../../components/NoResultFound/NoResultFound";
import { useTranslation } from "react-i18next";
import { CourseType } from "../../../../model/course_model";

interface CourseListProps {
  processedCourses: Record<string, CourseType[]>;
  selectedSubCategory: string;
  searchQuery: string;
}

const CourseList: React.FC<CourseListProps> = ({
  processedCourses,
  selectedSubCategory,
  searchQuery,
}) => {
  const { category } = useParams();
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      {Object.entries(processedCourses).map(([subCat, courses]) => {
        const isAll = selectedSubCategory === "All";
        const isSelected = selectedSubCategory === subCat;

        if (isAll && courses.length === 0) return null;
        if (!isAll && !isSelected) return null;

        return (
          <section key={subCat} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                {subCat}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-secondary-200 to-transparent dark:from-secondary-700"></div>
              <span className="text-sm text-secondary-500 dark:text-secondary-400">
                {courses.length} {courses.length === 1 ? 'course' : 'courses'}
              </span>
            </div>
            
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((item, index) => {
                  const isExternal = !!item.link;
                  const learnMoreText = t("course.learnMore");

                  return (
                    <div 
                      key={index} 
                      className="group card hover:shadow-glow transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={`https://sathish-kumar-repo.github.io/wellora-image/${item.img}`}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                          {item.name}
                        </h3>
                        
                        <p className="text-secondary-600 dark:text-secondary-300 line-clamp-3">
                          {item.description}
                        </p>

                        <div className="pt-2">
                          {isExternal ? (
                            <a
                              href={item.link}
                              className="btn btn-primary w-full group"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <span>{learnMoreText}</span>
                              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ) : (
                            <NavLink
                              to={`/${category}/${item.name}`}
                              className="btn btn-primary w-full group"
                            >
                              <span>{learnMoreText}</span>
                              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </NavLink>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              !isAll && <NoResultFound searchTerm={searchQuery} />
            )}
          </section>
        );
      })}
    </div>
  );
};

export default CourseList;