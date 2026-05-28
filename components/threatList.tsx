import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Sparkles, BrainCircuit, ListChecks, FileCode2, MessageSquareText, Shield } from "lucide-react";
import { translateDisplayList, translateDisplayLanguage, translateDisplaySentiment, translateDisplayText } from "@/lib/display";

interface ThreatListProps {
    summary: string;
    promptScore: number;
    strengths: string[];
    issues: string[];
    recommendations: string[];
    improvedPrompt: string;
    structure: {
        role: string;
        objective: string;
        context: string;
        constraints: string;
        outputFormat: string;
        audience: string;
        tone: string;
        missingElements: string[];
    };
    signals: {
        dominantLanguage: string;
        entities: string[];
        keyPhrases: string[];
        piiCount: number;
        sentiment: string;
    };
}

function PanelCard({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <Card className="w-full border-white/10 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900/70 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-zinc-400">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-zinc-200">
                        {icon}
                    </span>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    )
}

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-zinc-200">
            {children}
        </span>
    )
}

export default function ThreatList({
    summary,
    promptScore,
    strengths,
    issues,
    recommendations,
    improvedPrompt,
    structure,
    signals,
}: ThreatListProps) {
    const scoreTone = promptScore >= 75 ? "text-[#ABFFB4]" : promptScore >= 50 ? "text-[#FFD59A]" : "text-[#7AA7FF]"
    const sentimentLabel = translateDisplaySentiment(signals.sentiment)
    const sentimentTone = signals.sentiment === "POSITIVE"
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
        : signals.sentiment === "NEGATIVE"
            ? "border-rose-500/30 bg-rose-500/10 text-rose-200"
            : signals.sentiment === "MIXED"
                ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                : "border-sky-500/30 bg-sky-500/10 text-sky-200"
    const hasSignals = signals.entities.length > 0 || signals.keyPhrases.length > 0

    return (
        <div className="grid gap-6">
            <Card className="border-white/10 bg-gradient-to-r from-[#0b1018] via-[#101826] to-[#0c1320] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <CardContent className="flex flex-col gap-6 p-6 md:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="max-w-3xl">
                            <Badge variant="secondary" className="border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-sky-200">
                                Diagnóstico del prompt
                            </Badge>
                            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                                {translateDisplayText(summary)}
                            </h2>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-right">
                            <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">Puntaje</div>
                            <div className={`mt-2 text-5xl font-bold tracking-tight ${scoreTone}`}>{promptScore}</div>
                            <div className="mt-1 text-xs uppercase tracking-[0.25em] text-zinc-500">de 100</div>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-4">
                            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Idioma</div>
                            <div className="mt-2 text-sm text-zinc-100">{translateDisplayLanguage(signals.dominantLanguage).toUpperCase()}</div>
                        </div>
                        <div className={`rounded-2xl border px-4 py-4 ${sentimentTone}`}>
                            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Sentimiento detectado</div>
                            <div className="mt-2 text-sm text-zinc-100">{sentimentLabel}</div>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-4">
                            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">PII detectada</div>
                            <div className="mt-2 text-sm text-zinc-100">{signals.piiCount} elementos</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
                <PanelCard title="Fortalezas" icon={<Sparkles className="h-4 w-4 text-[#ABFFB4]" />}>
                    <div className="space-y-2">
                            {translateDisplayList(strengths).length > 0 ? translateDisplayList(strengths).map((item) => <Pill key={item}>{item}</Pill>) : <p className="text-sm text-zinc-400">No se detectaron fortalezas claras.</p>}
                    </div>
                </PanelCard>

                <PanelCard title="Puntos a reforzar" icon={<BrainCircuit className="h-4 w-4 text-[#FFD59A]" />}>
                    <div className="space-y-2">
                            {translateDisplayList(issues).length > 0 ? translateDisplayList(issues).map((item) => <Pill key={item}>{item}</Pill>) : <p className="text-sm text-zinc-400">Sin vacíos relevantes.</p>}
                    </div>
                </PanelCard>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <PanelCard title="Prompt mejorado" icon={<FileCode2 className="h-4 w-4 text-[#7AA7FF]" />}>
                    <div className="rounded-2xl border border-white/8 bg-zinc-950/80 p-4">
                        <pre className="whitespace-pre-wrap text-sm leading-7 text-zinc-200">{translateDisplayText(improvedPrompt)}</pre>
                    </div>
                </PanelCard>

                <PanelCard title="Lectura lingüística" icon={<MessageSquareText className="h-4 w-4 text-[#FFB4AB]" />}>
                    <div className="space-y-4 text-sm text-zinc-200">
                        <p className="text-sm leading-6 text-zinc-400">
                            Aquí se agrupa lo que Comprehend sí pudo reconocer del texto: idioma, tono, entidades y frases clave. Si la muestra es breve, esta sección puede quedar más ligera de lo normal.
                        </p>
                        {hasSignals ? (
                            <>
                                <div>
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Entidades</div>
                                        <Badge variant="secondary" className="border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.25em] text-zinc-300">
                                            {signals.entities.length}
                                        </Badge>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {signals.entities.map((entity) => <Pill key={entity}>{entity}</Pill>)}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Frases clave</div>
                                        <Badge variant="secondary" className="border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.25em] text-zinc-300">
                                            {signals.keyPhrases.length}
                                        </Badge>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {signals.keyPhrases.map((phrase) => <Pill key={phrase}>{phrase}</Pill>)}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-white/10 bg-white/4 px-4 py-4 text-zinc-400 leading-relaxed">
                                Comprehend no encontró entidades ni frases clave en este prompt. Eso suele pasar cuando el texto es muy corto o muy directo.
                            </div>
                        )}
                    </div>
                </PanelCard>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <PanelCard title="Estructura detectada" icon={<ListChecks className="h-4 w-4 text-[#ABFFB4]" />}>
                    <div className="space-y-4 text-sm text-zinc-200">
                        {[
                            ["Rol", structure.role],
                            ["Objetivo", structure.objective],
                            ["Contexto", structure.context],
                            ["Restricciones", structure.constraints],
                            ["Formato", structure.outputFormat],
                            ["Audiencia", structure.audience],
                            ["Tono", structure.tone],
                        ].map(([label, value]) => (
                            <div key={label} className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">{label}</div>
                                <div className="mt-1 leading-6 text-zinc-100">{value}</div>
                            </div>
                        ))}
                    </div>
                </PanelCard>

                <PanelCard title="Elementos faltantes" icon={<Shield className="h-4 w-4 text-[#FFB4AB]" />}>
                    <div className="flex flex-wrap gap-2">
                        {structure.missingElements.length > 0 ? structure.missingElements.map((item) => <Pill key={item}>{item}</Pill>) : <p className="text-sm text-zinc-400">No faltan elementos críticos.</p>}
                    </div>

                    <Separator className="my-5 bg-white/8" />

                    <div className="space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Recomendaciones</div>
                        <ul className="space-y-2 text-sm text-zinc-200">
                            {translateDisplayList(recommendations).map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </PanelCard>
            </div>
        </div>
    )
}
