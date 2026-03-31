import { s as reactExports, a as useGetAllPerformanceEntries, c as useGetAllEmployeesPerformanceSummary, j as jsxRuntimeExports, K as Label, N as Input, g as Card, i as CardHeader, k as CardTitle, p as CardDescription, h as CardContent, S as Skeleton, C as ClipboardList, B as Badge } from "./index-DT0HPYD6.js";
import { P as Progress } from "./progress-DGB7N2Im.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-_By1lhHM.js";
import { E as EmployeeProfilesTable } from "./EmployeeProfilesTable-DId99Prb.js";
const shortPrincipal = (p) => `${p.toString().slice(0, 12)}...`;
function SasaranKinerjaAdmin() {
  const [period, setPeriod] = reactExports.useState((/* @__PURE__ */ new Date()).getFullYear().toString());
  const { data: allEntries, isLoading: entriesLoading } = useGetAllPerformanceEntries();
  const { data: summaries } = useGetAllEmployeesPerformanceSummary(period);
  const summaryMap = new Map(
    (summaries ?? []).map((s) => [s.employeeId.toString(), s])
  );
  const periodEntries = (allEntries ?? []).filter((e) => e.period === period);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmployeeProfilesTable, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "period-input", children: "Periode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "period-input",
            "data-ocid": "skp.input",
            type: "number",
            value: period,
            onChange: (e) => setPeriod(e.target.value),
            className: "w-28",
            min: "2020",
            max: "2030"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground pb-1", children: [
        periodEntries.length,
        " entri kinerja ditemukan untuk periode ",
        period
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base", children: [
          "Sasaran Kinerja Pegawai — Periode ",
          period
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Ringkasan capaian kinerja seluruh pegawai" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: entriesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", "data-ocid": "skp.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : periodEntries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "skp.empty_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          "Belum ada data kinerja untuk periode ",
          period
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "skp.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "table-header-bg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-10", children: "No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Pegawai (ID)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Sasaran Kinerja" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Ind." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-40", children: "Avg Capaian" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: periodEntries.map((entry, idx) => {
          const avgCapaian = entry.indicatorList.length > 0 ? entry.indicatorList.reduce(
            (s, ind) => s + ind.capaianPersentase,
            0
          ) / entry.indicatorList.length : 0;
          const summary = summaryMap.get(entry.employeeId.toString());
          const rating = summary ? Number(summary.overallRating) : 0;
          const isSesuai = avgCapaian >= 80;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              "data-ocid": `skp.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-xs", children: idx + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-muted-foreground", children: shortPrincipal(entry.employeeId) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate", children: entry.sasaranKinerja }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center text-sm", children: entry.indicatorList.length }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    avgCapaian.toFixed(1),
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Progress,
                    {
                      value: Math.min(avgCapaian, 100),
                      className: "h-1.5"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: rating > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-warning", children: [
                  "★".repeat(rating),
                  "☆".repeat(5 - rating)
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: isSesuai ? "bg-success/10 text-success border-success/20 text-xs" : "bg-warning/10 text-warning-foreground border-warning/20 text-xs",
                    children: isSesuai ? "Sesuai" : "Belum Sesuai"
                  }
                ) })
              ]
            },
            `${entry.employeeId.toString()}-${entry.sasaranKinerja}`
          );
        }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "text-center text-xs text-muted-foreground py-2", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with ❤️ using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary hover:underline",
          children: "caffeine.ai"
        }
      )
    ] })
  ] });
}
export {
  SasaranKinerjaAdmin as default
};
