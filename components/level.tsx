import { Card, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

interface LevelProps {
    value?: number;
}

export function Level({ value = 0 }: LevelProps) {
    const label = value >= 80 ? "Muy alta" : value >= 60 ? "Alta" : value >= 40 ? "Media" : "Baja"

    return (
        <Card className="w-full border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-950 to-zinc-900/70 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                    <CardTitle className="uppercase tracking-[0.25em] text-xs text-zinc-400">Nivel de confianza</CardTitle>
                    <div className="mt-2 text-sm text-zinc-300">{label}</div>
                </div>
                <span className="text-primary text-5xl font-bold tracking-tight leading-none">{value}%</span>
            </div>
            <Progress value={value} className="h-3.5 bg-white/8" />
        </Card>
    );
}