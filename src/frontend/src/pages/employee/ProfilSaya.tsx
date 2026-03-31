import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, MapPin, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetCallerEmployeeProfile,
  useMutationCreateEmployeeProfile,
} from "../../hooks/useQueries";

export default function ProfilSaya() {
  const { data: profile, isLoading } = useGetCallerEmployeeProfile();
  const mutation = useMutationCreateEmployeeProfile();

  const [form, setForm] = useState({
    nama: "",
    nip: "",
    jabatan: "",
    lokasiKerja: "",
    kecamatan: "",
    kabupaten: "",
  });

  // Initialize form from loaded profile
  useEffect(() => {
    if (profile) {
      setForm({
        nama: profile.nama ?? "",
        nip: profile.nip ?? "",
        jabatan: profile.jabatan ?? "",
        lokasiKerja: profile.lokasiKerja ?? "",
        kecamatan: profile.kecamatan ?? "",
        kabupaten: profile.kabupaten ?? "",
      });
    }
  }, [profile]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.nama || !form.nip || !form.jabatan) {
      toast.error("Harap isi Nama, NIP, dan Jabatan!");
      return;
    }
    try {
      await mutation.mutateAsync(form);
      toast.success("Profil berhasil disimpan!");
    } catch (e: any) {
      toast.error(`Gagal menyimpan: ${e.message}`);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Data Profil Pegawai</CardTitle>
              <CardDescription>
                Perbarui informasi profil Anda di sini
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {isLoading ? (
            <div className="space-y-4" data-ocid="profil.loading_state">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="profil-nama">Nama Lengkap *</Label>
                  <Input
                    id="profil-nama"
                    data-ocid="profil.nama_input"
                    value={form.nama}
                    onChange={(e) => handleChange("nama", e.target.value)}
                    placeholder="Nama lengkap"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="profil-nip">NIP *</Label>
                  <Input
                    id="profil-nip"
                    data-ocid="profil.nip_input"
                    value={form.nip}
                    onChange={(e) => handleChange("nip", e.target.value)}
                    placeholder="Nomor Induk Pegawai"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profil-jabatan">Jabatan *</Label>
                <Input
                  id="profil-jabatan"
                  data-ocid="profil.jabatan_input"
                  value={form.jabatan}
                  onChange={(e) => handleChange("jabatan", e.target.value)}
                  placeholder="Jabatan / Posisi"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="profil-lokasi"
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  Lokasi Kerja (Desa Binaan) *
                </Label>
                <Input
                  id="profil-lokasi"
                  data-ocid="profil.lokasi_input"
                  value={form.lokasiKerja}
                  onChange={(e) => handleChange("lokasiKerja", e.target.value)}
                  placeholder="Desa/kelurahan binaan"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="profil-kecamatan">Kecamatan</Label>
                  <Input
                    id="profil-kecamatan"
                    data-ocid="profil.kecamatan_input"
                    value={form.kecamatan}
                    onChange={(e) => handleChange("kecamatan", e.target.value)}
                    placeholder="Kecamatan"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="profil-kabupaten">Kabupaten/Kota</Label>
                  <Input
                    id="profil-kabupaten"
                    data-ocid="profil.kabupaten_input"
                    value={form.kabupaten}
                    onChange={(e) => handleChange("kabupaten", e.target.value)}
                    placeholder="Kabupaten/Kota"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleSave}
                  disabled={mutation.isPending}
                  data-ocid="profil.save_button"
                >
                  {mutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {mutation.isPending ? "Menyimpan..." : "Simpan Profil"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <footer className="text-center text-xs text-muted-foreground py-2">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
