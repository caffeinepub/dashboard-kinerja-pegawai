import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  Target,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerEmployeeProfile } from "../hooks/useQueries";
import CapaianSaya from "../pages/employee/CapaianSaya";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import ProfilSaya from "../pages/employee/ProfilSaya";

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

export default function EmployeeLayout() {
  const [currentPage, setCurrentPage] = useState<EmployeePage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { clear } = useInternetIdentity();
  const { data: profile } = useGetCallerEmployeeProfile();

  const displayName = profile?.nama ?? "Pegawai";
  const closeSidebar = () => setSidebarOpen(false);

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

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-1" data-ocid="employee.link">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                data-ocid={`employee.${item.id}.tab`}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                  isActive
                    ? "bg-white/20 text-white font-semibold border-l-[3px] border-white/80 rounded-l-none"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
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

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {currentPage === "dashboard" && (
              <EmployeeDashboard setCurrentPage={setCurrentPage} />
            )}
            {currentPage === "capaian" && <CapaianSaya />}
            {currentPage === "profil" && <ProfilSaya />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
