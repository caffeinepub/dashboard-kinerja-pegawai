import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { Principal } from "@icp-sdk/core/principal";
import { Loader2, Plus, Save, Target, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  useGetCallerPerformanceEntries,
  useMutationCreatePerformanceEntry,
} from "../../hooks/useQueries";

interface LocalIndicator {
  no: number;
  uraian: string;
  targetJumlah: number;
  targetSatuan: string;
  capaianJumlah: number;
  capaianPersentase: number;
  sumberDataEvaluasi: string;
  buktiDukung: string;
}

interface LocalEntry {
  sasaranKinerja: string;
  indicators: LocalIndicator[];
}

const calcPct = (capaian: number, target: number) =>
  target > 0 ? Math.round((capaian / target) * 100 * 10) / 10 : 0;

const emptyIndicator = (no: number): LocalIndicator => ({
  no,
  uraian: "",
  targetJumlah: 0,
  targetSatuan: "",
  capaianJumlah: 0,
  capaianPersentase: 0,
  sumberDataEvaluasi: "",
  buktiDukung: "",
});

interface EntryFormProps {
  initialEntry: LocalEntry;
  period: string;
  employeeId: Principal;
  onSaved: () => void;
}

function EntryForm({
  initialEntry,
  period,
  employeeId,
  onSaved,
}: EntryFormProps) {
  const [entry, setEntry] = useState<LocalEntry>(initialEntry);
  const mutation = useMutationCreatePerformanceEntry();

  const updateSasaran = (val: string) =>
    setEntry((prev) => ({ ...prev, sasaranKinerja: val }));

  const addIndicator = () => {
    setEntry((prev) => ({
      ...prev,
      indicators: [
        ...prev.indicators,
        emptyIndicator(prev.indicators.length + 1),
      ],
    }));
  };

  const removeIndicator = (idx: number) => {
    setEntry((prev) => ({
      ...prev,
      indicators: prev.indicators
        .filter((_, i) => i !== idx)
        .map((ind, i) => ({ ...ind, no: i + 1 })),
    }));
  };

  const updateIndicator = (
    idx: number,
    field: keyof LocalIndicator,
    rawVal: string | number,
  ) => {
    setEntry((prev) => ({
      ...prev,
      indicators: prev.indicators.map((ind, i) => {
        if (i !== idx) return ind;
        const updated = { ...ind, [field]: rawVal };
        if (field === "capaianJumlah" || field === "targetJumlah") {
          const capaian =
            field === "capaianJumlah" ? Number(rawVal) : ind.capaianJumlah;
          const target =
            field === "targetJumlah" ? Number(rawVal) : ind.targetJumlah;
          updated.capaianPersentase = calcPct(capaian, target);
        }
        return updated;
      }),
    }));
  };

  const handleSave = async () => {
    if (!entry.sasaranKinerja.trim()) {
      toast.error("Isi Sasaran Kinerja terlebih dahulu!");
      return;
    }
    try {
      await mutation.mutateAsync({
        period,
        entry: {
          employeeId,
          period,
          sasaranKinerja: entry.sasaranKinerja,
          indicatorList: entry.indicators.map((ind) => ({
            no: BigInt(ind.no),
            uraian: ind.uraian,
            targetJumlah: ind.targetJumlah,
            targetSatuan: ind.targetSatuan,
            capaianJumlah: ind.capaianJumlah,
            capaianPersentase: ind.capaianPersentase,
            sumberDataEvaluasi: ind.sumberDataEvaluasi,
            buktiDukung: ind.buktiDukung,
          })),
        },
      });
      toast.success("Capaian berhasil disimpan!");
      onSaved();
    } catch (e: any) {
      toast.error(`Gagal menyimpan: ${e.message}`);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex-1 space-y-1">
            <Label className="text-xs text-muted-foreground">
              Sasaran Kinerja
            </Label>
            <Input
              data-ocid="capaian.input"
              value={entry.sasaranKinerja}
              onChange={(e) => updateSasaran(e.target.value)}
              placeholder="Deskripsi sasaran kinerja..."
              className="font-medium"
            />
          </div>
          <Badge variant="outline" className="mt-6 shrink-0">
            {period}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Indicator Table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-xs">
            <thead>
              <tr className="table-header-bg">
                <th className="px-2 py-2 text-left text-muted-foreground font-medium w-8">
                  No
                </th>
                <th className="px-2 py-2 text-left text-muted-foreground font-medium min-w-[160px]">
                  Uraian Indikator
                </th>
                <th className="px-2 py-2 text-center text-muted-foreground font-medium w-20">
                  Target Jml
                </th>
                <th className="px-2 py-2 text-center text-muted-foreground font-medium w-20">
                  Satuan
                </th>
                <th className="px-2 py-2 text-center text-muted-foreground font-medium w-20">
                  Capaian Jml
                </th>
                <th className="px-2 py-2 text-center text-muted-foreground font-medium w-24 bg-primary/5">
                  Capaian % (auto)
                </th>
                <th className="px-2 py-2 text-left text-muted-foreground font-medium min-w-[120px]">
                  Sumber Data
                </th>
                <th className="px-2 py-2 text-left text-muted-foreground font-medium min-w-[120px]">
                  Bukti Dukung
                </th>
                <th className="px-2 py-2 w-8" />
              </tr>
            </thead>
            <tbody>
              {entry.indicators.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-6 text-center text-muted-foreground"
                    data-ocid="capaian.empty_state"
                  >
                    Klik "Tambah Indikator" untuk menambahkan baris
                  </td>
                </tr>
              ) : (
                entry.indicators.map((ind) => (
                  <tr
                    key={ind.no}
                    className="border-t border-border hover:bg-muted/30 transition-colors"
                    data-ocid={`capaian.item.${ind.no}`}
                  >
                    <td className="px-2 py-1.5 text-center text-muted-foreground">
                      {ind.no}
                    </td>
                    <td className="px-1.5 py-1">
                      <input
                        type="text"
                        value={ind.uraian}
                        onChange={(e) =>
                          updateIndicator(ind.no - 1, "uraian", e.target.value)
                        }
                        placeholder="Uraian indikator..."
                        className="w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-foreground"
                      />
                    </td>
                    <td className="px-1.5 py-1">
                      <input
                        type="number"
                        value={ind.targetJumlah || ""}
                        onChange={(e) =>
                          updateIndicator(
                            ind.no - 1,
                            "targetJumlah",
                            Number.parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-center text-foreground"
                        min="0"
                      />
                    </td>
                    <td className="px-1.5 py-1">
                      <input
                        type="text"
                        value={ind.targetSatuan}
                        onChange={(e) =>
                          updateIndicator(
                            ind.no - 1,
                            "targetSatuan",
                            e.target.value,
                          )
                        }
                        placeholder="satuan"
                        className="w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-center text-foreground"
                      />
                    </td>
                    <td className="px-1.5 py-1">
                      <input
                        type="number"
                        value={ind.capaianJumlah || ""}
                        onChange={(e) =>
                          updateIndicator(
                            ind.no - 1,
                            "capaianJumlah",
                            Number.parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-center text-foreground"
                        min="0"
                      />
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-md ${
                          ind.capaianPersentase >= 80
                            ? "text-success bg-success/10"
                            : ind.capaianPersentase > 0
                              ? "text-warning-foreground bg-warning/10"
                              : "text-muted-foreground"
                        }`}
                      >
                        {ind.capaianPersentase.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-1.5 py-1">
                      <input
                        type="text"
                        value={ind.sumberDataEvaluasi}
                        onChange={(e) =>
                          updateIndicator(
                            ind.no - 1,
                            "sumberDataEvaluasi",
                            e.target.value,
                          )
                        }
                        placeholder="Sumber data..."
                        className="w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-foreground"
                      />
                    </td>
                    <td className="px-1.5 py-1">
                      <input
                        type="text"
                        value={ind.buktiDukung}
                        onChange={(e) =>
                          updateIndicator(
                            ind.no - 1,
                            "buktiDukung",
                            e.target.value,
                          )
                        }
                        placeholder="Bukti dukung..."
                        className="w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-primary/30 rounded px-1.5 py-1 text-foreground"
                      />
                    </td>
                    <td className="px-1.5 py-1 text-center">
                      <button
                        type="button"
                        onClick={() => removeIndicator(ind.no - 1)}
                        className="w-6 h-6 rounded hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                        data-ocid={`capaian.delete_button.${ind.no}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addIndicator}
            data-ocid="capaian.add_button"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Tambah Indikator
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={mutation.isPending}
            data-ocid="capaian.save_button"
          >
            {mutation.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
            ) : (
              <Save className="w-3.5 h-3.5 mr-1.5" />
            )}
            {mutation.isPending ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface CapaianPageProps {
  period: string;
  entries: LocalEntry[];
  employeeId: Principal;
  onAddEntry: () => void;
  onSaved: () => void;
}

function CapaianPage({
  period,
  entries,
  employeeId,
  onAddEntry,
  onSaved,
}: CapaianPageProps) {
  return (
    <div className="space-y-4">
      {entries.length === 0 && (
        <div
          className="text-center py-16 border-2 border-dashed border-border rounded-xl"
          data-ocid="capaian.empty_state"
        >
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">
            Belum ada sasaran kinerja untuk periode {period}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Klik tombol di bawah untuk menambahkan sasaran kinerja pertama Anda
          </p>
        </div>
      )}
      {entries.map((entry, i) => (
        <EntryForm
          key={`${period}-${entry.sasaranKinerja || i}`}
          initialEntry={entry}
          period={period}
          employeeId={employeeId}
          onSaved={onSaved}
        />
      ))}
      <Button
        variant="outline"
        className="w-full border-dashed"
        onClick={onAddEntry}
        data-ocid="capaian.primary_button"
      >
        <Plus className="w-4 h-4 mr-2" />
        Tambah Sasaran Kinerja
      </Button>
    </div>
  );
}

export default function CapaianSaya() {
  const [period, setPeriod] = useState(new Date().getFullYear().toString());
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal() as Principal | undefined;

  const {
    data: backendEntries,
    isLoading,
    refetch,
  } = useGetCallerPerformanceEntries();

  const periodEntries: LocalEntry[] = (backendEntries ?? [])
    .filter((e) => e.period === period)
    .map((e) => ({
      sasaranKinerja: e.sasaranKinerja,
      indicators: e.indicatorList.map((ind) => ({
        no: Number(ind.no),
        uraian: ind.uraian,
        targetJumlah: ind.targetJumlah,
        targetSatuan: ind.targetSatuan,
        capaianJumlah: ind.capaianJumlah,
        capaianPersentase: ind.capaianPersentase,
        sumberDataEvaluasi: ind.sumberDataEvaluasi,
        buktiDukung: ind.buktiDukung,
      })),
    }));

  const [extraEntries, setExtraEntries] = useState<LocalEntry[]>([]);

  const handleAddEntry = () => {
    setExtraEntries((prev) => [
      ...prev,
      { sasaranKinerja: "", indicators: [emptyIndicator(1)] },
    ]);
  };

  const handleSaved = () => {
    setExtraEntries([]);
    refetch();
  };

  const allEntries = [...periodEntries, ...extraEntries];

  if (!principal) return null;

  return (
    <div className="p-6 space-y-6">
      {/* Period selector */}
      <div className="flex items-end gap-4">
        <div className="space-y-1">
          <Label htmlFor="capaian-period">Periode</Label>
          <Input
            id="capaian-period"
            data-ocid="capaian.period_input"
            type="number"
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value);
              setExtraEntries([]);
            }}
            className="w-28"
            min="2020"
            max="2030"
          />
        </div>
        <div className="pb-1">
          <p className="text-sm text-muted-foreground">
            {allEntries.length} sasaran kinerja untuk periode {period}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4" data-ocid="capaian.loading_state">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : (
        <CapaianPage
          key={period}
          period={period}
          entries={allEntries}
          employeeId={principal}
          onAddEntry={handleAddEntry}
          onSaved={handleSaved}
        />
      )}

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
