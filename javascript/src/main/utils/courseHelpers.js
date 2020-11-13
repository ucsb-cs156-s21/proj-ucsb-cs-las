export const sortCourses = (courses) => {
  return courses.sort((courseOne, courseTwo) => {
    return courseOne.name.localeCompare(courseTwo.name);
  });
}