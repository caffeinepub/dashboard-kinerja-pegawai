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
import { Separator } from "@/components/ui/separator";
import { Info, Loader2, LogOut, MapPin, Shield, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useMutationAssignAdminRole,
  useMutationCreateEmployeeProfile,
  useMutationRequestApproval,
} from "../hooks/useQueries";

export default function RegistrationPage() {
  const { identity, clear } = useInternetIdentity();
  const [form, setForm] = useState({
    nama: "",
    nip: "",
    jabatan: "",
    lokasiKerja: "",
    kecamatan: "",
    kabupaten: "",
  });

  const profileMutation = useMutationCreateEmployeeProfile();
  const approvalMutation = useMutationRequestApproval();
  const adminMutation = useMutationAssignAdminRole();

  const principal = identity?.getPrincipal();

  const isSubmitting = profileMutation.isPending || approvalMutation.isPending;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (
      !form.nama ||
      !form.nip ||
      !form.jabatan ||
      !form.lokasiKerja ||
      !form.kecamatan ||
      !form.kabupaten
    ) {
      toast.error("Harap lengkapi semua field!");
      return;
    }
    try {
      await profileMutation.mutateAsync(form);
      await approvalMutation.mutateAsync();
      toast.success("Pendaftaran berhasil! Menunggu persetujuan admin.");
    } catch (e: any) {
      toast.error(`Gagal mendaftar: ${e.message}`);
    }
  };

  const handleSetAdmin = async () => {
    if (!principal) return;
    try {
      await adminMutation.mutateAsync(principal);
      toast.success("Berhasil ditetapkan sebagai Admin!");
    } catch (e: any) {
      toast.error(`Gagal: ${e.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-sidebar-gradient flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Pendaftaran Pegawai
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Lengkapi data diri untuk mendaftar dan meminta persetujuan admin
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Data Pegawai</CardTitle>
            <CardDescription>
              Isi formulir berikut dengan data yang benar dan lengkap.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="nama">Nama Lengkap *</Label>
                <Input
                  id="nama"
                  data-ocid="registration.input"
                  value={form.nama}
                  onChange={(e) => handleChange("nama", e.target.value)}
                  placeholder="Nama lengkap sesuai KTP"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nip">NIP *</Label>
                <Input
                  id="nip"
                  data-ocid="registration.nip_input"
                  value={form.nip}
                  onChange={(e) => handleChange("nip", e.target.value)}
                  placeholder="Nomor Induk Pegawai"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="jabatan">Jabatan *</Label>
              <Input
                id="jabatan"
                data-ocid="registration.jabatan_input"
                value={form.jabatan}
                onChange={(e) => handleChange("jabatan", e.target.value)}
                placeholder="Jabatan / Posisi"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lokasiKerja" className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                Lokasi Kerja (Desa Binaan) *
              </Label>
              <Input
                id="lokasiKerja"
                data-ocid="registration.lokasi_input"
                value={form.lokasiKerja}
                onChange={(e) => handleChange("lokasiKerja", e.target.value)}
                placeholder="Nama desa/kelurahan binaan"
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Info className="w-3 h-3" />
                Isi per desa jika memiliki lebih dari satu lokasi
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="kecamatan">Kecamatan *</Label>
                <Input
                  id="kecamatan"
                  data-ocid="registration.kecamatan_input"
                  value={form.kecamatan}
                  onChange={(e) => handleChange("kecamatan", e.target.value)}
                  placeholder="Kecamatan"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="kabupaten">Kabupaten/Kota *</Label>
                <Input
                  id="kabupaten"
                  data-ocid="registration.kabupaten_input"
                  value={form.kabupaten}
                  onChange={(e) => handleChange("kabupaten", e.target.value)}
                  placeholder="Kabupaten/Kota"
                />
              </div>
            </div>

            <Button
              data-ocid="registration.submit_button"
              onClick={handleRegister}
              disabled={isSubmitting}
              className="w-full h-11"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <UserPlus className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? "Mendaftarkan..." : "Daftar & Minta Persetujuan"}
            </Button>
          </CardContent>
        </Card>

        {/* Admin Setup Section */}
        <Card className="border-dashed border-warning/50 bg-warning/5">
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-warning mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">
                  Setup Administrator (Pertama Kali)
                </p>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  Jika Anda adalah administrator pertama sistem ini, klik tombol
                  berikut untuk mendaftarkan diri sebagai admin. Fitur ini hanya
                  untuk setup awal.
                </p>
                <Button
                  data-ocid="registration.admin_button"
                  variant="outline"
                  size="sm"
                  onClick={handleSetAdmin}
                  disabled={adminMutation.isPending}
                  className="border-warning/50 text-warning hover:bg-warning/10"
                >
                  {adminMutation.isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  ) : (
                    <Shield className="w-3.5 h-3.5 mr-1.5" />
                  )}
                  Jadikan Saya Admin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            data-ocid="registration.logout_button"
            variant="ghost"
            size="sm"
            onClick={clear}
            className="text-muted-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Keluar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
