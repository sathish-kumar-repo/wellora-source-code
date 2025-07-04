import { NavLink, useParams } from "react-router-dom";
import NoResultFound from "../../../../components/NoResultFound/NoResultFound";
import "./CourseList.css";
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
    <>
      {Object.entries(processedCourses).map(([subCat, courses]) => {
        const isAll = selectedSubCategory === "All";
        const isSelected = selectedSubCategory === subCat;

        if (isAll && courses.length === 0) return null;
        if (!isAll && !isSelected) return null;

        return (
          <div key={subCat} className="subcategory-section">
            <h2 className="subcategory-title">{subCat}</h2>
            {courses.length > 0 ? (
              <div className="course-list">
                {courses.map((item, index) => {
                  // ! = NOT (negation)
                  // !! = Boolean cast (truthy/falsy to true or false)
                  const isExternal = !!item.link;
                  const learnMoreText = t("course.learnMore");

                  return (
                    <div key={index} className="course-card">
                      <img
                        src={`https://sathish-kumar-repo.github.io/wellora-image/${item.img}`}
                        alt={item.name}
                        className="course-img"
                      />
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>

                      {isExternal ? (
                        <a
                          href={item.link}
                          className="course-link"
                          rel="noopener noreferrer"
                        >
                          {learnMoreText}
                        </a>
                      ) : (
                        <NavLink
                          to={`/${category}/${item.name}`}
                          className="course-link"
                        >
                          {learnMoreText}
                        </NavLink>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              !isAll && <NoResultFound searchTerm={searchQuery} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default CourseList;
