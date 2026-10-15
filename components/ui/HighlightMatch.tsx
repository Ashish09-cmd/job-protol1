const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Bolds the start of every word in `text` that the user typed in `query`. */
export default function HighlightMatch({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  const words = query.trim().split(/\s+/).filter(Boolean).map(escapeRegExp);
  if (words.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(?<![A-Za-z0-9])(${words.join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-bold text-text-heading">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
