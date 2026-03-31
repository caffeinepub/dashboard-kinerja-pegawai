import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { Principal } from "@icp-sdk/core/principal";
import { Info, Loader2, Star, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ApprovalStatus } from "../../backend";
import EmployeeProfilesTable from "../../components/EmployeeProfilesTable";
import {
  useGetAllEmployeesPerformanceSummary,
  useGetAllFeedback,
  useListApprovals,
  useMutationAddFeedback,
} from "../../hooks/useQueries";

const shortPrincipal = (p: { toString(): string }) =>
  `${p.toString().slice(0, 14)}...`;

function StarPicker({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-2xl transition-colors ${
            star <= value ? "text-warning" : "text-muted"
          } hover:text-warning`}
        >
          {star <= value ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}

export default function PenilaianKinerja() {
  const [period, setPeriod] = useState(new Date().getFullYear().toString());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Principal | null>(
    null,
  );
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(3);

  const { data: approvals, isLoading: approvalsLoading } = useListApprovals();
  const { data: summaries, isLoading: summariesLoading } =
    useGetAllEmployeesPerformanceSummary(period);
  const { data: feedbacks } = useGetAllFeedback();
  const feedbackMutation = useMutationAddFeedback();

  const approvedEmployees = (approvals ?? []).filter(
    (a) => a.status === ApprovalStatus.approved,
  );
  const summaryMap = new Map(
    (summaries ?? []).map((s) => [s.employeeId.toString(), s]),
  );
  const feedbackMap = new Map(
    (feedbacks ?? [])
      .filter((f) => f.period === period)
      .map((f) => [f.employeeId.toString(), f]),
  );

  const openModal = (principal: Principal) => {
    setSelectedEmployee(principal);
    const existing = feedbackMap.get(principal.toString());
    setFeedbackText(existing?.feedbackText ?? "");
    setRating(existing ? Number(existing.overallRating) : 3);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!selectedEmployee) return;
    if (!feedbackText.trim()) {
      toast.error("Harap isi teks feedback!");
      return;
    }
    try {
      await feedbackMutation.mutateAsync({
        employeeId: selectedEmployee,
        period,
        feedbackText,
        overallRating: rating,
      });
      toast.success("Penilaian berhasil disimpan!");
      setModalOpen(false);
    } catch (e: any) {
      toast.error(`Gagal: ${e.message}`);
    }
  };

  const isLoading = approvalsLoading || summariesLoading;

  return (
    <div className="p-6 space-y-6">
      {/* Profil Referensi */}
      <EmployeeProfilesTable compact />

      {/* Info note */}
      <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm text-muted-foreground">
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <span>
          Gunakan tabel profil di atas sebagai referensi data pegawai. Tabel
          penilaian di bawah menampilkan pegawai berdasarkan Principal ID.
        </span>
      </div>

      <div className="flex items-end gap-4">
        <div className="space-y-1">
          <Label htmlFor="period-penilaian">Periode</Label>
          <Input
            id="period-penilaian"
            data-ocid="penilaian.input"
            type="number"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-28"
            min="2020"
            max="2030"
          />
        </div>
        <p className="text-sm text-muted-foreground pb-1">
          {approvedEmployees.length} pegawai tersetujui pada periode {period}
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">
            Penilaian Kinerja Pegawai — Periode {period}
          </CardTitle>
          <CardDescription>
            Berikan rating dan feedback untuk setiap pegawai
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4" data-ocid="penilaian.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : approvedEmployees.length === 0 ? (
            <div
              className="text-center py-16"
              data-ocid="penilaian.empty_state"
            >
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Belum ada pegawai yang disetujui
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {approvedEmployees.map((emp, i) => {
                const summary = summaryMap.get(emp.principal.toString());
                const existing = feedbackMap.get(emp.principal.toString());
                return (
                  <div
                    key={emp.principal.toString()}
                    className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-border"
                    data-ocid={`penilaian.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-foreground">
                          {shortPrincipal(emp.principal)}
                        </p>
                        {summary ? (
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground">
                              Avg: {summary.averageAchievement.toFixed(1)}%
                            </span>
                            <Progress
                              value={Math.min(summary.averageAchievement, 100)}
                              className="h-1.5 w-20"
                            />
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Belum ada data kinerja
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {existing && (
                        <div className="text-right">
                          <span className="text-xs text-warning">
                            {"★".repeat(Number(existing.overallRating))}
                            {"☆".repeat(5 - Number(existing.overallRating))}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Sudah dinilai
                          </p>
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant={existing ? "outline" : "default"}
                        className="h-8 text-xs"
                        onClick={() => openModal(emp.principal as Principal)}
                        data-ocid={`penilaian.edit_button.${i + 1}`}
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {existing ? "Edit Penilaian" : "Beri Penilaian"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rating Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md" data-ocid="penilaian.dialog">
          <DialogHeader>
            <DialogTitle>Beri Penilaian Kinerja</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pegawai</p>
              <p className="font-mono text-xs bg-muted px-3 py-2 rounded-lg">
                {selectedEmployee?.toString()}
              </p>
            </div>
            <div className="space-y-1.5">
              <Label>Rating Keseluruhan</Label>
              <StarPicker value={rating} onChange={setRating} />
              <p className="text-xs text-muted-foreground">
                Rating: {rating}/5
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="feedback-text">Catatan Feedback</Label>
              <Textarea
                id="feedback-text"
                data-ocid="penilaian.textarea"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tuliskan catatan penilaian kinerja pegawai..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              data-ocid="penilaian.cancel_button"
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={feedbackMutation.isPending}
              data-ocid="penilaian.confirm_button"
            >
              {feedbackMutation.isPending && (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              )}
              Simpan Penilaian
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
