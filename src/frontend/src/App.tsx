import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";
import { ApprovalStatus, UserRole } from "./backend";
import { useActor } from "./hooks/useActor";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useQueryStatus } from "./hooks/useQueries";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import LoginPage from "./pages/LoginPage";
import PendingApprovalPage from "./pages/PendingApprovalPage";
import RegistrationPage from "./pages/RegistrationPage";
import RejectedPage from "./pages/RejectedPage";

function LoadingScreen() {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-card">
          <Loader2 className="w-7 h-7 text-primary-foreground animate-spin" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground">BKKBN e-Performance</p>
          <p className="text-muted-foreground text-sm mt-1">
            Memuat aplikasi...
          </p>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { identity, isInitializing } = useInternetIdentity();
  const { isFetching: actorLoading } = useActor();
  const { data: status, isLoading: statusLoading } = useQueryStatus();

  if (isInitializing || (!!identity && actorLoading)) return <LoadingScreen />;
  if (!identity) return <LoginPage />;
  if (statusLoading || !status) return <LoadingScreen />;

  const { accessLevel, approvalStatus } = status;

  if (accessLevel === UserRole.admin) return <AdminLayout />;
  if (
    approvalStatus === ApprovalStatus.approved &&
    accessLevel === UserRole.user
  )
    return <EmployeeLayout />;
  if (approvalStatus === ApprovalStatus.pending) return <PendingApprovalPage />;
  if (approvalStatus === ApprovalStatus.rejected) return <RejectedPage />;
  return <RegistrationPage />;
}

export default function App() {
  return (
    <>
      <AppContent />
      <Toaster richColors position="top-right" />
    </>
  );
}
