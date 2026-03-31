import { Button } from "@/components/ui/button";
import { Award, BarChart3, Loader2, Shield, Users } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const features = [
  {
    icon: BarChart3,
    title: "Capaian Kinerja",
    desc: "Pantau target & realisasi kinerja secara real-time",
  },
  {
    icon: Users,
    title: "Manajemen Pegawai",
    desc: "Kelola pendaftaran dan persetujuan pegawai",
  },
  {
    icon: Award,
    title: "Penilaian Admin",
    desc: "Feedback dan penilaian menyeluruh dari admin",
  },
];

export default function LoginPage() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-sidebar-gradient flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-lg leading-none">BKKBN</p>
            <p className="text-white/60 text-xs">e-Performance System</p>
          </div>
        </div>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-tight mb-4"
          >
            Dashboard Kinerja
            <br />
            <span className="text-white/70">Pegawai BKKBN</span>
          </motion.h1>
          <p className="text-white/60 text-base mb-10">
            Sistem manajemen kinerja terpadu untuk pegawai Badan Kependudukan
            dan Keluarga Berencana Nasional.
          </p>
          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <f.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{f.title}</p>
                  <p className="text-white/50 text-xs">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} BKKBN. Sistem Penilaian Kinerja Pegawai.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-sidebar-gradient flex items-center justify-center mx-auto mb-4 shadow-card">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Selamat Datang
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Masuk ke sistem e-Performance BKKBN
            </p>
          </div>

          <div className="space-y-4">
            <Button
              data-ocid="login.primary_button"
              onClick={login}
              disabled={isLoggingIn}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              {isLoggingIn ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Shield className="w-5 h-5 mr-2" />
              )}
              {isLoggingIn
                ? "Memproses Login..."
                : "Login dengan Internet Identity"}
            </Button>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-xl">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Login menggunakan Internet Identity yang aman. Data Anda
              terlindungi dengan enkripsi blockchain ICP.
            </p>
          </div>

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
    </div>
  );
}
