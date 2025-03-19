export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("T")[0].split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[parseInt(month, 10) - 1];
  const dayNumber = parseInt(day, 10);
  return `${monthName} ${dayNumber}, ${year}`;
}
