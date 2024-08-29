export const nameOptions = [
  { value: '01', label: 'Autumn' },
  { value: '02', label: 'Summer' },
  { value: '03', label: 'Fall' },
];
export const semesterStatusOptions = [
  { value: 'UPCOMING', label: 'Upcoming' },
  { value: 'ONGOING', label: 'Ongoing' },
  { value: 'ENDED', label: 'Ended' },
];

const currentYear = new Date().getFullYear();

export const yearOptions = [0, 1, 2, 3, 4].map((idx) => ({
  value: String(currentYear + idx),
  label: String(currentYear + idx),
}));
