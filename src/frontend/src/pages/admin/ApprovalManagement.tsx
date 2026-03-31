import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Loader2, Users, XCircle } from "lucide-react";
import { toast } from "sonner";
import { ApprovalStatus } from "../../backend";
import {
  useListApprovals,
  useMutationSetApproval,
} from "../../hooks/useQueries";

const shortPrincipal = (p: { toString(): string }) =>
  `${p.toString().slice(0, 16)}...`;

const statusConfig = {
  [ApprovalStatus.pending]: {
    label: "Pending",
    class: "bg-warning/10 text-warning-foreground border-warning/30",
  },
  [ApprovalStatus.approved]: {
    label: "Disetujui",
    class: "bg-success/10 text-success border-success/30",
  },
  [ApprovalStatus.rejected]: {
    label: "Ditolak",
    class: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

export default function ApprovalManagement() {
  const { data: approvals, isLoading } = useListApprovals();
  const mutation = useMutationSetApproval();

  const pending =
    approvals?.filter((a) => a.status === ApprovalStatus.pending) ?? [];
  const approved =
    approvals?.filter((a) => a.status === ApprovalStatus.approved) ?? [];
  const rejected =
    approvals?.filter((a) => a.status === ApprovalStatus.rejected) ?? [];

  const handleApprove = async (principal: any) => {
    try {
      await mutation.mutateAsync({
        principal,
        status: ApprovalStatus.approved,
      });
      toast.success("Pegawai berhasil disetujui!");
    } catch (e: any) {
      toast.error(`Gagal: ${e.message}`);
    }
  };

  const handleReject = async (principal: any) => {
    try {
      await mutation.mutateAsync({
        principal,
        status: ApprovalStatus.rejected,
      });
      toast.success("Pendaftaran ditolak.");
    } catch (e: any) {
      toast.error(`Gagal: ${e.message}`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Menunggu",
            count: pending.length,
            color: "text-warning",
            bg: "bg-warning/10",
          },
          {
            label: "Disetujui",
            count: approved.length,
            color: "text-success",
            bg: "bg-success/10",
          },
          {
            label: "Ditolak",
            count: rejected.length,
            color: "text-destructive",
            bg: "bg-destructive/10",
          },
        ].map((stat) => (
          <Card key={stat.label} className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}
              >
                <Users className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.count}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* All approvals table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Daftar Registrasi Pegawai</CardTitle>
          <CardDescription>
            Kelola persetujuan pendaftaran pegawai baru
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3" data-ocid="approvals.loading_state">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (approvals ?? []).length === 0 ? (
            <div
              className="text-center py-16"
              data-ocid="approvals.empty_state"
            >
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Belum ada pendaftaran pegawai
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="approvals.table">
                <TableHeader>
                  <TableRow className="table-header-bg">
                    <TableHead className="w-10">No</TableHead>
                    <TableHead>Principal ID</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(approvals ?? []).map((approval, i) => (
                    <TableRow
                      key={approval.principal.toString()}
                      data-ocid={`approvals.item.${i + 1}`}
                    >
                      <TableCell className="text-muted-foreground text-xs">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-foreground">
                        {shortPrincipal(approval.principal)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`text-xs ${statusConfig[approval.status]?.class ?? ""}`}
                        >
                          {statusConfig[approval.status]?.label ??
                            approval.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {approval.status === ApprovalStatus.pending && (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => handleApprove(approval.principal)}
                              disabled={mutation.isPending}
                              data-ocid={`approvals.confirm_button.${i + 1}`}
                            >
                              {mutation.isPending ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              )}
                              Setujui
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-7 text-xs"
                              onClick={() => handleReject(approval.principal)}
                              disabled={mutation.isPending}
                              data-ocid={`approvals.delete_button.${i + 1}`}
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Tolak
                            </Button>
                          </div>
                        )}
                        {approval.status !== ApprovalStatus.pending && (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
