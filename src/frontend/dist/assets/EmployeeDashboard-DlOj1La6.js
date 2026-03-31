import { q as createLucideIcon, T as useInternetIdentity, Z as useGetCallerEmployeeProfile, V as useGetCallerPerformanceEntries, _ as useGetFeedbackForEmployee, W as Target, Q as Star, j as jsxRuntimeExports, m as motion, g as Card, h as CardContent, S as Skeleton, O as User, $ as MapPin, B as Badge, i as CardHeader, k as CardTitle, l as Button, a0 as Award } from "./index-DT0HPYD6.js";
import { P as Progress } from "./progress-DGB7N2Im.js";
import { T as TrendingUp, D as DonutChart } from "./DonutChart-BT13R1T0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
function EmployeeDashboard({ setCurrentPage }) {
  const { identity } = useInternetIdentity();
  const principal = identity == null ? void 0 : identity.getPrincipal();
  const { data: profile, isLoading: profileLoading } = useGetCallerEmployeeProfile();
  const { data: entries, isLoading: entriesLoading } = useGetCallerPerformanceEntries();
  const { data: feedbacks, isLoading: feedbackLoading } = useGetFeedbackForEmployee(principal ?? null);
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear().toString();
  const yearEntries = (entries ?? []).filter((e) => e.period === currentYear);
  const totalSasaran = yearEntries.length;
  const avgCapaian = yearEntries.length > 0 ? yearEntries.reduce((total, entry) => {
    const entryAvg = entry.indicatorList.length > 0 ? entry.indicatorList.reduce(
      (s, ind) => s + ind.capaianPersentase,
      0
    ) / entry.indicatorList.length : 0;
    return total + entryAvg;
  }, 0) / yearEntries.length : 0;
  const latestFeedback = (feedbacks ?? []).sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  )[0];
  const avgRating = (feedbacks ?? []).length > 0 ? (feedbacks ?? []).reduce((s, f) => s + Number(f.overallRating), 0) / (feedbacks ?? []).length : 0;
  const kpiCards = [
    {
      title: "Sasaran Kinerja",
      value: totalSasaran,
      icon: Target,
      color: "text-primary",
      bg: "bg-primary/10",
      loading: entriesLoading
    },
    {
      title: "Rata-rata Capaian",
      value: `${avgCapaian.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
      loading: entriesLoading
    },
    {
      title: "Nilai dari Admin",
      value: avgRating > 0 ? `${avgRating.toFixed(1)}/5` : "—",
      icon: Star,
      color: "text-warning",
      bg: "bg-warning/10",
      loading: feedbackLoading
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card bg-sidebar-gradient text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40 bg-white/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-60 bg-white/10" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-7 h-7 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-white", children: (profile == null ? void 0 : profile.nama) ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm", children: (profile == null ? void 0 : profile.jabatan) ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/50 text-xs mt-1 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                profile == null ? void 0 : profile.lokasiKerja,
                ", ",
                profile == null ? void 0 : profile.kecamatan,
                ",",
                " ",
                profile == null ? void 0 : profile.kabupaten
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-white/20 text-white border-0 text-xs", children: [
            "NIP: ",
            (profile == null ? void 0 : profile.nip) ?? "—"
          ] })
        ] }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: kpiCards.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 + i * 0.08 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: card.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-7 h-7 rounded-lg ${card.bg} flex items-center justify-center`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: `w-3.5 h-3.5 ${card.color}` })
              }
            )
          ] }),
          card.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-14" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: card.value })
        ] }) })
      },
      card.title
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base", children: [
            "Sasaran Kinerja ",
            currentYear
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-xs text-primary h-7",
              onClick: () => setCurrentPage("capaian"),
              "data-ocid": "employee.capaian.link",
              children: [
                "Kelola",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 ml-1" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: entriesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "skp.loading_state", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, i)) }) : yearEntries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10", "data-ocid": "skp.empty_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Belum ada sasaran kinerja" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "mt-3",
              onClick: () => setCurrentPage("capaian"),
              "data-ocid": "employee.add_capaian.button",
              children: "Tambah Sekarang"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: yearEntries.slice(0, 3).map((entry) => {
          const avg = entry.indicatorList.length > 0 ? entry.indicatorList.reduce(
            (s, ind) => s + ind.capaianPersentase,
            0
          ) / entry.indicatorList.length : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "p-3 bg-muted/40 rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: entry.sasaranKinerja }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Progress,
                    {
                      value: Math.min(avg, 100),
                      className: "flex-1 h-1.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-12 text-right", children: [
                    avg.toFixed(1),
                    "%"
                  ] })
                ] })
              ]
            },
            `${entry.period}-${entry.sasaranKinerja}`
          );
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Penilaian dari Admin" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: feedbackLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "feedback.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-32 h-32 rounded-full mx-auto" }) }) : (feedbacks ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-10",
            "data-ocid": "feedback.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Belum ada penilaian dari admin" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DonutChart,
            {
              percentage: avgRating / 5 * 100,
              size: 130,
              label: "Rating Admin"
            }
          ),
          latestFeedback && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full p-4 bg-muted/40 rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Feedback Terbaru" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-warning", children: [
                "★".repeat(Number(latestFeedback.overallRating)),
                "☆".repeat(5 - Number(latestFeedback.overallRating))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: latestFeedback.feedbackText }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
              "Periode: ",
              latestFeedback.period
            ] })
          ] })
        ] }) })
      ] })
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
  EmployeeDashboard as default
};
