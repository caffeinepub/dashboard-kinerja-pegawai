import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { Suspense, lazy, useState } from "react";
import { ApprovalStatus } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useListApprovals } from "../hooks/useQueries";

// Lazy load all pages — only loaded when user navigates to them
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const ApprovalManagement = lazy(
  () => import("../pages/admin/ApprovalManagement"),
);
const FeedbackReview = lazy(() => import("../pages/admin/FeedbackReview"));
const PenilaianKinerja = lazy(() => import("../pages/admin/PenilaianKinerja"));
const SasaranKinerjaAdmin = lazy(
  () => import("../pages/admin/SasaranKinerjaAdmin"),
);

export type AdminPage =
  | "dashboard"
  | "approvals"
  | "skp"
  | "penilaian"
  | "feedback";

interface NavItem {
  id: AdminPage;
  label: string;
  icon: React.ElementType;
  badgeKey?: "pending";
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "skp", label: "Sasaran Kinerja", icon: ClipboardList },
  {
    id: "approvals",
    label: "Registrasi Pegawai",
    icon: Users,
    badgeKey: "pending",
  },
  { id: "penilaian", label: "Penilaian Kinerja", icon: Star },
  { id: "feedback", label: "Feedback & Review", icon: MessageSquare },
];

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {["sk1", "sk2", "sk3", "sk4"].map((sk) => (
          <Skeleton key={sk} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}

export default function AdminLayout() {
  const [currentPage, setCurrentPage] = useState<AdminPage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { clear, identity } = useInternetIdentity();
  const { data: approvals } = useListApprovals();

  const pendingCount =
    approvals?.filter((a) => a.status === ApprovalStatus.pending).length ?? 0;

  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal ? `${principal.slice(0, 12)}...` : "Admin";

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
          "fixed lg:relative inset-y-0 left-0 z-30 w-64 flex flex-col bg-sidebar-gradient transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        data-ocid="admin.panel"
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

        {/* Admin badge */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-xs font-medium truncate">
                {shortPrincipal}
              </p>
              <p className="text-white/50 text-xs">Administrator</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-1" data-ocid="admin.link">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const badge = item.badgeKey === "pending" ? pendingCount : 0;
            return (
              <button
                key={item.id}
                type="button"
                data-ocid={`admin.${item.id}.tab`}
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
                <span className="flex-1">{item.label}</span>
                {badge > 0 && (
                  <Badge className="bg-warning text-warning-foreground text-xs px-1.5 py-0 h-5">
                    {badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            data-ocid="admin.logout_button"
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
                {navItems.find((n) => n.id === currentPage)?.label ??
                  "Dashboard"}
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
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Admin
            </Badge>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<PageLoader />}>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {currentPage === "dashboard" && (
                <AdminDashboard setCurrentPage={setCurrentPage} />
              )}
              {currentPage === "approvals" && <ApprovalManagement />}
              {currentPage === "skp" && <SasaranKinerjaAdmin />}
              {currentPage === "penilaian" && <PenilaianKinerja />}
              {currentPage === "feedback" && <FeedbackReview />}
            </motion.div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
