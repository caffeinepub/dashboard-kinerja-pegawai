import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { Principal } from "@icp-sdk/core/principal";
import {
  ArrowRight,
  Award,
  MapPin,
  Star,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import DonutChart from "../../components/DonutChart";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  useGetCallerEmployeeProfile,
  useGetCallerPerformanceEntries,
  useGetFeedbackForEmployee,
} from "../../hooks/useQueries";
import type { EmployeePage } from "../../layouts/EmployeeLayout";

interface Props {
  setCurrentPage: (page: EmployeePage) => void;
}

export default function EmployeeDashboard({ setCurrentPage }: Props) {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal() as Principal | undefined;

  const { data: profile, isLoading: profileLoading } =
    useGetCallerEmployeeProfile();
  const { data: entries, isLoading: entriesLoading } =
    useGetCallerPerformanceEntries();
  const { data: feedbacks, isLoading: feedbackLoading } =
    useGetFeedbackForEmployee(principal ?? null);

  const currentYear = new Date().getFullYear().toString();
  const yearEntries = (entries ?? []).filter((e) => e.period === currentYear);
  const totalSasaran = yearEntries.length;

  const avgCapaian =
    yearEntries.length > 0
      ? yearEntries.reduce((total, entry) => {
          const entryAvg =
            entry.indicatorList.length > 0
              ? entry.indicatorList.reduce(
                  (s, ind) => s + ind.capaianPersentase,
                  0,
                ) / entry.indicatorList.length
              : 0;
          return total + entryAvg;
        }, 0) / yearEntries.length
      : 0;

  const latestFeedback = (feedbacks ?? []).sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  )[0];
  const avgRating =
    (feedbacks ?? []).length > 0
      ? (feedbacks ?? []).reduce((s, f) => s + Number(f.overallRating), 0) /
        (feedbacks ?? []).length
      : 0;

  const kpiCards = [
    {
      title: "Sasaran Kinerja",
      value: totalSasaran,
      icon: Target,
      color: "text-primary",
      bg: "bg-primary/10",
      loading: entriesLoading,
    },
    {
      title: "Rata-rata Capaian",
      value: `${avgCapaian.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
      loading: entriesLoading,
    },
    {
      title: "Nilai dari Admin",
      value: avgRating > 0 ? `${avgRating.toFixed(1)}/5` : "—",
      icon: Star,
      color: "text-warning",
      bg: "bg-warning/10",
      loading: feedbackLoading,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Profile Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-card bg-sidebar-gradient text-white">
          <CardContent className="p-6">
            {profileLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-40 bg-white/20" />
                <Skeleton className="h-4 w-60 bg-white/10" />
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {profile?.nama ?? "—"}
                    </h2>
                    <p className="text-white/70 text-sm">
                      {profile?.jabatan ?? "—"}
                    </p>
                    <p className="text-white/50 text-xs mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {profile?.lokasiKerja}, {profile?.kecamatan},{" "}
                      {profile?.kabupaten}
                    </p>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-0 text-xs">
                  NIP: {profile?.nip ?? "—"}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        {kpiCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <div
                    className={`w-7 h-7 rounded-lg ${card.bg} flex items-center justify-center`}
                  >
                    <card.icon className={`w-3.5 h-3.5 ${card.color}`} />
                  </div>
                </div>
                {card.loading ? (
                  <Skeleton className="h-7 w-14" />
                ) : (
                  <p className="text-xl font-bold text-foreground">
                    {card.value}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Capaian + Feedback */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent SKP */}
        <Card className="shadow-card">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">
              Sasaran Kinerja {currentYear}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary h-7"
              onClick={() => setCurrentPage("capaian")}
              data-ocid="employee.capaian.link"
            >
              Kelola
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {entriesLoading ? (
              <div className="space-y-3" data-ocid="skp.loading_state">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : yearEntries.length === 0 ? (
              <div className="text-center py-10" data-ocid="skp.empty_state">
                <Target className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Belum ada sasaran kinerja
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => setCurrentPage("capaian")}
                  data-ocid="employee.add_capaian.button"
                >
                  Tambah Sekarang
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {yearEntries.slice(0, 3).map((entry) => {
                  const avg =
                    entry.indicatorList.length > 0
                      ? entry.indicatorList.reduce(
                          (s, ind) => s + ind.capaianPersentase,
                          0,
                        ) / entry.indicatorList.length
                      : 0;
                  return (
                    <div
                      key={`${entry.period}-${entry.sasaranKinerja}`}
                      className="p-3 bg-muted/40 rounded-lg"
                    >
                      <p className="text-sm font-medium text-foreground truncate">
                        {entry.sasaranKinerja}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <Progress
                          value={Math.min(avg, 100)}
                          className="flex-1 h-1.5"
                        />
                        <span className="text-xs text-muted-foreground w-12 text-right">
                          {avg.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feedback from Admin + Donut */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Penilaian dari Admin</CardTitle>
          </CardHeader>
          <CardContent>
            {feedbackLoading ? (
              <div className="space-y-3" data-ocid="feedback.loading_state">
                <Skeleton className="w-32 h-32 rounded-full mx-auto" />
              </div>
            ) : (feedbacks ?? []).length === 0 ? (
              <div
                className="text-center py-10"
                data-ocid="feedback.empty_state"
              >
                <Award className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Belum ada penilaian dari admin
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5">
                <DonutChart
                  percentage={(avgRating / 5) * 100}
                  size={130}
                  label="Rating Admin"
                />
                {latestFeedback && (
                  <div className="w-full p-4 bg-muted/40 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Feedback Terbaru
                      </span>
                      <span className="text-sm text-warning">
                        {"★".repeat(Number(latestFeedback.overallRating))}
                        {"☆".repeat(5 - Number(latestFeedback.overallRating))}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">
                      {latestFeedback.feedbackText}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Periode: {latestFeedback.period}
                    </p>
                  </div>
                )}
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
