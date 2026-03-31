import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { Clock, LogOut, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function PendingApprovalPage() {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["queryStatus"] });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-card text-center" data-ocid="pending.card">
          <CardContent className="pt-10 pb-8 px-10">
            <div className="w-20 h-20 rounded-full bg-warning/15 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-warning" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Menunggu Persetujuan
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Permintaan pendaftaran Anda telah dikirim dan sedang ditinjau oleh
              administrator. Anda akan mendapatkan akses setelah admin
              menyetujui permintaan Anda.
            </p>
            <div className="bg-warning/10 rounded-xl p-4 mb-8">
              <p className="text-sm text-warning-foreground font-medium">
                Status: Menunggu Persetujuan Admin
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Hubungi admin jika membutuhkan akses segera
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                data-ocid="pending.refresh_button"
                onClick={handleRefresh}
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Periksa Status Lagi
              </Button>
              <Button
                data-ocid="pending.logout_button"
                variant="ghost"
                onClick={clear}
                className="text-muted-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </div>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
