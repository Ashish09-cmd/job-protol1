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

/** "2026-09-26" -> "Sep 26" */
export function formatShortDate(isoDate: string): string {
  const date = new Date(isoDate);

  return `${MONTHS[date.getUTCMonth()].slice(0, 3)} ${date.getUTCDate()}`;
}

/** "2 hours ago", "Yesterday", or a short date such as "Sep 24" for older items. */
export function formatRelativeTime(
  isoDate: string,
  now: Date = new Date(),
): string {
  const minutes = Math.floor(
    (now.getTime() - new Date(isoDate).getTime()) / 60000,
  );

  if (minutes < 1) return "Just now";
  if (minutes < 60)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

  if (Math.floor(hours / 24) === 1) return "Yesterday";

  return formatShortDate(isoDate);
}
