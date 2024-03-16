enum CourseStatus {
  CURSANDO = 'CURSANDO',
  PENDIENTE = 'PENDIENTE',
  REGULARIZADA = 'REGULARIZADA',
  APROBADA = 'APROBADA',
}

type careerData = {
  name: string;
  id: number;
  periods: {
    id: number;
    order: number;
    courses: Course[];
  }[];
} | null;

type Course = {
  id: number;
  name: string;
  progress?: {
    status: keyof typeof CourseStatus;
    qualification: number | null;
  }[];
};
