import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import { Helmet } from "react-helmet";
import { useEffect, useRef, useState } from "react";
import FilterSidebar from "./components/FilterSidebar/FilterSidebar";
import NoResultFound from "../../components/NoResultFound/NoResultFound";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterListIcon from "@mui/icons-material/FilterList";
import CourseList from "./components/CourseList/CourseList";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CourseType } from "../../model/course_model";
import getCourseData from "../../utils/get_course_data";
import { usePrivateTab } from "../../context/PrivateTabContext";

const Course = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPrivate } = usePrivateTab();

  const selectedSubCategory = searchParams.get("sub") || "All";
  const recentlyAdded = searchParams.get("recent") === "true";
  const searchQuery = searchParams.get("q") || "";

  const [toggleFilter, setToggleFilter] = useState(window.innerWidth > 1200);
  const prevWidthRef = useRef(window.innerWidth);
  const inputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  // Track previous window width to manage filter sidebar visibility on resize
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const prevWidth = prevWidthRef.current;
      if (prevWidth > 1200 && currentWidth <= 1200) {
        setToggleFilter(false);
      }
      if (prevWidth <= 1200 && currentWidth > 1200) {
        setToggleFilter(true);
      }
      prevWidthRef.current = currentWidth;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Blur the search input when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (inputRef.current) inputRef.current.blur();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubCategoryChange = (value: string) => {
    if (value === "All") {
      searchParams.delete("sub");
    } else {
      searchParams.set("sub", value);
    }
    setSearchParams(searchParams);
  };

  const handleRecentlyAddedChange = () => {
    const newValue = !recentlyAdded;
    if (!newValue) {
      searchParams.delete("recent");
    } else {
      searchParams.set("recent", "true");
    }
    setSearchParams(searchParams);
  };

  const handleSearchQueryChange = (value: string) => {
    if (value.trim() === "") {
      searchParams.delete("q");
    } else {
      searchParams.set("q", value);
    }
    setSearchParams(searchParams);
  };

  // Clear all filters
  const clearFilters = () => {
    searchParams.delete("sub");
    searchParams.delete("q");
    searchParams.delete("recent");
    setSearchParams(searchParams);
  };

  const courseData = getCourseData(isPrivate);
  const isValidFolder = category && courseData[category];

  if (!isValidFolder) {
    return <NotFound />;
  }

  const categoryCourses = courseData[category];
  const onlyOneCourse = categoryCourses.length === 1;

  // Group all courses by subcategory
  const groupedCourses = categoryCourses.reduce((groups, course) => {
    const subCat = course.subCategory || "General";
    if (!groups[subCat]) {
      groups[subCat] = [];
    }
    groups[subCat].push(course);
    return groups;
  }, {} as Record<string, CourseType[]>);

  // Filter by search term
  const filteredCourses = Object.entries(groupedCourses).reduce(
    (result, [subCat, courses]) => {
      const filtered = courses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      result[subCat] = filtered;
      return result;
    },
    {} as Record<string, CourseType[]>
  );

  // Handle Recently Added
  const processedCourses = recentlyAdded
    ? Object.fromEntries(
        Object.entries(filteredCourses)
          .reverse()
          .map(([subCat, courses]) => [subCat, [...courses].reverse()])
      )
    : filteredCourses;

  const baseSubCategories = Object.keys(processedCourses);
  const subCategories = ["All", ...baseSubCategories];
  const isAnyFilterApplied = selectedSubCategory !== "All" || recentlyAdded || searchQuery;

  return (
    <>
      <Helmet>
        <title>{t("course.title")}</title>
        <meta name="description" content={t("course.description")} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-secondary-950 flex flex-col">
        <Header />
        
        <div className="flex flex-1 max-w-screen-2xl mx-auto w-full">
          {/* Filter Sidebar */}
          {!onlyOneCourse && (
            <FilterSidebar
              category={category}
              toggleFilter={toggleFilter}
              handleToggleFilter={() => setToggleFilter((prev) => !prev)}
              recentlyAdded={recentlyAdded}
              handleRecentlyAdded={handleRecentlyAddedChange}
              categoryOptions={subCategories}
              selectedCategory={selectedSubCategory}
              handelSelectedCategory={handleSubCategoryChange}
              enableClearFilter={isAnyFilterApplied}
              handleClearFilter={clearFilters}
            />
          )}

          <main className="flex-1 min-w-0 p-6">
            {/* Filter Header */}
            {!onlyOneCourse && (
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => setToggleFilter((prev) => !prev)}
                  className="btn btn-secondary flex items-center gap-2 w-fit"
                >
                  <FilterListIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">{t("course.filter")}</span>
                </button>
                
                <div className="flex-1 max-w-md">
                  <SearchBar
                    searchTerm={searchQuery}
                    setSearchTerm={handleSearchQueryChange}
                    placeholder={t("course.searchPlaceholder")}
                    inputRef={inputRef}
                  />
                </div>
              </div>
            )}

            {/* No results */}
            {selectedSubCategory === "All" &&
              Object.values(processedCourses).every((c) => c.length === 0) && (
                <NoResultFound searchTerm={searchQuery} />
              )}

            {/* Course List */}
            <CourseList
              processedCourses={processedCourses}
              selectedSubCategory={selectedSubCategory}
              searchQuery={searchQuery}
            />
          </main>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Course;