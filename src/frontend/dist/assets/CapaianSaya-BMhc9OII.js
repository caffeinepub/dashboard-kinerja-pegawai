import { q as createLucideIcon, s as reactExports, T as useInternetIdentity, V as useGetCallerPerformanceEntries, j as jsxRuntimeExports, K as Label, N as Input, S as Skeleton, W as Target, l as Button, Y as useMutationCreatePerformanceEntry, g as Card, i as CardHeader, B as Badge, h as CardContent, L as LoaderCircle, o as ue } from "./index-DT0HPYD6.js";
import { S as Save } from "./save-CwTqXUI4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const calcPct = (capaian, target) => target > 0 ? Math.round(capaian / target * 100 * 10) / 10 : 0;
const emptyIndicator = (no) => ({
  no,
  uraian: "",
  targetJumlah: 0,
  targetSatuan: "",
  capaianJumlah: 0,
  capaianPersentase: 0,
  sumberDataEvaluasi: "",
  buktiDukung: ""
});
function EntryForm({
  initialEntry,
  period,
  employeeId,
  onSaved
}) {
  const [entry, setEntry] = reactExports.useState(initialEntry);
  const mutation = useMutationCreatePerformanceEntry();
  const updateSasaran = (val) => setEntry((prev) => ({ ...prev, sasaranKinerja: val }));
  const addIndicator = () => {
    setEntry((prev) => ({
      ...prev,
      indicators: [
        ...prev.indicators,
        emptyIndicator(prev.indicators.length + 1)
      ]
    }));
  };
  const removeIndicator = (idx) => {
    setEntry((prev) => ({
      ...prev,
      indicators: prev.indicators.filter((_, i) => i !== idx).map((ind, i) => ({ ...ind, no: i + 1 }))
    }));
  };
  const updateIndicator = (idx, field, rawVal) => {
    setEntry((prev) => ({
      ...prev,
      indicators: prev.indicators.map((ind, i) => {
        if (i !== idx) return ind;
        const updated = { ...ind, [field]: rawVal };
        if (field === "capaianJumlah" || field === "targetJumlah") {
          const capaian = field === "capaianJumlah" ? Number(rawVal) : ind.capaianJumlah;
          const target = field === "targetJumlah" ? Number(rawVal) : ind.targetJumlah;
          updated.capaianPersentase = calcPct(capaian, target);
        }
        return updated;
      })
    }));
  };
  const handleSave = async () => {
    if (!entry.sasaranKinerja.trim()) {
      ue.error("Isi Sasaran Kinerja terlebih dahulu!");
      return;
    }
    try {
      await mutation.mutateAsync({
        period,
        entry: {
          employeeId,
          period,
          sasaranKinerja: entry.sasaranKinerja,
          indicatorList: entry.indicators.map((ind) => ({
            no: BigInt(ind.no),
            uraian: ind.uraian,
            targetJumlah: ind.targetJumlah,
            targetSatuan: ind.targetSatuan,
            capaianJumlah: ind.capaianJumlah,
            capaianPersentase: ind.capaianPersentase,
            sumberDataEvaluasi: ind.sumberDataEvaluasi,
            buktiDukung: ind.buktiDukung
          }))
        }
      });
      ue.success("Capaian berhasil disimpan!");
      onSaved();
    } catch (e) {
      ue.error(`Gagal menyimpan: ${e.message}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Sasaran Kinerja" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "capaian.input",
            value: entry.sasaranKinerja,
            onChange: (e) => updateSasaran(e.target.value),
            placeholder: "Deskripsi sasaran kinerja...",
            className: "font-medium"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mt-6 shrink-0", children: period })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "table-header-bg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-left text-muted-foreground font-medium w-8", children: "No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-left text-muted-foreground font-medium min-w-[160px]", children: "Uraian Indikator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-center text-muted-foreground font-medium w-20", children: "Target Jml" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-center text-muted-foreground font-medium w-20", children: "Satuan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-center text-muted-foreground font-medium w-20", children: "Capaian Jml" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-center text-muted-foreground font-medium w-24 bg-primary/5", children: "Capaian % (auto)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-left text-muted-foreground font-medium min-w-[120px]", children: "Sumber Data" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 text-left text-muted-foreground font-medium min-w-[120px]", children: "Bukti Dukung" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-2 py-2 w-8" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: entry.indicators.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 9,
            className: "px-4 py-6 text-center text-muted-foreground",
            "data-ocid": "capaian.empty_state",
            children: 'Klik "Tambah Indikator" untuk menambahkan baris'
          }
        ) }) : entry.indicators.map((ind) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-t border-border hover:bg-muted/30 transition-colors",
            "data-ocid": `capaian.item.${ind.no}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-center text-muted-foreground", children: ind.no }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-1.5 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: ind.uraian,
                  onChange: (e) => updateIndicator(ind.no - 1, "uraian", e.target.value),
                  placeholder: "Uraian indikator...",
                  className: "w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-foreground"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-1.5 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: ind.targetJumlah || "",
                  onChange: (e) => updateIndicator(
                    ind.no - 1,
                    "targetJumlah",
                    Number.parseFloat(e.target.value) || 0
                  ),
                  className: "w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-center text-foreground",
                  min: "0"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-1.5 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: ind.targetSatuan,
                  onChange: (e) => updateIndicator(
                    ind.no - 1,
                    "targetSatuan",
                    e.target.value
                  ),
                  placeholder: "satuan",
                  className: "w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-center text-foreground"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-1.5 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: ind.capaianJumlah || "",
                  onChange: (e) => updateIndicator(
                    ind.no - 1,
                    "capaianJumlah",
                    Number.parseFloat(e.target.value) || 0
                  ),
                  className: "w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-center text-foreground",
                  min: "0"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-2 py-1.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `font-semibold px-2 py-0.5 rounded-md ${ind.capaianPersentase >= 80 ? "text-success bg-success/10" : ind.capaianPersentase > 0 ? "text-warning-foreground bg-warning/10" : "text-muted-foreground"}`,
                  children: [
                    ind.capaianPersentase.toFixed(1),
                    "%"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-1.5 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: ind.sumberDataEvaluasi,
                  onChange: (e) => updateIndicator(
                    ind.no - 1,
                    "sumberDataEvaluasi",
                    e.target.value
                  ),
                  placeholder: "Sumber data...",
                  className: "w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-foreground"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-1.5 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: ind.buktiDukung,
                  onChange: (e) => updateIndicator(
                    ind.no - 1,
                    "buktiDukung",
                    e.target.value
                  ),
                  placeholder: "Bukti dukung...",
                  className: "w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-foreground"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-1.5 py-1 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeIndicator(ind.no - 1),
                  className: "w-6 h-6 rounded hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors",
                  "data-ocid": `capaian.delete_button.${ind.no}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                }
              ) })
            ]
          },
          ind.no
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: addIndicator,
            "data-ocid": "capaian.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Tambah Indikator"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: handleSave,
            disabled: mutation.isPending,
            "data-ocid": "capaian.save_button",
            children: [
              mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin mr-1.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5 mr-1.5" }),
              mutation.isPending ? "Menyimpan..." : "Simpan"
            ]
          }
        )
      ] })
    ] })
  ] });
}
function CapaianPage({
  period,
  entries,
  employeeId,
  onAddEntry,
  onSaved
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    entries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 border-2 border-dashed border-border rounded-xl",
        "data-ocid": "capaian.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-medium", children: [
            "Belum ada sasaran kinerja untuk periode ",
            period
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Klik tombol di bawah untuk menambahkan sasaran kinerja pertama Anda" })
        ]
      }
    ),
    entries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      EntryForm,
      {
        initialEntry: entry,
        period,
        employeeId,
        onSaved
      },
      `${period}-${entry.sasaranKinerja || i}`
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        className: "w-full border-dashed",
        onClick: onAddEntry,
        "data-ocid": "capaian.primary_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
          "Tambah Sasaran Kinerja"
        ]
      }
    )
  ] });
}
function CapaianSaya() {
  const [period, setPeriod] = reactExports.useState((/* @__PURE__ */ new Date()).getFullYear().toString());
  const { identity } = useInternetIdentity();
  const principal = identity == null ? void 0 : identity.getPrincipal();
  const {
    data: backendEntries,
    isLoading,
    refetch
  } = useGetCallerPerformanceEntries();
  const periodEntries = (backendEntries ?? []).filter((e) => e.period === period).map((e) => ({
    sasaranKinerja: e.sasaranKinerja,
    indicators: e.indicatorList.map((ind) => ({
      no: Number(ind.no),
      uraian: ind.uraian,
      targetJumlah: ind.targetJumlah,
      targetSatuan: ind.targetSatuan,
      capaianJumlah: ind.capaianJumlah,
      capaianPersentase: ind.capaianPersentase,
      sumberDataEvaluasi: ind.sumberDataEvaluasi,
      buktiDukung: ind.buktiDukung
    }))
  }));
  const [extraEntries, setExtraEntries] = reactExports.useState([]);
  const handleAddEntry = () => {
    setExtraEntries((prev) => [
      ...prev,
      { sasaranKinerja: "", indicators: [emptyIndicator(1)] }
    ]);
  };
  const handleSaved = () => {
    setExtraEntries([]);
    refetch();
  };
  const allEntries = [...periodEntries, ...extraEntries];
  if (!principal) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "capaian-period", children: "Periode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "capaian-period",
            "data-ocid": "capaian.period_input",
            type: "number",
            value: period,
            onChange: (e) => {
              setPeriod(e.target.value);
              setExtraEntries([]);
            },
            className: "w-28",
            min: "2020",
            max: "2030"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        allEntries.length,
        " sasaran kinerja untuk periode ",
        period
      ] }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "capaian.loading_state", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      CapaianPage,
      {
        period,
        entries: allEntries,
        employeeId: principal,
        onAddEntry: handleAddEntry,
        onSaved: handleSaved
      },
      period
    ),
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
  CapaianSaya as default
};
