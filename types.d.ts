enum CourseStatus {
  CURSANDO = "CURSANDO",
  PENDIENTE = "PENDIENTE",
  REGULARIZADA = "REGULARIZADA",
  APROBADA = "APROBADA",
}

enum Terms {
  VERANO = "VERANO",
  PRIMER_CUATRIMESTRE = "PRIMER_CUATRIMESTRE",
  SEGUNDO_CUATRIMESTRE = "SEGUNDO_CUATRIMESTRE",
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
  approvalTerm: keyof typeof Terms | null;
  approvalYear: number | null;
  status: keyof typeof CourseStatus;
} | null;

type CareerProgress = {
  TOTAL: number;
  APROBADA: Course[];
  PENDIENTE: Course[];
  REGULARIZADA: Course[];
  CURSANDO: Course[];
};

type ProgressForm = {
  status: keyof typeof CourseStatus;
  qualification: number | null;
  approvalTerm: keyof typeof Terms | null;
  approvalYear: number | null;
};
