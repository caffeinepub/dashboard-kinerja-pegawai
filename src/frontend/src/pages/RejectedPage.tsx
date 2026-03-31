import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function RejectedPage() {
  const { clear } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-card text-center" data-ocid="rejected.card">
          <CardContent className="pt-10 pb-8 px-10">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Pendaftaran Ditolak
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Maaf, permintaan pendaftaran Anda telah ditolak oleh
              administrator. Silakan hubungi admin untuk informasi lebih lanjut
              atau klarifikasi.
            </p>
            <div className="bg-destructive/10 rounded-xl p-4 mb-8">
              <p className="text-sm text-destructive font-medium">
                Status: Ditolak
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Hubungi admin BKKBN untuk bantuan
              </p>
            </div>
            <Button
              data-ocid="rejected.logout_button"
              variant="outline"
              onClick={clear}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Keluar dari Sistem
            </Button>
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
