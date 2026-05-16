import Link from "next/link";
import { Shield, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
    return (
        <div className="flex py-12 flex-col min-h-screen bg-[#050505] items-center justify-center relative overflow-hidden">
            {/* Efecto de luz de fondo para diseño premium */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

            <main className="z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto gap-6 animate-in fade-in zoom-in-95 duration-1000">
                <div className="flex items-center gap-3 mb-2">
                    <img src="pureScanLogo.svg" alt="Logo" className="h-16" />
                </div>

                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                    Seguridad Inteligente <br /> <span className="text-zinc-500">al Instante.</span>
                </h2>

                <p className="text-lg text-zinc-400 max-w-2xl font-mono leading-relaxed mb-6">
                    Analiza imágenes generadas por IA, detecta correos de phishing y valida contenido malicioso con nuestra plataforma de escaneo avanzado.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                    <Link href="/img" className="w-full sm:w-auto">
                        <Button className="w-full h-14 px-8 text-sm font-semibold tracking-wider rounded-xl flex items-center gap-3">
                            <ImageIcon className="w-5 h-5" />
                            ANALIZAR IMAGEN
                        </Button>
                    </Link>
                    <Link href="/text" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full h-14 px-8 text-sm font-semibold tracking-wider rounded-xl flex items-center gap-3 bg-[#0a0a0a] border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900">
                            <FileText className="w-5 h-5" />
                            ESCANEAR TEXTO
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
