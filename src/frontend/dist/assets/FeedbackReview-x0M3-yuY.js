import { d as useGetAllFeedback, j as jsxRuntimeExports, g as Card, i as CardHeader, k as CardTitle, p as CardDescription, h as CardContent, S as Skeleton, M as MessageSquare } from "./index-DT0HPYD6.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-_By1lhHM.js";
import { E as EmployeeProfilesTable } from "./EmployeeProfilesTable-DId99Prb.js";
const shortPrincipal = (p) => `${p.toString().slice(0, 14)}...`;
function formatDate(nanoseconds) {
  const ms = Number(nanoseconds) / 1e6;
  return new Date(ms).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function FeedbackReview() {
  const { data: feedbacks, isLoading } = useGetAllFeedback();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmployeeProfilesTable, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Semua Feedback & Penilaian" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Riwayat lengkap feedback yang telah diberikan kepada pegawai" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", "data-ocid": "feedback.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, i)) }) : (feedbacks ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "feedback.empty_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Belum ada feedback yang diberikan" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "feedback.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "table-header-bg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-10", children: "No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Pegawai (ID)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Periode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Catatan Feedback" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Tanggal" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (feedbacks ?? []).map((fb, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `feedback.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-xs", children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-muted-foreground", children: shortPrincipal(fb.employeeId) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center text-sm", children: fb.period }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-warning text-sm", children: [
                  "★".repeat(Number(fb.overallRating)),
                  "☆".repeat(
                    Math.max(0, 5 - Number(fb.overallRating))
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  Number(fb.overallRating),
                  "/5"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground line-clamp-2", children: fb.feedbackText }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right text-xs text-muted-foreground", children: formatDate(fb.createdAt) })
            ]
          },
          `${fb.employeeId.toString()}-${fb.period}`
        )) })
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
  FeedbackReview as default
};
