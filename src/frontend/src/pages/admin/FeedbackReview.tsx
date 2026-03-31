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
import { MessageSquare } from "lucide-react";
import EmployeeProfilesTable from "../../components/EmployeeProfilesTable";
import { useGetAllFeedback } from "../../hooks/useQueries";

const shortPrincipal = (p: { toString(): string }) =>
  `${p.toString().slice(0, 14)}...`;

function formatDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds) / 1_000_000;
  return new Date(ms).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function FeedbackReview() {
  const { data: feedbacks, isLoading } = useGetAllFeedback();

  return (
    <div className="p-6 space-y-6">
      {/* Profil Pegawai Terdaftar - reference card */}
      <EmployeeProfilesTable />

      {/* Feedback table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">
            Semua Feedback &amp; Penilaian
          </CardTitle>
          <CardDescription>
            Riwayat lengkap feedback yang telah diberikan kepada pegawai
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3" data-ocid="feedback.loading_state">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : (feedbacks ?? []).length === 0 ? (
            <div className="text-center py-16" data-ocid="feedback.empty_state">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Belum ada feedback yang diberikan
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="feedback.table">
                <TableHeader>
                  <TableRow className="table-header-bg">
                    <TableHead className="w-10">No</TableHead>
                    <TableHead>Pegawai (ID)</TableHead>
                    <TableHead className="text-center">Periode</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                    <TableHead>Catatan Feedback</TableHead>
                    <TableHead className="text-right">Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(feedbacks ?? []).map((fb, i) => (
                    <TableRow
                      key={`${fb.employeeId.toString()}-${fb.period}`}
                      data-ocid={`feedback.item.${i + 1}`}
                    >
                      <TableCell className="text-muted-foreground text-xs">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {shortPrincipal(fb.employeeId)}
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {fb.period}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-warning text-sm">
                          {"★".repeat(Number(fb.overallRating))}
                          {"☆".repeat(
                            Math.max(0, 5 - Number(fb.overallRating)),
                          )}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {Number(fb.overallRating)}/5
                        </p>
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className="text-sm text-foreground line-clamp-2">
                          {fb.feedbackText}
                        </p>
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {formatDate(fb.createdAt)}
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
