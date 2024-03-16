enum CourseStatus {
  CURSANDO = 'CURSANDO',
  PENDIENTE = 'PENDIENTE',
  REGULARIZADA = 'REGULARIZADA',
  APROBADA = 'APROBADA',
}

type CareerData = {
  name: string;
  id: number;
  periods: {
    id: number;
    order: number;
    courses: careerDataCourse[];
  }[];
} | null;

type careerDataCourse = {
  id: number;
  name: string;
  progress?: {
    status: keyof typeof CourseStatus;
    qualification: number | null;
  }[];
};

type Course = {
  id: number;
  order: number?;
  name: string;
  area: string?;
  description: string?;
  hsWeekly: Number?;
  hsTotal: Number?;
  hasCorrelatives?: Boolean;
  hasOptatives?: Boolean;
  hasEquivalents?: Boolean;
  periods: Period[];
  progress?: {
    status: keyof typeof CourseStatus;
    qualification: number | null;
  }[];
};

type Period = {
  id: Number;
  order: Number;
  careerID: Number;
  courses?: Course[];
  career: Career;
};
