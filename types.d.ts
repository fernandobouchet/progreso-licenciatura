enum CourseStatus {
  CURSANDO = "CURSANDO",
  PENDIENTE = "PENDIENTE",
  REGULARIZADA = "REGULARIZADA",
  APROBADA = "APROBADA",
}

type CareerData = {
  id: number;
  name: string;
  periods: PeriodData[];
};

type CourseData = {
  id: number;
  name: string;
  infoUrl: string | null;
  progress?: CourseProgress;
};

type PeriodData = {
  id: number;
  order: number;
  courses: CourseData[];
};

type CourseProgress = {
  id: string;
  courseId: number;
  userId: string;
  qualification: number | null;
  approvalYear: number | null;
  status: keyof typeof CourseStatus;
} | null;

type CareerProgress = {
  TOTAL: number;
  APROBADA: CourseData[];
  PENDIENTE: CourseData[];
  REGULARIZADA: CourseData[];
  CURSANDO: CourseData[];
};

type ProgressForm = {
  status: keyof typeof CourseStatus;
  qualification: number | null;
  approvalYear: number | null;
};
