import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { courses, states } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToISO(date: string): string {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
}

export const getStateOptions = () => {
  return states.map((state) => ({
    value: state,
    label: state,
  }));
};

export const getCourseOptions = () => {
  return courses.map((course) => ({
    value: course.id,
    label: course.name,
  }));
};

export const getPeriodOptions = (selectedCourse: Course | null) => {
  if (!selectedCourse) return [];

  return Array.from({ length: selectedCourse.totalPeriods }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}º Período`,
  }));
};
