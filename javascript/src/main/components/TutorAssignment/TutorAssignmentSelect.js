import React, { useEffect, useState } from "react";
import { Cascader } from "antd";
import { fetchWithoutToken } from "main/utils/fetch";
import { asHumanQuarter } from "main/utils/quarter";

const defaultQuarterProvider = () => fetchWithoutToken("/api/public/quarters");
const defaultCourseProvider = quarter => fetchWithoutToken(`/api/public/courses/forQuarter/${quarter}`);
const defaultTutorAssignmentProvider = course => fetchWithoutToken(`/api/public/tutorAssignment/${course}`);

export default function TutorAssignmentSelect(props) {
  const {
    quarterProvider = defaultQuarterProvider,
    courseProvider = defaultCourseProvider,
    tutorAssignmentProvider = defaultTutorAssignmentProvider,
    onChange,
    ...otherProps
  } = props;
  const [options, setOptions] = useState(null);

  const onCascaderChange = (value) => {
    if (onChange) {
      onChange(value[2]);
    }
  };

  useEffect(() => {
    quarterProvider()
      .then(quarters => {
        setOptions(quarters.map(q => ({
          value: q,
          label: asHumanQuarter(q),
          isLeaf: false
        })));
      })
  }, [quarterProvider]);

  const loadData = async selectedOptions => {
    if (selectedOptions.length === 1) {
      const selectedQuarter = selectedOptions[0];
      selectedQuarter.loading = true;

      const courses = await courseProvider(selectedQuarter.value);

      selectedQuarter.loading = false;
      selectedQuarter.children =
        courses.map(c => ({
          value: c.id,
          label: c.name,
          isLeaf: false
        }));
    } else {
      const selectedCourse = selectedOptions[1];
      selectedCourse.loading = true;

      const tutorAssignments = await tutorAssignmentProvider(selectedCourse.value);

      selectedCourse.loading = false;
      selectedCourse.children =
        tutorAssignments.map(ta => ({
          value: ta.id,
          label: `${ta.tutor.firstName} ${ta.tutor.lastName}`
        }));
    }

    setOptions([...options]); // force rerender
  }

  return (
    <Cascader
      {...otherProps}
      options={options}
      loadData={loadData}
      onChange={onCascaderChange}
      placeholder={options ? "Select a tutor" : "Loading..."}
      disabled={!options}
    />
  );
}
