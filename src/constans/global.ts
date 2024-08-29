export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const monthOptions = months.map((month) => ({
  value: month,
  label: month,
}));

export const dayOptions = days.map((day) => ({
  value: day,
  label: day,
}));
