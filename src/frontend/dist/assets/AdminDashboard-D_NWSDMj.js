import { u as useGetAllEmployeeProfiles, a as useGetAllPerformanceEntries, b as useListApprovals, c as useGetAllEmployeesPerformanceSummary, d as useGetAllFeedback, e as useMutationSetApproval, A as ApprovalStatus, U as Users, C as ClipboardList, f as Clock, j as jsxRuntimeExports, m as motion, g as Card, h as CardContent, S as Skeleton, i as CardHeader, k as CardTitle, B as Badge, l as Button, L as LoaderCircle, n as CircleX, o as ue } from "./index-DT0HPYD6.js";
import { P as Progress } from "./progress-DGB7N2Im.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-_By1lhHM.js";
import { T as TrendingUp, D as DonutChart } from "./DonutChart-BT13R1T0.js";
import { C as CircleCheckBig } from "./circle-check-big-Da6XWS-C.js";
const shortPrincipal = (p) => `${p.toString().slice(0, 10)}...`;
function AdminDashboard({ setCurrentPage }) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear().toString();
  const { data: profiles, isLoading: profilesLoading } = useGetAllEmployeeProfiles();
  const { data: allEntries, isLoading: entriesLoading } = useGetAllPerformanceEntries();
  const { data: approvals, isLoading: approvalsLoading } = useListApprovals();
  const { data: summaries, isLoading: summariesLoading } = useGetAllEmployeesPerformanceSummary(currentYear);
  const { data: feedbacks, isLoading: feedbackLoading } = useGetAllFeedback();
  const approvalMutation = useMutationSetApproval();
  const totalPegawai = (profiles == null ? void 0 : profiles.length) ?? 0;
  const totalEntri = (allEntries == null ? void 0 : allEntries.length) ?? 0;
  const pendingApprovals = (approvals == null ? void 0 : approvals.filter((a) => a.status === ApprovalStatus.pending)) ?? [];
  const pendingCount = pendingApprovals.length;
  const avgNilai = summaries && summaries.length > 0 ? summaries.reduce((sum, s) => sum + s.averageAchievement, 0) / summaries.length : 0;
  const kpiCards = [
    {
      title: "Total Pegawai",
      value: totalPegawai,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
      loading: profilesLoading
    },
    {
      title: "Entri Kinerja",
      value: totalEntri,
      icon: ClipboardList,
      color: "text-success",
      bg: "bg-success/10",
      loading: entriesLoading
    },
    {
      title: "Pending Approval",
      value: pendingCount,
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning/10",
      loading: approvalsLoading
    },
    {
      title: "Nilai Rata-rata",
      value: `${avgNilai.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-chart-5",
      bg: "bg-chart-5/10",
      loading: summariesLoading
    }
  ];
  const handleApprove = async (principal) => {
    try {
      await approvalMutation.mutateAsync({
        principal,
        status: ApprovalStatus.approved
      });
      ue.success("Pegawai berhasil disetujui!");
    } catch (e) {
      ue.error(`Gagal: ${e.message}`);
    }
  };
  const handleReject = async (principal) => {
    try {
      await approvalMutation.mutateAsync({
        principal,
        status: ApprovalStatus.rejected
      });
      ue.success("Pendaftaran ditolak.");
    } catch (e) {
      ue.error(`Gagal: ${e.message}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: kpiCards.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.08 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: card.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: `w-4 h-4 ${card.color}` })
              }
            )
          ] }),
          card.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: card.value })
        ] }) })
      },
      card.title
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card xl:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Sasaran Kinerja Pegawai (SKP)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: entriesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", "data-ocid": "skp.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "skp.table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "table-header-bg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-10", children: "No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Pegawai (ID)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Sasaran Kinerja" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Ind." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-36", children: "Capaian" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (allEntries ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TableCell,
            {
              colSpan: 6,
              className: "text-center text-muted-foreground py-10",
              "data-ocid": "skp.empty_state",
              children: "Belum ada data entri kinerja"
            }
          ) }) : (allEntries ?? []).slice(0, 10).map((entry, idx) => {
            const avgCapaian = entry.indicatorList.length > 0 ? entry.indicatorList.reduce(
              (s, ind) => s + ind.capaianPersentase,
              0
            ) / entry.indicatorList.length : 0;
            const isSesuai = avgCapaian >= 80;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TableRow,
              {
                "data-ocid": `skp.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-xs", children: idx + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs font-mono text-muted-foreground", children: shortPrincipal(entry.employeeId) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm max-w-[180px] truncate", children: entry.sasaranKinerja }),
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: isSesuai ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning-foreground border-warning/20",
                      variant: "outline",
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base", children: [
          "Rata-rata Capaian ",
          currentYear
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center gap-5", children: [
          summariesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-36 h-36 rounded-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            DonutChart,
            {
              percentage: avgNilai,
              size: 144,
              label: "Keseluruhan"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full space-y-2.5", children: [
            (summaries ?? []).slice(0, 5).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono truncate w-24", children: shortPrincipal(s.employeeId) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Progress,
                      {
                        value: Math.min(s.averageAchievement, 100),
                        className: "h-1.5 w-16"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium w-10 text-right", children: [
                      s.averageAchievement.toFixed(0),
                      "%"
                    ] })
                  ] })
                ]
              },
              s.employeeId.toString()
            )),
            (summaries ?? []).length === 0 && !summariesLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-4", children: "Belum ada data" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Persetujuan Registrasi Pegawai" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-xs text-primary h-7",
              onClick: () => setCurrentPage("approvals"),
              "data-ocid": "admin.approvals.link",
              children: "Lihat Semua"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: approvalsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "approvals.loading_state", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, i)) }) : pendingApprovals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-8",
            "data-ocid": "approvals.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-success mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Semua pendaftaran telah diproses" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: pendingApprovals.slice(0, 5).map((approval, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 bg-muted/50 rounded-lg",
            "data-ocid": `approvals.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground", children: shortPrincipal(approval.principal) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs mt-1 bg-warning/10 text-warning-foreground border-warning/20",
                    children: "Pending"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "h-7 text-xs px-2",
                    onClick: () => handleApprove(approval.principal),
                    disabled: approvalMutation.isPending,
                    "data-ocid": `approvals.confirm_button.${i + 1}`,
                    children: [
                      approvalMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                      "Setujui"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "destructive",
                    className: "h-7 text-xs px-2",
                    onClick: () => handleReject(approval.principal),
                    disabled: approvalMutation.isPending,
                    "data-ocid": `approvals.delete_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
                      "Tolak"
                    ]
                  }
                )
              ] })
            ]
          },
          approval.principal.toString()
        )) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Feedback Terbaru" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-xs text-primary h-7",
              onClick: () => setCurrentPage("feedback"),
              "data-ocid": "admin.feedback.link",
              children: "Lihat Semua"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: feedbackLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "feedback.loading_state", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, i)) }) : (feedbacks ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-8",
            "data-ocid": "feedback.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Belum ada feedback" })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (feedbacks ?? []).slice(0, 4).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-3 bg-muted/50 rounded-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: shortPrincipal(f.employeeId) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-warning", children: [
                  "★".repeat(Number(f.overallRating)),
                  "☆".repeat(Math.max(0, 5 - Number(f.overallRating)))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground line-clamp-2", children: f.feedbackText }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                "Periode: ",
                f.period
              ] })
            ]
          },
          `${f.employeeId.toString()}-${f.period}`
        )) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
          "Profil Pegawai Terdaftar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "text-xs text-primary h-7",
            onClick: () => setCurrentPage("approvals"),
            "data-ocid": "admin.profiles.link",
            children: "Kelola Persetujuan"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: profilesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", "data-ocid": "profiles.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : (profiles ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10", "data-ocid": "profiles.empty_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Belum ada profil pegawai terdaftar" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "profiles.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "table-header-bg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-10", children: "No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "NIP" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Jabatan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Lokasi Kerja (Desa Binaan)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Kecamatan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Kabupaten" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (profiles ?? []).map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `profiles.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-xs", children: idx + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm", children: p.nama || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: p.nip || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: p.jabatan || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: p.lokasiKerja || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: p.kecamatan || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: p.kabupaten || "—" })
            ]
          },
          `${p.nip}-${idx}`
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
  AdminDashboard as default
};
