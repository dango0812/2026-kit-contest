export interface GradeGroup {
  id: string;
  label: string;
  grades: Grade[];
}

export interface Grade {
  id: string;
  label: string;
  shortLabel: string;
}

export const GRADE_GROUPS: GradeGroup[] = [
  {
    id: 'elementary',
    label: '초등학교',
    grades: [
      { id: 'e1', label: '초등학교 1학년', shortLabel: '1학년' },
      { id: 'e2', label: '초등학교 2학년', shortLabel: '2학년' },
      { id: 'e3', label: '초등학교 3학년', shortLabel: '3학년' },
      { id: 'e4', label: '초등학교 4학년', shortLabel: '4학년' },
      { id: 'e5', label: '초등학교 5학년', shortLabel: '5학년' },
      { id: 'e6', label: '초등학교 6학년', shortLabel: '6학년' },
    ],
  },
  {
    id: 'middle',
    label: '중학교',
    grades: [
      { id: 'm1', label: '중학교 1학년', shortLabel: '1학년' },
      { id: 'm2', label: '중학교 2학년', shortLabel: '2학년' },
      { id: 'm3', label: '중학교 3학년', shortLabel: '3학년' },
    ],
  },
  {
    id: 'high',
    label: '고등학교',
    grades: [
      { id: 'h1', label: '고등학교 1학년', shortLabel: '1학년' },
      { id: 'h2', label: '고등학교 2학년', shortLabel: '2학년' },
      { id: 'h3', label: '고등학교 3학년', shortLabel: '3학년' },
    ],
  },
];

export type GradeId = string;

export function getGradeLabel(gradeId: string): string {
  for (const group of GRADE_GROUPS) {
    const grade = group.grades.find(g => g.id === gradeId);
    if (grade) {
      return grade.label;
    }
  }
  return gradeId;
}
