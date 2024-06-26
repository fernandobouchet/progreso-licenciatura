import { careers } from "./constants";

const formatPeriodOrder = (order: number) => {
  const positions = ["", "1er", "2do", "3er", "4to", "5to", "6to"];
  return positions[order];
};

const capitalizeFirstLetter = (word: string) => {
  const firstLetterCapitalized = word.charAt(0).toUpperCase();
  const remainingLetters = word.slice(1).toLowerCase();
  const capitalizedWord = `${firstLetterCapitalized}${remainingLetters}`;
  return capitalizedWord;
};

const getCoursesProgress = (career: CareerData) => {
  const coursesProgress: CareerProgress = {
    TOTAL: 0,
    APROBADA: [],
    PENDIENTE: [],
    REGULARIZADA: [],
    CURSANDO: [],
  };

  for (const period of career.periods) {
    for (const course of period.courses) {
      const progressStatus: keyof typeof CourseStatus = course.progress?.status
        ? course.progress.status
        : "PENDIENTE";
      coursesProgress.TOTAL += 1;
      if (!progressStatus) {
        coursesProgress.PENDIENTE.push(course);
      } else {
        coursesProgress[progressStatus].push(course);
      }
    }
  }

  return coursesProgress;
};

const getCareerAverageQualification = (courses: CourseData[]) => {
  let qualificationSum = 0;

  for (const course of courses) {
    if (course?.progress?.qualification) {
      qualificationSum += course.progress.qualification;
    }
  }
  const averageQualification = (qualificationSum / courses.length).toPrecision(
    2
  );

  return averageQualification;
};

const getCareerNameById = (id: number) => {
  return careers.find((career) => career.id === id);
};

const getAvaileableSelectYears = () => {
  const currentYear = new Date().getFullYear();

  const availeableYears = [];

  for (let i = 2016; i < currentYear + 1; i++) {
    availeableYears.push(i);
  }

  return availeableYears;
};

export {
  formatPeriodOrder,
  capitalizeFirstLetter,
  getCoursesProgress,
  getCareerAverageQualification,
  getCareerNameById,
  getAvaileableSelectYears,
};
