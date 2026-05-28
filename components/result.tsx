import { Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { translateDisplayList, translateDisplaySource, translateDisplayText } from "@/lib/display";

interface ResultProps {
    summary?: string | null;
    source?: string;
    analysisStrength?: number;
    mood?: string;
    tags?: string[];
}

export default function Result({ summary, source, analysisStrength = 0, mood, tags = [] }: ResultProps) {
    const badgeTone = analysisStrength >= 80 ? "border-[#ABFFB4]/30 bg-[#ABFFB4]/10 text-[#ABFFB4]" : analysisStrength >= 60 ? "border-[#FFD59A]/30 bg-[#FFD59A]/10 text-[#FFD59A]" : "border-[#7AA7FF]/30 bg-[#7AA7FF]/10 text-[#7AA7FF]"
    const translatedTags = translateDisplayList(tags)

    return (
        <Card className="w-full overflow-hidden border border-white/10 bg-gradient-to-r from-[#111114] via-[#101215] to-[#0c0f14] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-start gap-4 p-5 md:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl shrink-0 border border-[#7AA7FF]/30 bg-[#0f172a]">
                    <Sparkles className="w-6 h-6 text-[#7AA7FF]" />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                            <h3 className="text-white text-xl font-semibold tracking-wide">Lectura de la imagen</h3>
                            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                                {source ? `Fuente: ${translateDisplaySource(source)}` : 'Análisis visual'}
                            </p>
                        </div>
                        <div className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest border ${badgeTone}`}>
                            {analysisStrength}% de confianza
                        </div>
                    </div>
                    {summary && (
                        <p className="text-sm md:text-[15px] text-zinc-200 leading-relaxed max-w-3xl normal-case">
                            {translateDisplayText(summary)}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2 pt-1">
                        {mood && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-300">
                                {translateDisplayText(mood)}
                            </span>
                        )}
                        {translatedTags.slice(0, 4).map((tag) => (
                            <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}