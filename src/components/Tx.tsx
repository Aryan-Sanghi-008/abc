export function Tx({
  item,
  className = "",
  script = false,
}: {
  item: string;
  className?: string;
  script?: boolean;
}) {
  const face = script ? "font-script" : "";
  return <span className={`${face} ${className}`.trim()}>{item}</span>;
}
