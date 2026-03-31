import { q as createLucideIcon, j as jsxRuntimeExports } from "./index-DT0HPYD6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function DonutChart({
  percentage,
  size = 120,
  strokeWidth = 11,
  label,
  color = "#1E88E5",
  trackColor = "#E3E8EE"
}) {
  const r = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const safePercentage = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - safePercentage / 100 * circumference;
  const ariaLabel = label ? `${label}: ${Math.round(safePercentage)}%` : `${Math.round(safePercentage)}%`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      role: "img",
      "aria-label": ariaLabel,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: ariaLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx,
            cy,
            r,
            fill: "none",
            stroke: trackColor,
            strokeWidth
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx,
            cy,
            r,
            fill: "none",
            stroke: color,
            strokeWidth,
            strokeLinecap: "round",
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transform: `rotate(-90 ${cx} ${cy})`,
            style: { transition: "stroke-dashoffset 0.5s ease" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: cx,
            y: label ? cy - 6 : cy + 5,
            textAnchor: "middle",
            fontSize: size * 0.155,
            fontWeight: "700",
            fill: "#1F2A37",
            fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
            children: [
              Math.round(safePercentage),
              "%"
            ]
          }
        ),
        label && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: cx,
            y: cy + 12,
            textAnchor: "middle",
            fontSize: size * 0.085,
            fill: "#6B7280",
            fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
            children: label
          }
        )
      ]
    }
  );
}
export {
  DonutChart as D,
  TrendingUp as T
};
