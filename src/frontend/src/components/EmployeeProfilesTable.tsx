import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users } from "lucide-react";
import { useGetAllEmployeeProfiles } from "../hooks/useQueries";

interface Props {
  compact?: boolean;
}

export default function EmployeeProfilesTable({ compact = false }: Props) {
  const { data: profiles, isLoading } = useGetAllEmployeeProfiles();

  return (
    <Card className="shadow-card">
      <CardHeader className={compact ? "pb-2" : ""}>
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          Profil Pegawai Terdaftar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 space-y-3" data-ocid="profiles.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (profiles ?? []).length === 0 ? (
          <div className="text-center py-10" data-ocid="profiles.empty_state">
            <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Belum ada profil pegawai yang terdaftar
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table data-ocid="profiles.table">
              <TableHeader>
                <TableRow className="table-header-bg">
                  <TableHead className="w-10">No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>NIP</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Lokasi Kerja (Desa Binaan)</TableHead>
                  <TableHead>Kecamatan</TableHead>
                  <TableHead>Kabupaten</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(profiles ?? []).map((p, idx) => (
                  <TableRow
                    key={`${p.nip}-${idx}`}
                    data-ocid={`profiles.item.${idx + 1}`}
                  >
                    <TableCell className="text-muted-foreground text-xs">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {p.nama || (
                        <span className="text-muted-foreground italic">—</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {p.nip || (
                        <span className="text-muted-foreground italic">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {p.jabatan || (
                        <span className="text-muted-foreground italic">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {p.lokasiKerja || (
                        <span className="text-muted-foreground italic">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {p.kecamatan || (
                        <span className="text-muted-foreground italic">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {p.kabupaten || (
                        <span className="text-muted-foreground italic">—</span>
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
  );
}
