const gender = ['Male', 'Female'];
const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const genderOptions = gender.map((el) => ({
  value: el.toLowerCase(),
  label: el,
}));

export const bloodGroupOptions = bloodGroup.map((el) => ({
  value: el,
  label: el,
}));
