// src/Course/utils/getCourseData.ts
import mainData from "../../Main/data";
import privateTabs from "../../Main/private_tabs";
import { CourseDataType } from "../model/course_model";

function getCourseData(isPrivate: boolean): CourseDataType {
  const filtered = Object.entries(mainData).filter(
    ([key]) => isPrivate || !privateTabs.includes(key)
  );

  return Object.fromEntries(
    filtered.map(([category, value]) => [
      category,
      value.map((course) => ({
        subCategory:
          "subCategory" in course.about ? course.about.subCategory : undefined,
        name: course.about.name,
        description: course.about.description,
        img: course.about.img,
        link: "link" in course.about ? course.about.link : undefined,
      })),
    ])
  ) as CourseDataType;
}

export default getCourseData;
