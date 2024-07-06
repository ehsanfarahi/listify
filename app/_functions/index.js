// Genetate Random ID
export function randomId() {
  const id = Math.floor(Math.random() * 100000);
  return id;
}

// Get Current Date
export function date() {
  const date = new Date();
  const getDay = date.getDate();
  const getMonth = date.getMonth() + 1;
  const getYear = date.getFullYear();
  return `${getDay}.${getMonth}.${getYear}`;
}
