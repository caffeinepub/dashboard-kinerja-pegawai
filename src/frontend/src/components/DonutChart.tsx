interface DonutChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
  trackColor?: string;
}

export default function DonutChart({
  percentage,
  size = 120,
  strokeWidth = 11,
  label,
  color = "#1E88E5",
  trackColor = "#E3E8EE",
}: DonutChartProps) {
  const r = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const safePercentage = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (safePercentage / 100) * circumference;
  const ariaLabel = label
    ? `${label}: ${Math.round(safePercentage)}%`
    : `${Math.round(safePercentage)}%`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={ariaLabel}
    >
      <title>{ariaLabel}</title>
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      {/* Center text */}
      <text
        x={cx}
        y={label ? cy - 6 : cy + 5}
        textAnchor="middle"
        fontSize={size * 0.155}
        fontWeight="700"
        fill="#1F2A37"
        fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
      >
        {Math.round(safePercentage)}%
      </text>
      {label && (
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fontSize={size * 0.085}
          fill="#6B7280"
          fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
        >
          {label}
        </text>
      )}
    </svg>
  );
}
