enum CourseStatus {
  CURSANDO = 'CURSANDO',
  PENDIENTE = 'PENDIENTE',
  REGULARIZADA = 'REGULARIZADA',
  APROBADA = 'APROBADA',
}

type CareerData = {
  id: number;
  name: string;
  periods: PeriodData[];
} | null;

type CourseData = {
  id: number;
  name: string;
  order?: number | null;
  area?: string | null;
  description?: string | null;
  hsWeekly?: number | null;
  hsTotal?: number | null;
  progress?:
    | {
        id: string;
        courseId: number;
        userId: string;
        status: $Enums.CourseStatus;
        qualification: number | null;
      }[]
    | undefined;
  periods?: Period[];
};

type PeriodData = {
  id: number;
  order: number;
  courses: CourseData[];
};

type CareerProgress = {
  TOTAL: number;
  APROBADA: Course[];
  PENDIENTE: Course[];
  REGULARIZADA: Course[];
  CURSANDO: Course[];
};
