import "./Course.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Section from "../../components/Section";
import Container from "../../components/Container";
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

  //! EFFECTS HERE...
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
    setSearchParams(searchParams); // Reset search params to clear filters
  };

  // Now do getCourseData after all hooks

  const courseData = getCourseData(isPrivate);
  const isValidFolder = category && courseData[category];

  if (!isValidFolder) {
    return <NotFound />;
  }

  const categoryCourses = courseData[category];

  // Check if there's only one course
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

  // Filter by search term (case-insensitive)
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

  // Handle Recently Added: reverse subcategory and course order
  const processedCourses = recentlyAdded
    ? Object.fromEntries(
        Object.entries(filteredCourses)
          .reverse()
          .map(([subCat, courses]) => [subCat, [...courses].reverse()])
      )
    : filteredCourses;

  // Get subcategory keys from the processed courses
  const baseSubCategories = Object.keys(processedCourses);
  const subCategories = ["All", ...baseSubCategories];

  // Check if any filter is applied
  const isAnyFilterApplied =
    selectedSubCategory !== "All" || recentlyAdded || searchQuery;

  return (
    <>
      <Helmet>
        <title>{t("course.title")}</title>
        <meta name="description" content={t("course.description")} />
      </Helmet>

      <Section className="course-section">
        <Header />
        <Container className="course-wrapper">
          {/* Filter Sidebar Component */}
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

          <div className="course-main">
            {/* Filter Header with Search Bar */}
            {!onlyOneCourse && (
              <div className="filter-header">
                <div
                  className="filter-button"
                  onClick={() => setToggleFilter((prev) => !prev)}
                >
                  <h4>{t("course.filter")}</h4>
                  <span>
                    <FilterListIcon />
                  </span>
                </div>
                <SearchBar
                  searchTerm={searchQuery}
                  setSearchTerm={handleSearchQueryChange}
                  placeholder={t("course.searchPlaceholder")}
                  inputRef={inputRef}
                />
              </div>
            )}

            {/* No result found if the filtered courses are empty */}
            {selectedSubCategory === "All" &&
              Object.values(processedCourses).every((c) => c.length === 0) && (
                <NoResultFound
                  searchTerm={searchQuery}
                  style={{ marginTop: "2rem" }}
                />
              )}

            {/* Course List Component */}
            <CourseList
              processedCourses={processedCourses}
              selectedSubCategory={selectedSubCategory}
              searchQuery={searchQuery}
            />
          </div>
        </Container>
        <Footer />
      </Section>
    </>
  );
};

export default Course;
