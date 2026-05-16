import Link from "next/link";
import { ShieldAlert, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex-1 w-full flex flex-col bg-[#050505] items-center justify-center relative overflow-hidden py-20">
            {/* Efecto de luz de alerta (rojo) para la página de error */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#93000A]/20 blur-[150px] rounded-full pointer-events-none" />

            <div className="z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

                <h1 className="text-8xl md:text-[150px] font-black tracking-tighter text-white leading-none">
                    404
                </h1>

                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-200">
                    Ruta Desconocida
                </h2>

                <p className="text-base text-zinc-400 font-mono leading-relaxed mb-4">
                    La página que intentas escanear no existe. Es posible que el enlace esté roto o que el contenido haya sido movido a un área segura.
                </p>

                <Link href="/">
                    <Button className="h-14 px-8 text-sm font-semibold tracking-wider rounded-xl flex items-center gap-3">
                        <Home className="w-5 h-5" />
                        VOLVER AL INICIO
                    </Button>
                </Link>
            </div>
        </div>
    );
}
