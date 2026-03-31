import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  ClipboardList,
  Clock,
  Loader2,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ApprovalStatus } from "../../backend";
import DonutChart from "../../components/DonutChart";
import {
  useGetAllEmployeeProfiles,
  useGetAllEmployeesPerformanceSummary,
  useGetAllFeedback,
  useGetAllPerformanceEntries,
  useListApprovals,
  useMutationSetApproval,
} from "../../hooks/useQueries";
import type { AdminPage } from "../../layouts/AdminLayout";

const shortPrincipal = (p: { toString(): string }) =>
  `${p.toString().slice(0, 10)}...`;

interface Props {
  setCurrentPage: (page: AdminPage) => void;
}

export default function AdminDashboard({ setCurrentPage }: Props) {
  const currentYear = new Date().getFullYear().toString();
  const { data: profiles, isLoading: profilesLoading } =
    useGetAllEmployeeProfiles();
  const { data: allEntries, isLoading: entriesLoading } =
    useGetAllPerformanceEntries();
  const { data: approvals, isLoading: approvalsLoading } = useListApprovals();
  const { data: summaries, isLoading: summariesLoading } =
    useGetAllEmployeesPerformanceSummary(currentYear);
  const { data: feedbacks, isLoading: feedbackLoading } = useGetAllFeedback();
  const approvalMutation = useMutationSetApproval();

  const totalPegawai = profiles?.length ?? 0;
  const totalEntri = allEntries?.length ?? 0;
  const pendingApprovals =
    approvals?.filter((a) => a.status === ApprovalStatus.pending) ?? [];
  const pendingCount = pendingApprovals.length;
  const avgNilai =
    summaries && summaries.length > 0
      ? summaries.reduce((sum, s) => sum + s.averageAchievement, 0) /
        summaries.length
      : 0;

  const kpiCards = [
    {
      title: "Total Pegawai",
      value: totalPegawai,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
      loading: profilesLoading,
    },
    {
      title: "Entri Kinerja",
      value: totalEntri,
      icon: ClipboardList,
      color: "text-success",
      bg: "bg-success/10",
      loading: entriesLoading,
    },
    {
      title: "Pending Approval",
      value: pendingCount,
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning/10",
      loading: approvalsLoading,
    },
    {
      title: "Nilai Rata-rata",
      value: `${avgNilai.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-chart-5",
      bg: "bg-chart-5/10",
      loading: summariesLoading,
    },
  ];

  const handleApprove = async (principal: { toString(): string }) => {
    try {
      await approvalMutation.mutateAsync({
        principal: principal as any,
        status: ApprovalStatus.approved,
      });
      toast.success("Pegawai berhasil disetujui!");
    } catch (e: any) {
      toast.error(`Gagal: ${e.message}`);
    }
  };

  const handleReject = async (principal: { toString(): string }) => {
    try {
      await approvalMutation.mutateAsync({
        principal: principal as any,
        status: ApprovalStatus.rejected,
      });
      toast.success("Pendaftaran ditolak.");
    } catch (e: any) {
      toast.error(`Gagal: ${e.message}`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="shadow-card">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {card.title}
                  </p>
                  <div
                    className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}
                  >
                    <card.icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                </div>
                {card.loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-2xl font-bold text-foreground">
                    {card.value}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Performance Table + Donut */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="shadow-card xl:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Sasaran Kinerja Pegawai (SKP)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {entriesLoading ? (
              <div className="p-6 space-y-3" data-ocid="skp.loading_state">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table data-ocid="skp.table">
                  <TableHeader>
                    <TableRow className="table-header-bg">
                      <TableHead className="w-10">No</TableHead>
                      <TableHead>Pegawai (ID)</TableHead>
                      <TableHead>Sasaran Kinerja</TableHead>
                      <TableHead className="text-center">Ind.</TableHead>
                      <TableHead className="w-36">Capaian</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(allEntries ?? []).length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center text-muted-foreground py-10"
                          data-ocid="skp.empty_state"
                        >
                          Belum ada data entri kinerja
                        </TableCell>
                      </TableRow>
                    ) : (
                      (allEntries ?? []).slice(0, 10).map((entry, idx) => {
                        const avgCapaian =
                          entry.indicatorList.length > 0
                            ? entry.indicatorList.reduce(
                                (s, ind) => s + ind.capaianPersentase,
                                0,
                              ) / entry.indicatorList.length
                            : 0;
                        const isSesuai = avgCapaian >= 80;
                        return (
                          <TableRow
                            key={`${entry.employeeId.toString()}-${entry.sasaranKinerja}`}
                            data-ocid={`skp.item.${idx + 1}`}
                          >
                            <TableCell className="text-muted-foreground text-xs">
                              {idx + 1}
                            </TableCell>
                            <TableCell className="text-xs font-mono text-muted-foreground">
                              {shortPrincipal(entry.employeeId)}
                            </TableCell>
                            <TableCell className="text-sm max-w-[180px] truncate">
                              {entry.sasaranKinerja}
                            </TableCell>
                            <TableCell className="text-center text-sm">
                              {entry.indicatorList.length}
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <span className="text-xs text-muted-foreground">
                                  {avgCapaian.toFixed(1)}%
                                </span>
                                <Progress
                                  value={Math.min(avgCapaian, 100)}
                                  className="h-1.5"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                className={
                                  isSesuai
                                    ? "bg-success/10 text-success border-success/20"
                                    : "bg-warning/10 text-warning-foreground border-warning/20"
                                }
                                variant="outline"
                              >
                                {isSesuai ? "Sesuai" : "Belum Sesuai"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Donut summary */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Rata-rata Capaian {currentYear}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-5">
            {summariesLoading ? (
              <Skeleton className="w-36 h-36 rounded-full" />
            ) : (
              <DonutChart
                percentage={avgNilai}
                size={144}
                label="Keseluruhan"
              />
            )}
            <div className="w-full space-y-2.5">
              {(summaries ?? []).slice(0, 5).map((s) => (
                <div
                  key={s.employeeId.toString()}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-muted-foreground font-mono truncate w-24">
                    {shortPrincipal(s.employeeId)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={Math.min(s.averageAchievement, 100)}
                      className="h-1.5 w-16"
                    />
                    <span className="text-foreground font-medium w-10 text-right">
                      {s.averageAchievement.toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
              {(summaries ?? []).length === 0 && !summariesLoading && (
                <p className="text-xs text-muted-foreground text-center py-4">
                  Belum ada data
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card className="shadow-card">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">
              Persetujuan Registrasi Pegawai
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary h-7"
              onClick={() => setCurrentPage("approvals")}
              data-ocid="admin.approvals.link"
            >
              Lihat Semua
            </Button>
          </CardHeader>
          <CardContent>
            {approvalsLoading ? (
              <div className="space-y-3" data-ocid="approvals.loading_state">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : pendingApprovals.length === 0 ? (
              <div
                className="text-center py-8"
                data-ocid="approvals.empty_state"
              >
                <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Semua pendaftaran telah diproses
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingApprovals.slice(0, 5).map((approval, i) => (
                  <div
                    key={approval.principal.toString()}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    data-ocid={`approvals.item.${i + 1}`}
                  >
                    <div>
                      <p className="text-xs font-mono text-foreground">
                        {shortPrincipal(approval.principal)}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-xs mt-1 bg-warning/10 text-warning-foreground border-warning/20"
                      >
                        Pending
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="h-7 text-xs px-2"
                        onClick={() => handleApprove(approval.principal)}
                        disabled={approvalMutation.isPending}
                        data-ocid={`approvals.confirm_button.${i + 1}`}
                      >
                        {approvalMutation.isPending ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        )}
                        Setujui
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 text-xs px-2"
                        onClick={() => handleReject(approval.principal)}
                        disabled={approvalMutation.isPending}
                        data-ocid={`approvals.delete_button.${i + 1}`}
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Tolak
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card className="shadow-card">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Feedback Terbaru</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary h-7"
              onClick={() => setCurrentPage("feedback")}
              data-ocid="admin.feedback.link"
            >
              Lihat Semua
            </Button>
          </CardHeader>
          <CardContent>
            {feedbackLoading ? (
              <div className="space-y-3" data-ocid="feedback.loading_state">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : (feedbacks ?? []).length === 0 ? (
              <div
                className="text-center py-8"
                data-ocid="feedback.empty_state"
              >
                <p className="text-sm text-muted-foreground">
                  Belum ada feedback
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {(feedbacks ?? []).slice(0, 4).map((f) => (
                  <div
                    key={`${f.employeeId.toString()}-${f.period}`}
                    className="p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        {shortPrincipal(f.employeeId)}
                      </span>
                      <span className="text-xs text-warning">
                        {"★".repeat(Number(f.overallRating))}
                        {"☆".repeat(Math.max(0, 5 - Number(f.overallRating)))}
                      </span>
                    </div>
                    <p className="text-xs text-foreground line-clamp-2">
                      {f.feedbackText}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Periode: {f.period}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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
