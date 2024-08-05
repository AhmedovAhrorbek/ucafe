 
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D+/g, '');

  // Format the cleaned string
  const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }

  return value;
};
