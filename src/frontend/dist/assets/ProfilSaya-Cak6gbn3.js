import { Z as useGetCallerEmployeeProfile, a1 as useMutationCreateEmployeeProfile, s as reactExports, j as jsxRuntimeExports, g as Card, i as CardHeader, O as User, k as CardTitle, p as CardDescription, h as CardContent, S as Skeleton, K as Label, N as Input, $ as MapPin, l as Button, L as LoaderCircle, o as ue } from "./index-DT0HPYD6.js";
import { S as Save } from "./save-CwTqXUI4.js";
function ProfilSaya() {
  const { data: profile, isLoading } = useGetCallerEmployeeProfile();
  const mutation = useMutationCreateEmployeeProfile();
  const [form, setForm] = reactExports.useState({
    nama: "",
    nip: "",
    jabatan: "",
    lokasiKerja: "",
    kecamatan: "",
    kabupaten: ""
  });
  reactExports.useEffect(() => {
    if (profile) {
      setForm({
        nama: profile.nama ?? "",
        nip: profile.nip ?? "",
        jabatan: profile.jabatan ?? "",
        lokasiKerja: profile.lokasiKerja ?? "",
        kecamatan: profile.kecamatan ?? "",
        kabupaten: profile.kabupaten ?? ""
      });
    }
  }, [profile]);
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleSave = async () => {
    if (!form.nama || !form.nip || !form.jabatan) {
      ue.error("Harap isi Nama, NIP, dan Jabatan!");
      return;
    }
    try {
      await mutation.mutateAsync(form);
      ue.success("Profil berhasil disimpan!");
    } catch (e) {
      ue.error(`Gagal menyimpan: ${e.message}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Data Profil Pegawai" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Perbarui informasi profil Anda di sini" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-5", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "profil.loading_state", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profil-nama", children: "Nama Lengkap *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profil-nama",
                "data-ocid": "profil.nama_input",
                value: form.nama,
                onChange: (e) => handleChange("nama", e.target.value),
                placeholder: "Nama lengkap"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profil-nip", children: "NIP *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profil-nip",
                "data-ocid": "profil.nip_input",
                value: form.nip,
                onChange: (e) => handleChange("nip", e.target.value),
                placeholder: "Nomor Induk Pegawai"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profil-jabatan", children: "Jabatan *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "profil-jabatan",
              "data-ocid": "profil.jabatan_input",
              value: form.jabatan,
              onChange: (e) => handleChange("jabatan", e.target.value),
              placeholder: "Jabatan / Posisi"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "profil-lokasi",
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                "Lokasi Kerja (Desa Binaan) *"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "profil-lokasi",
              "data-ocid": "profil.lokasi_input",
              value: form.lokasiKerja,
              onChange: (e) => handleChange("lokasiKerja", e.target.value),
              placeholder: "Desa/kelurahan binaan"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profil-kecamatan", children: "Kecamatan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profil-kecamatan",
                "data-ocid": "profil.kecamatan_input",
                value: form.kecamatan,
                onChange: (e) => handleChange("kecamatan", e.target.value),
                placeholder: "Kecamatan"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profil-kabupaten", children: "Kabupaten/Kota" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "profil-kabupaten",
                "data-ocid": "profil.kabupaten_input",
                value: form.kabupaten,
                onChange: (e) => handleChange("kabupaten", e.target.value),
                placeholder: "Kabupaten/Kota"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleSave,
            disabled: mutation.isPending,
            "data-ocid": "profil.save_button",
            children: [
              mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
              mutation.isPending ? "Menyimpan..." : "Simpan Profil"
            ]
          }
        ) })
      ] }) })
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
  ProfilSaya as default
};
