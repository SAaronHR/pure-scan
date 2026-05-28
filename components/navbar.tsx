"use client"

import Link from "next/link";
import { Shield } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();

    const showNavbarRoutes = ["/img", "/text"];
    const shouldShowNavbar = showNavbarRoutes.some(route => pathname === route || pathname.startsWith(route + "/"));

    if (!shouldShowNavbar) return null;

    return (
        <header className="w-full border-b border-zinc-800/50 bg-[#0a0a0a] px-6 py-4 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 text-zinc-100 hover:text-white transition-colors">
                    <div className="p-1.5">
                        <img src="pureScanLogo.svg" alt="Logo" className="h-8" />
                    </div>
                </Link>
                <nav className="flex items-center gap-8">
                    <Link href="/img" className="text-sm font-semibold text-zinc-400 hover:text-primary transition-colors uppercase tracking-widest">
                        Imagen
                    </Link>
                    <Link href="/text" className="text-sm font-semibold text-zinc-400 hover:text-primary transition-colors uppercase tracking-widest">
                        Texto
                    </Link>
                </nav>
            </div>
        </header>
    );
}
