const MONTHS = [
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

function withOrdinal(day: number): string {
  const lastTwoDigits = day % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return `${day}th`;

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

/** "2026-09-01" -> "1st September, 2026". Uses UTC so server and browser match. */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  return `${withOrdinal(date.getUTCDate())} ${MONTHS[date.getUTCMonth()]}, ${date.getUTCFullYear()}`;
}
