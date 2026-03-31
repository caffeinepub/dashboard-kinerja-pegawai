import { b as useListApprovals, e as useMutationSetApproval, A as ApprovalStatus, j as jsxRuntimeExports, g as Card, h as CardContent, U as Users, i as CardHeader, k as CardTitle, p as CardDescription, S as Skeleton, B as Badge, l as Button, L as LoaderCircle, n as CircleX, o as ue } from "./index-DT0HPYD6.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-_By1lhHM.js";
import { E as EmployeeProfilesTable } from "./EmployeeProfilesTable-DId99Prb.js";
import { C as CircleCheckBig } from "./circle-check-big-Da6XWS-C.js";
const shortPrincipal = (p) => `${p.toString().slice(0, 16)}...`;
const statusConfig = {
  [ApprovalStatus.pending]: {
    label: "Pending",
    class: "bg-warning/10 text-warning-foreground border-warning/30"
  },
  [ApprovalStatus.approved]: {
    label: "Disetujui",
    class: "bg-success/10 text-success border-success/30"
  },
  [ApprovalStatus.rejected]: {
    label: "Ditolak",
    class: "bg-destructive/10 text-destructive border-destructive/30"
  }
};
function ApprovalManagement() {
  const { data: approvals, isLoading } = useListApprovals();
  const mutation = useMutationSetApproval();
  const pending = (approvals == null ? void 0 : approvals.filter((a) => a.status === ApprovalStatus.pending)) ?? [];
  const approved = (approvals == null ? void 0 : approvals.filter((a) => a.status === ApprovalStatus.approved)) ?? [];
  const rejected = (approvals == null ? void 0 : approvals.filter((a) => a.status === ApprovalStatus.rejected)) ?? [];
  const handleApprove = async (principal) => {
    try {
      await mutation.mutateAsync({
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
      await mutation.mutateAsync({
        principal,
        status: ApprovalStatus.rejected
      });
      ue.success("Pendaftaran ditolak.");
    } catch (e) {
      ue.error(`Gagal: ${e.message}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [
      {
        label: "Menunggu",
        count: pending.length,
        color: "text-warning",
        bg: "bg-warning/10"
      },
      {
        label: "Disetujui",
        count: approved.length,
        color: "text-success",
        bg: "bg-success/10"
      },
      {
        label: "Ditolak",
        count: rejected.length,
        color: "text-destructive",
        bg: "bg-destructive/10"
      }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: `w-5 h-5 ${stat.color}` })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: stat.count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label })
      ] })
    ] }) }, stat.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Daftar Registrasi Pegawai" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Kelola persetujuan pendaftaran pegawai baru" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", "data-ocid": "approvals.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : (approvals ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16",
          "data-ocid": "approvals.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Belum ada pendaftaran pegawai" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "data-ocid": "approvals.table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "table-header-bg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-10", children: "No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Principal ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (approvals ?? []).map((approval, i) => {
          var _a, _b;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TableRow,
            {
              "data-ocid": `approvals.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-xs", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-foreground", children: shortPrincipal(approval.principal) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: `text-xs ${((_a = statusConfig[approval.status]) == null ? void 0 : _a.class) ?? ""}`,
                    children: ((_b = statusConfig[approval.status]) == null ? void 0 : _b.label) ?? approval.status
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right", children: [
                  approval.status === ApprovalStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        className: "h-7 text-xs",
                        onClick: () => handleApprove(approval.principal),
                        disabled: mutation.isPending,
                        "data-ocid": `approvals.confirm_button.${i + 1}`,
                        children: [
                          mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                          "Setujui"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "destructive",
                        className: "h-7 text-xs",
                        onClick: () => handleReject(approval.principal),
                        disabled: mutation.isPending,
                        "data-ocid": `approvals.delete_button.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
                          "Tolak"
                        ]
                      }
                    )
                  ] }),
                  approval.status !== ApprovalStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" })
                ] })
              ]
            },
            approval.principal.toString()
          );
        }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmployeeProfilesTable, {}),
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
  ApprovalManagement as default
};
