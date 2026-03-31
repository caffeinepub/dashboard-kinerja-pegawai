import { u as useGetAllEmployeeProfiles, j as jsxRuntimeExports, g as Card, i as CardHeader, k as CardTitle, U as Users, h as CardContent, S as Skeleton } from "./index-DT0HPYD6.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-_By1lhHM.js";
function EmployeeProfilesTable({ compact = false }) {
  const { data: profiles, isLoading } = useGetAllEmployeeProfiles();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: compact ? "pb-2" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
      "Profil Pegawai Terdaftar"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", "data-ocid": "profiles.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : (profiles ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10", "data-ocid": "profiles.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Belum ada profil pegawai yang terdaftar" })
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm", children: p.nama || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: p.nip || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: p.jabatan || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: p.lokasiKerja || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: p.kecamatan || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm", children: p.kabupaten || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "—" }) })
          ]
        },
        `${p.nip}-${idx}`
      )) })
    ] }) }) })
  ] });
}
export {
  EmployeeProfilesTable as E
};
