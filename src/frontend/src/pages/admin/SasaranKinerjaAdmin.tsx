import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ClipboardList } from "lucide-react";
import { useState } from "react";
import {
  useGetAllEmployeesPerformanceSummary,
  useGetAllPerformanceEntries,
} from "../../hooks/useQueries";

const shortPrincipal = (p: { toString(): string }) =>
  `${p.toString().slice(0, 12)}...`;

export default function SasaranKinerjaAdmin() {
  const [period, setPeriod] = useState(new Date().getFullYear().toString());
  const { data: allEntries, isLoading: entriesLoading } =
    useGetAllPerformanceEntries();
  const { data: summaries } = useGetAllEmployeesPerformanceSummary(period);

  const summaryMap = new Map(
    (summaries ?? []).map((s) => [s.employeeId.toString(), s]),
  );
  const periodEntries = (allEntries ?? []).filter((e) => e.period === period);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-end gap-4">
        <div className="space-y-1">
          <Label htmlFor="period-input">Periode</Label>
          <Input
            id="period-input"
            data-ocid="skp.input"
            type="number"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-28"
            min="2020"
            max="2030"
          />
        </div>
        <div className="text-sm text-muted-foreground pb-1">
          {periodEntries.length} entri kinerja ditemukan untuk periode {period}
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">
            Sasaran Kinerja Pegawai — Periode {period}
          </CardTitle>
          <CardDescription>
            Ringkasan capaian kinerja seluruh pegawai
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {entriesLoading ? (
            <div className="p-6 space-y-3" data-ocid="skp.loading_state">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : periodEntries.length === 0 ? (
            <div className="text-center py-16" data-ocid="skp.empty_state">
              <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Belum ada data kinerja untuk periode {period}
              </p>
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
                    <TableHead className="w-40">Avg Capaian</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {periodEntries.map((entry, idx) => {
                    const avgCapaian =
                      entry.indicatorList.length > 0
                        ? entry.indicatorList.reduce(
                            (s, ind) => s + ind.capaianPersentase,
                            0,
                          ) / entry.indicatorList.length
                        : 0;
                    const summary = summaryMap.get(entry.employeeId.toString());
                    const rating = summary ? Number(summary.overallRating) : 0;
                    const isSesuai = avgCapaian >= 80;
                    return (
                      <TableRow
                        key={`${entry.employeeId.toString()}-${entry.sasaranKinerja}`}
                        data-ocid={`skp.item.${idx + 1}`}
                      >
                        <TableCell className="text-muted-foreground text-xs">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {shortPrincipal(entry.employeeId)}
                        </TableCell>
                        <TableCell className="text-sm max-w-[200px]">
                          <p className="truncate">{entry.sasaranKinerja}</p>
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
                          {rating > 0 ? (
                            <span className="text-xs text-warning">
                              {"★".repeat(rating)}
                              {"☆".repeat(5 - rating)}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={
                              isSesuai
                                ? "bg-success/10 text-success border-success/20 text-xs"
                                : "bg-warning/10 text-warning-foreground border-warning/20 text-xs"
                            }
                          >
                            {isSesuai ? "Sesuai" : "Belum Sesuai"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
