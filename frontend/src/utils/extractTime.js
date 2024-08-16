export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = padZero(date.getMinutes());
  const period = hours >= 12 ? "PM" : "AM";
  const twelveHourFormat = hours % 12 || 12; // Convert hours to 12-hour format

  return `${twelveHourFormat}:${minutes} ${period}`;
}

export function extractDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // Months are zero-indexed, so we add 1
  const day = padZero(date.getDate());

  return `${year}/${month}/${day}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}
