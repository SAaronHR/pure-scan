import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface AnomaliesProps {
    data?: any;
}

export function Anomalies({ data }: AnomaliesProps) {
    const clues = data?.signals?.clues ?? []
    const recommendations = data?.recommendations ?? []
    const provenance = data?.signals?.provenance ?? []
    const likelihood = data?.signals?.likelihood ?? "low"

    return (
        <Card className="w-full h-full border-white/10 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900/70 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <CardHeader className="pb-2">
                <CardTitle className="uppercase tracking-[0.25em] text-xs text-zinc-400 leading-relaxed">
                    Lectura contextual
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="w-full h-px bg-white/5 mb-1" />

                <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Nivel de señales</div>
                    <div className="mt-1 text-sm font-medium text-zinc-100 capitalize">{likelihood}</div>
                </div>

                {clues.length > 0 ? clues.map((clue: string, index: number) => (
                    <div
                        key={clue + index}
                        className={`w-full rounded-2xl px-4 py-3 text-sm leading-relaxed ${index === 0 ? 'border border-[#FFB4AB]/25 bg-[#FFB4AB]/10 text-[#FFD7D3]' : 'border border-white/8 bg-white/4 text-zinc-200'}`}
                    >
                        {clue}
                    </div>
                )) : (
                    <div className="w-full rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-zinc-300">
                        Sin anomalías relevantes
                    </div>
                )}

                {recommendations.length > 0 && (
                    <div className="mt-2 rounded-2xl border border-white/8 bg-zinc-950/70 p-4 text-sm text-zinc-300">
                        <div className="mb-3 uppercase tracking-[0.22em] text-[11px] text-zinc-500">Recomendaciones</div>
                        <ul className="space-y-2">
                            {recommendations.map((item: string, index: number) => (
                                <li key={item + index} className="flex items-start gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {provenance.length > 0 && (
                    <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-zinc-300">
                        <div className="mb-2 uppercase tracking-[0.22em] text-[11px] text-zinc-500">Procedencia</div>
                        <div className="flex flex-wrap gap-2">
                            {provenance.map((item: string) => (
                                <span key={item} className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
