// Genetate Random ID
export function randomId() {
  const id = Math.floor(Math.random() * 100000);
  return id;
}

// Get Current Date
export function date() {
  return new Date();
}

// export function date() {
//   const date = new Date();
//   const getDay = date.getDate();
//   const getMonth = date.getMonth() + 1;
//   const getYear = date.getFullYear();
//   return `${getDay}.${getMonth}.${getYear}`;
// }

export function formatedDate(getDate) {
  const date = new Date(getDate);
  const getDay = date.getDate();
  const getMonth = date.getMonth() + 1;
  const getYear = date.getFullYear();
  return `${getDay}.${getMonth}.${getYear}`;
}

export function getSchedule(shoppingList) {
  const schedule = shoppingList?.map(
    (list) =>
      new Date(list.date).getDate() === new Date().getDate() &&
      new Date(list.date).getMonth() === new Date().getMonth() &&
      new Date(list.date).getFullYear() === new Date().getFullYear()
  );
  return schedule;
}
