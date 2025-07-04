// Define the structure of a single course
export type CourseType = {
  subCategory?: string;
  name: string;
  description: string;
  img: string;
  link?: string;
};

// Define the structure of the course categories
export type CourseDataType = {
  [category: string]: CourseType[];
};
