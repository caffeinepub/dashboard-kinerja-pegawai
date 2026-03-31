import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  Target,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { Suspense, lazy, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerEmployeeProfile } from "../hooks/useQueries";

// Lazy load all pages — only loaded when user navigates to them
const CapaianSaya = lazy(() => import("../pages/employee/CapaianSaya"));
const EmployeeDashboard = lazy(
  () => import("../pages/employee/EmployeeDashboard"),
);
const ProfilSaya = lazy(() => import("../pages/employee/ProfilSaya"));

export type EmployeePage = "dashboard" | "capaian" | "profil";

const navItems = [
  {
    id: "dashboard" as EmployeePage,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  { id: "capaian" as EmployeePage, label: "Capaian Saya (SKP)", icon: Target },
  { id: "profil" as EmployeePage, label: "Profil Saya", icon: User },
];

function isProfileComplete(
  profile:
    | {
        nama: string;
        nip: string;
        jabatan: string;
        lokasiKerja: string;
        kecamatan: string;
        kabupaten: string;
      }
    | null
    | undefined,
) {
  if (!profile) return false;
  return (
    profile.nama.trim() !== "" &&
    profile.nip.trim() !== "" &&
    profile.jabatan.trim() !== ""
  );
}

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["sk1", "sk2", "sk3", "sk4"].map((sk) => (
          <Skeleton key={sk} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-48 rounded-xl" />
    </div>
  );
}

export default function EmployeeLayout() {
  const [currentPage, setCurrentPage] = useState<EmployeePage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { clear } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } =
    useGetCallerEmployeeProfile();

  const profileComplete = !profileLoading && isProfileComplete(profile);
  const profileIncomplete = !profileLoading && !profileComplete;

  // Force profil page if profile is incomplete
  const activePage: EmployeePage =
    profileIncomplete && currentPage !== "profil" ? "profil" : currentPage;

  const displayName = profile?.nama ?? "Pegawai";
  const closeSidebar = () => setSidebarOpen(false);

  const handleNavClick = (pageId: EmployeePage) => {
    if (profileIncomplete && pageId !== "profil") return;
    setCurrentPage(pageId);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={closeSidebar}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeSidebar();
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-30 w-60 flex flex-col bg-sidebar-gradient transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        data-ocid="employee.panel"
      >
        {/* Brand */}
        <div className="flex items-center justify-between p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">BKKBN</p>
              <p className="text-white/50 text-xs mt-0.5">e-Performance</p>
            </div>
          </div>
          <button
            type="button"
            className="lg:hidden text-white/60 hover:text-white"
            onClick={closeSidebar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-xs font-medium truncate">
                {displayName}
              </p>
              <p className="text-white/50 text-xs">
                {profile?.jabatan ?? "Pegawai"}
              </p>
            </div>
          </div>
        </div>

        {/* Incomplete profile warning badge in sidebar */}
        {profileIncomplete && (
          <div className="px-3 pb-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <p className="text-yellow-200 text-xs leading-snug">
                Profil belum lengkap
              </p>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-1" data-ocid="employee.link">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const isDisabled = profileIncomplete && item.id !== "profil";
            return (
              <button
                key={item.id}
                type="button"
                data-ocid={`employee.${item.id}.tab`}
                onClick={() => handleNavClick(item.id)}
                disabled={isDisabled}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                  isActive
                    ? "bg-white/20 text-white font-semibold border-l-[3px] border-white/80 rounded-l-none"
                    : isDisabled
                      ? "text-white/30 cursor-not-allowed"
                      : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {isDisabled && (
                  <span className="ml-auto text-[9px] bg-yellow-400/20 text-yellow-300 px-1.5 py-0.5 rounded">
                    Kunci
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            data-ocid="employee.logout_button"
            variant="ghost"
            className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
            onClick={clear}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-6 h-14 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Selamat datang, {displayName}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </header>

        {/* Profile incomplete banner */}
        {profileIncomplete && (
          <div
            className="px-6 pt-4"
            data-ocid="employee.profile_incomplete.error_state"
          >
            <Alert className="border-yellow-400/50 bg-yellow-50 dark:bg-yellow-950/30">
              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200 text-sm">
                <strong>
                  Lengkapi data profil Anda terlebih dahulu sebelum menggunakan
                  aplikasi.
                </strong>{" "}
                Isi semua field yang diperlukan (Nama, NIP, Jabatan, Lokasi
                Kerja, Kecamatan, Kabupaten) lalu klik{" "}
                <strong>Simpan Profil</strong>. Menu lain akan terbuka setelah
                profil tersimpan.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<PageLoader />}>
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activePage === "dashboard" && profileComplete && (
                <EmployeeDashboard setCurrentPage={setCurrentPage} />
              )}
              {activePage === "capaian" && profileComplete && <CapaianSaya />}
              {(activePage === "profil" || profileIncomplete) && <ProfilSaya />}
            </motion.div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
